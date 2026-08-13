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
  const totalTypedRef = useRef(0);
  const uncorrectedErrorsRef = useRef(0);

  const reset = useCallback(() => {
    startTimeRef.current = null;
    lastKeystrokeRef.current = null;
    totalTypedRef.current = 0;
    uncorrectedErrorsRef.current = 0;
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
      const result = computeWpm(totalTypedRef.current, uncorrectedErrorsRef.current, elapsed);
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
        const result = computeWpm(totalTypedRef.current, uncorrectedErrorsRef.current, elapsed);
        return { ...prev, elapsedMs: elapsed, result };
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state.status, duration, finish]);

  const logTick = useCallback((error: boolean) => {
    const now = performance.now();
    const prevT = lastKeystrokeRef.current;
    const interval = prevT == null ? 0 : now - prevT;
    lastKeystrokeRef.current = now;
    setState((prev) => ({ ...prev, ticks: [...prev.ticks, { interval, error }] }));
  }, []);

  const ensureWordBuffer = useCallback((words: string[], wordIndex: number): string[] => {
    if (mode !== "words") return words;
    if (words.length - wordIndex > 15) return words;
    return [...words, ...buildWordSample(40, Date.now() + words.length)];
  }, [mode]);

  const commitWord = useCallback(() => {
    setState((prev) => {
      if (prev.status !== "running") return prev;
      const target = prev.words[prev.wordIndex] ?? "";
      const draft = prev.draft;
      const len = Math.max(target.length, draft.length);
      const charStatuses: CharStatus[] = [];
      let extra = 0;
      for (let i = 0; i < len; i++) {
        if (i >= target.length) {
          extra++;
          continue;
        }
        if (i >= draft.length) {
          charStatuses.push("pending");
          continue;
        }
        charStatuses.push(draft[i] === target[i] ? "correct" : "incorrect");
      }
      totalTypedRef.current += draft.length;
      const wrongInWord = charStatuses.filter((s) => s === "incorrect").length + extra;
      uncorrectedErrorsRef.current += wrongInWord;

      const nextWords = ensureWordBuffer(prev.words, prev.wordIndex + 1);
      const finishedQuote = mode === "quote" && prev.wordIndex + 1 >= nextWords.length;

      return {
        ...prev,
        words: nextWords,
        wordIndex: prev.wordIndex + 1,
        draft: "",
        draftStatuses: [],
        completed: [...prev.completed, { target, charStatuses, extra }],
        status: finishedQuote ? "finished" : prev.status,
      };
    });
  }, [ensureWordBuffer, mode]);

  const handleChar = useCallback(
    (nextDraft: string) => {
      setState((prev) => {
        let status = prev.status;
        if (status === "idle") {
          startTimeRef.current = performance.now();
          lastKeystrokeRef.current = startTimeRef.current;
          status = "running";
        }
        if (status !== "running") return prev;

        const target = prev.words[prev.wordIndex] ?? "";
        const isBackspace = nextDraft.length < prev.draft.length;
        const draftStatuses: CharStatus[] = [];
        for (let i = 0; i < nextDraft.length; i++) {
          if (i >= target.length) {
            draftStatuses.push("incorrect");
          } else {
            draftStatuses.push(nextDraft[i] === target[i] ? "correct" : "incorrect");
          }
        }

        if (!isBackspace) {
          const addedChar = nextDraft[nextDraft.length - 1];
          const idx = nextDraft.length - 1;
          const correct = idx < target.length && addedChar === target[idx];
          totalTypedRef.current += 1;
          if (!correct) uncorrectedErrorsRef.current += 1;
        }

        return { ...prev, draft: nextDraft, draftStatuses, status };
      });
    },
    []
  );

  const onKeystrokeForTrace = useCallback(
    (nextDraft: string, prevDraft: string) => {
      if (nextDraft.length <= prevDraft.length) return; // backspace, no trace tick
      const target = state.words[state.wordIndex] ?? "";
      const idx = nextDraft.length - 1;
      const correct = idx < target.length && nextDraft[idx] === target[idx];
      logTick(!correct);
    },
    [logTick, state.words, state.wordIndex]
  );

  const type = useCallback(
    (nextDraft: string) => {
      if (state.status === "finished") return;
      onKeystrokeForTrace(nextDraft, state.draft);
      handleChar(nextDraft);
    },
    [handleChar, onKeystrokeForTrace, state.draft, state.status]
  );

  const space = useCallback(() => {
    if (state.status !== "running") return;
    logTick(false);
    commitWord();
  }, [commitWord, logTick, state.status]);

  return {
    ...state,
    type,
    space,
    reset,
    finishNow: finish,
  };
}
