"use client";

import { Panel } from "@/components/ui/Panel";
import { Readout } from "@/components/ui/Readout";
import { Button } from "@/components/ui/Button";
import { TelemetryTrace, type TraceTick } from "@/components/telemetry/TelemetryTrace";
import type { WpmResult } from "@/lib/wpm";

interface ResultsPanelProps {
  result: WpmResult;
  ticks: TraceTick[];
  onRunAgain: () => void;
}

export function ResultsPanel({ result, ticks, onRunAgain }: ResultsPanelProps) {
  return (
    <div className="space-y-4">
      <Panel label="Result" className="animate-panel-in overflow-hidden">
        <div className="grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-end">
          <div>
            <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">Net WPM</p>
            <Readout value={result.netWpm} decimals={0} className="text-signal" />
            <p className="mt-1 max-w-xs font-body text-xs text-fg-muted">
              Net WPM subtracts uncorrected errors. Raw WPM counts everything you typed, mistakes included.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Raw WPM" value={result.rawWpm} delay={80} />
            <Stat label="Accuracy" value={result.accuracy} suffix="%" delay={140} />
            <Stat label="Correct chars" value={result.correctChars} delay={200} />
            <Stat label="Missed chars" value={result.incorrectChars} delay={260} warn />
          </div>
        </div>
      </Panel>

      <Panel
        label="Rhythm trace"
        className="animate-panel-in overflow-hidden"
        style={{ animationDelay: "120ms" } as React.CSSProperties}
      >
        <div className="p-3">
          <TelemetryTrace ticks={ticks} frozen height={120} />
        </div>
      </Panel>

      <div
        className="flex flex-col items-stretch gap-3 animate-panel-in sm:flex-row sm:items-center sm:justify-between"
        style={{ animationDelay: "200ms" } as React.CSSProperties}
      >
        <p className="font-body text-xs text-fg-muted">Press escape to run again at any time.</p>
        <Button variant="primary" onClick={onRunAgain} className="px-8 py-3 text-sm">
          Run again
        </Button>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  delay,
  warn,
}: {
  label: string;
  value: number;
  suffix?: string;
  delay: number;
  warn?: boolean;
}) {
  return (
    <div className="animate-panel-in" style={{ animationDelay: `${delay}ms` } as React.CSSProperties}>
      <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">{label}</p>
      <p className={`tabular-nums font-data text-2xl font-medium ${warn && value > 0 ? "text-warning" : "text-fg"}`}>
        {value}
        {suffix}
      </p>
    </div>
  );
}
