"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { buildWordSample, randomQuote } from "@/lib/wordLists";
import { computeWpm, WpmResult } from "@/lib/wpm";
import type { TraceTick } from "@/components/telemetry/TelemetryTrace";

export type ContentMode = "words" | "quote";
export type Duration = 15 | 30 | 60;
export type CharStatus = "pending" | "correct" | "incorrect";

export interface CompletedWord {
  target: string;
  charStatuses: CharStatus[];
  extra: number;
  /** characters actually typed for this word, including any overflow beyond the target's length */
  typedLength: number;
  /** mismatched + overflow characters, i.e. this word's contribution to uncorrected errors */
  wrongCount: number;
}

export type EngineStatus = "idle" | "running" | "finished";

interface EngineState {
  words: string[];
  wordIndex: number;
  draft: string;
  draftStatuses: CharStatus[];
  completed: CompletedWord[];
  status: EngineStatus;
  elapsedMs: number;
  ticks: TraceTick[];
  result: WpmResult | null;
}

function initWords(mode: ContentMode, seed: number): string[] {
  if (mode === "quote") {
    return randomQuote(seed).text.split(" ");
  }
  return buildWordSample(80, seed);
}

// A fixed seed for the very first render keeps server and client markup identical
// (Date.now() would differ between the SSR pass and hydration and break React's hydration check).
const INITIAL_SEED = 0;

function scoreWord(target: string, typed: string): CompletedWord {
  const len = Math.max(target.length, typed.length);
  const charStatuses: CharStatus[] = [];
  let extra = 0;
  for (let i = 0; i < len; i++) {
    if (i >= target.length) {
      extra++;
      continue;
    }
    if (i >= typed.length) {
      charStatuses.push("pending");
      continue;
    }
    charStatuses.push(typed[i] === target[i] ? "correct" : "incorrect");
  }
  const wrongCount = charStatuses.filter((s) => s === "incorrect").length + extra;
  return { target, charStatuses, extra, typedLength: typed.length, wrongCount };
}

function draftStatusesFor(target: string, typed: string): CharStatus[] {
  const statuses: CharStatus[] = [];
  for (let i = 0; i < typed.length; i++) {
    statuses.push(i < target.length && typed[i] === target[i] ? "correct" : "incorrect");
  }
  return statuses;
}

function liveTotals(state: Pick<EngineState, "completed" | "words" | "wordIndex" | "draft">) {
  let totalTyped = 0;
  let uncorrectedErrors = 0;
  for (const word of state.completed) {
    totalTyped += word.typedLength;
    uncorrectedErrors += word.wrongCount;
  }
  totalTyped += state.draft.length;
  const target = state.words[state.wordIndex] ?? "";
  for (let i = 0; i < state.draft.length; i++) {
    if (i >= target.length || state.draft[i] !== target[i]) uncorrectedErrors += 1;
  }
  return { totalTyped, uncorrectedErrors };
}

export function useTypingEngine(duration: Duration, mode: ContentMode) {
  const [state, setState] = useState<EngineState>(() => ({
    words: initWords(mode, INITIAL_SEED),
    wordIndex: 0,
    draft: "",
    draftStatuses: [],
    completed: [],
    status: "idle",
    elapsedMs: 0,
    ticks: [],
    result: null,
  }));

  const startTimeRef = useRef<number | null>(null);
  const lastKeystrokeRef = useRef<number | null>(null);
  const rafRef = useRef<number>();

  const reset = useCallback(() => {
    startTimeRef.current = null;
    lastKeystrokeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setState({
      words: initWords(mode, Date.now()),
      wordIndex: 0,
      draft: "",
      draftStatuses: [],
      completed: [],
      status: "idle",
      elapsedMs: 0,
      ticks: [],
      result: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // reset whenever duration or mode changes after the initial mount
  // (the initial render must stay on the seeded word list so it matches the server-rendered HTML)
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, mode]);

  const finish = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setState((prev) => {
      if (prev.status === "finished") return prev;
      const now = performance.now();
      const elapsed = startTimeRef.current ? now - startTimeRef.current : 0;
      const { totalTyped, uncorrectedErrors } = liveTotals(prev);
      const result = computeWpm(totalTyped, uncorrectedErrors, elapsed);
      return { ...prev, status: "finished", elapsedMs: elapsed, result };
    });
  }, []);

  // live timer loop
  useEffect(() => {
    if (state.status !== "running") return;

    function tick() {
      const start = startTimeRef.current;
      if (start == null) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = performance.now() - start;
      const remaining = duration * 1000 - elapsed;
      if (remaining <= 0) {
        finish();
        return;
      }
      setState((prev) => {
        const { totalTyped, uncorrectedErrors } = liveTotals(prev);
        const result = computeWpm(totalTyped, uncorrectedErrors, elapsed);
        return { ...prev, elapsedMs: elapsed, result };
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state.status, duration, finish]);

  const ensureWordBuffer = useCallback(
    (words: string[], wordIndex: number): string[] => {
      if (mode !== "words") return words;
      if (words.length - wordIndex > 15) return words;
      return [...words, ...buildWordSample(40, Date.now() + words.length)];
    },
    [mode]
  );

  /**
   * Handles the full current value of the input on every change. Space is never intercepted at
   * the keydown level — many mobile keyboards (Gboard, predictive/swipe input) commit whole words
   * or punctuation through input events rather than firing a reliable keydown for the space bar,
   * so relying on keydown preventDefault to trigger word advance silently breaks on phones. Instead
   * the raw value is allowed to contain whitespace, and any complete "word + boundary" segments in
   * it are committed here, whatever produced them (a single space press, autocomplete, or a paste).
   */
  const type = useCallback(
    (rawValue: string) => {
      setState((prev) => {
        if (prev.status === "finished") return prev;

        let status = prev.status;
        if (status === "idle") {
          if (rawValue.length === 0) return prev;
          startTimeRef.current = performance.now();
          lastKeystrokeRef.current = startTimeRef.current;
          status = "running";
        }

        const before = liveTotals(prev);

        let words = prev.words;
        let wordIndex = prev.wordIndex;
        let completed = prev.completed;
        let remaining = rawValue;
        let finished = false;

        while (!finished) {
          const boundary = remaining.search(/\s/);
          if (boundary === -1) break;
          const wordPart = remaining.slice(0, boundary);
          remaining = remaining.slice(boundary + 1);
          if (wordPart.length === 0) continue; // stray/duplicate whitespace, e.g. a double space — ignore

          const target = words[wordIndex] ?? "";
          completed = [...completed, scoreWord(target, wordPart)];
          wordIndex += 1;
          words = ensureWordBuffer(words, wordIndex);
          if (mode === "quote" && wordIndex >= words.length) finished = true;
        }

        const target = words[wordIndex] ?? "";
        const draftStatuses = draftStatusesFor(target, remaining);
        const nextState: EngineState = {
          ...prev,
          words,
          wordIndex,
          draft: remaining,
          draftStatuses,
          completed,
          status: finished ? "finished" : status,
        };

        const after = liveTotals(nextState);
        if (after.totalTyped > before.totalTyped) {
          const now = performance.now();
          const prevT = lastKeystrokeRef.current;
          const interval = prevT == null ? 0 : now - prevT;
          lastKeystrokeRef.current = now;
          const error = after.uncorrectedErrors > before.uncorrectedErrors;
          nextState.ticks = [...prev.ticks, { interval, error }];
        }

        if (finished) {
          const elapsed = startTimeRef.current ? performance.now() - startTimeRef.current : 0;
          nextState.elapsedMs = elapsed;
          nextState.result = computeWpm(after.totalTyped, after.uncorrectedErrors, elapsed);
        }

        return nextState;
      });
    },
    [ensureWordBuffer, mode]
  );

  return {
    ...state,
    type,
    reset,
    finishNow: finish,
  };
}
