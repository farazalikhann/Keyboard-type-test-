"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { TelemetryTrace } from "@/components/telemetry/TelemetryTrace";
import { ModeSelector } from "./ModeSelector";
import { TextDisplay } from "./TextDisplay";
import { ResultsPanel } from "./ResultsPanel";
import { useTypingEngine, type ContentMode, type Duration } from "./useTypingEngine";

export function TypingTest() {
  const [duration, setDuration] = useState<Duration>(30);
  const [mode, setMode] = useState<ContentMode>("words");
  const inputRef = useRef<HTMLInputElement>(null);
  const engine = useTypingEngine(duration, mode);
  const [focused, setFocused] = useState(false);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  // Escape restarts the test from anywhere on the page, including the results screen — where
  // the hidden input (the only thing that used to listen for it) has already been unmounted.
  useEffect(() => {
    function onWindowKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        engine.reset();
      }
    }
    window.addEventListener("keydown", onWindowKeyDown);
    return () => window.removeEventListener("keydown", onWindowKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.reset]);

  // refocus the (re-mounted) input whenever the test leaves the results screen
  useEffect(() => {
    if (engine.status !== "finished") {
      inputRef.current?.focus();
    }
  }, [engine.status]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    // The raw value can contain a space (from a tap on a physical or on-screen space bar, an
    // autocomplete suggestion, or a paste) — useTypingEngine reads whitespace out of this value
    // itself to advance words, rather than relying on intercepting a space keydown, since many
    // mobile keyboards never fire one for the space bar.
    engine.type(e.target.value);
  }

  const timeRemaining =
    engine.status === "idle" ? duration : Math.max(0, duration - engine.elapsedMs / 1000);
  const liveWpm = engine.result?.netWpm ?? 0;
  const liveAccuracy = engine.result?.accuracy ?? 100;
  const progressPct = engine.status === "idle" ? 100 : Math.max(0, Math.min(100, (timeRemaining / duration) * 100));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ModeSelector
          duration={duration}
          mode={mode}
          onDuration={setDuration}
          onMode={setMode}
          disabled={engine.status === "running"}
        />
        {engine.status !== "idle" && (
          <Button variant="ghost" onClick={engine.reset}>
            Restart
          </Button>
        )}
      </div>

      {engine.status === "finished" && engine.result ? (
        <ResultsPanel result={engine.result} ticks={engine.ticks} onRunAgain={engine.reset} />
      ) : (
        <Panel
          label="Typing test"
          className={`transition-shadow duration-300 ${
            focused ? "shadow-[0_0_0_1px_var(--signal),0_0_28px_-10px_var(--signal)]" : ""
          }`}
          corner={
            <div className="flex items-center gap-4 font-data text-xs text-fg-muted">
              <span>
                Accuracy <span className="tabular-nums text-fg">{Math.round(liveAccuracy)}%</span>
              </span>
              <span>
                WPM <span className="tabular-nums text-signal">{Math.round(liveWpm)}</span>
              </span>
            </div>
          }
        >
          <div
            className="relative cursor-text p-5"
            onClick={focusInput}
            role="presentation"
          >
            <div className="mb-3 flex items-baseline justify-between">
              <span className="flex items-center gap-2.5">
                <span className="tabular-nums font-data text-4xl font-medium text-fg">
                  {Math.ceil(timeRemaining)}
                  <span className="ml-1 text-xs font-normal uppercase tracking-wide text-fg-muted">sec</span>
                </span>
                {engine.status === "running" && (
                  <span className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                    <span className="font-data text-[10px] uppercase tracking-widest text-signal">Live</span>
                  </span>
                )}
              </span>
              {!focused && engine.status === "idle" && (
                <span className="font-data text-xs uppercase tracking-wide text-fg-muted">
                  Tap here and start typing
                </span>
              )}
            </div>

            <div className="mb-4 h-[3px] w-full overflow-hidden rounded-full bg-border/70">
              <div
                className="h-full rounded-full bg-signal transition-[width] duration-200 ease-linear"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <TextDisplay
              words={engine.words}
              wordIndex={engine.wordIndex}
              draft={engine.draft}
              draftStatuses={engine.draftStatuses}
              completed={engine.completed}
            />

            <input
              ref={inputRef}
              value={engine.draft}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Typing test input"
              className="absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
            />
          </div>
        </Panel>
      )}

      {engine.status !== "finished" && (
        <Panel label="Rhythm trace" className="overflow-hidden">
          <div className="p-3">
            <TelemetryTrace ticks={engine.ticks} height={80} />
          </div>
        </Panel>
      )}
    </div>
  );
}
