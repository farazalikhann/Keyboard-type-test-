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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      engine.reset();
      return;
    }
    if (e.key === " ") {
      e.preventDefault();
      engine.space();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    engine.type(e.target.value);
  }

  const timeRemaining =
    engine.status === "idle" ? duration : Math.max(0, duration - engine.elapsedMs / 1000);
  const liveWpm = engine.result?.netWpm ?? 0;
  const liveAccuracy = engine.result?.accuracy ?? 100;

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
            <div className="mb-4 flex items-baseline justify-between">
              <span className="tabular-nums font-data text-4xl font-medium text-fg">
                {Math.ceil(timeRemaining)}
                <span className="ml-1 text-xs font-normal uppercase tracking-wide text-fg-muted">sec</span>
              </span>
              {!focused && engine.status === "idle" && (
                <span className="font-data text-xs uppercase tracking-wide text-fg-muted">
                  Click here and start typing
                </span>
              )}
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
