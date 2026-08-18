"use client";

import type { ContentMode, Duration } from "./useTypingEngine";

interface ModeSelectorProps {
  duration: Duration;
  mode: ContentMode;
  onDuration: (d: Duration) => void;
  onMode: (m: ContentMode) => void;
  disabled?: boolean;
  durations?: Duration[];
  modes?: ContentMode[];
}

const MODE_LABELS: Record<ContentMode, string> = {
  words: "Words",
  quote: "Quotes",
  punctuation: "Punctuation",
  numbers: "Numbers",
  code: "Code",
};

function formatDuration(d: Duration): string {
  return d >= 60 ? `${d / 60}m` : `${d}s`;
}

export function ModeSelector({
  duration,
  mode,
  onDuration,
  onMode,
  disabled,
  durations = [15, 30, 60],
  modes = ["words", "quote"],
}: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 font-data text-xs uppercase tracking-wide">
      {durations.length > 1 && (
        <div className="flex items-center gap-1 rounded-sm border border-border bg-panel-raised p-1 shadow-bezel">
          {durations.map((d) => (
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
              {formatDuration(d)}
            </button>
          ))}
        </div>
      )}
      {modes.length > 1 && (
        <div className="flex items-center gap-1 rounded-sm border border-border bg-panel-raised p-1 shadow-bezel">
          {modes.map((m) => (
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
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
