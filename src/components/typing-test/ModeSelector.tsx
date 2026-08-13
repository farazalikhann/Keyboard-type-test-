"use client";

import type { ContentMode, Duration } from "./useTypingEngine";

const DURATIONS: Duration[] = [15, 30, 60];

interface ModeSelectorProps {
  duration: Duration;
  mode: ContentMode;
  onDuration: (d: Duration) => void;
  onMode: (m: ContentMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ duration, mode, onDuration, onMode, disabled }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 font-data text-xs uppercase tracking-wide">
      <div className="flex items-center gap-1 rounded-sm border border-border bg-panel-raised p-1 shadow-bezel">
        {DURATIONS.map((d) => (
          <button
            key={d}
            type="button"
            disabled={disabled}
            onClick={() => onDuration(d)}
            className={`rounded-sm px-2.5 py-1 transition-colors disabled:opacity-40 ${
              duration === d ? "bg-signal text-base" : "text-fg-muted hover:text-fg"
            }`}
            aria-pressed={duration === d}
          >
            {d}s
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1 rounded-sm border border-border bg-panel-raised p-1 shadow-bezel">
        {(["words", "quote"] as ContentMode[]).map((m) => (
          <button
            key={m}
            type="button"
            disabled={disabled}
            onClick={() => onMode(m)}
            className={`rounded-sm px-2.5 py-1 transition-colors disabled:opacity-40 ${
              mode === m ? "bg-signal text-base" : "text-fg-muted hover:text-fg"
            }`}
            aria-pressed={mode === m}
          >
            {m === "words" ? "Words" : "Quotes"}
          </button>
        ))}
      </div>
    </div>
  );
}
