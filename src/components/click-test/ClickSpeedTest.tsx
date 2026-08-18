"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { Readout } from "@/components/ui/Readout";
import { TelemetryTrace } from "@/components/telemetry/TelemetryTrace";
import { useCountEngine } from "./useCountEngine";

const DURATIONS = [1, 5, 10, 30, 60] as const;

export function ClickSpeedTest() {
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(5);
  const engine = useCountEngine(duration);

  const timeRemaining = engine.status === "idle" ? duration : Math.max(0, duration - engine.elapsedMs / 1000);
  const finalCps = engine.elapsedMs > 0 ? engine.count / (engine.elapsedMs / 1000) : 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-sm border border-border bg-panel-raised p-1 font-data text-xs uppercase tracking-wide">
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              disabled={engine.status === "running"}
              onClick={() => setDuration(d)}
              className={`rounded-sm px-2.5 py-1 transition-colors disabled:opacity-40 ${
                duration === d ? "bg-signal text-base" : "text-fg-muted hover:text-fg"
              }`}
              aria-pressed={duration === d}
            >
              {d}s
            </button>
          ))}
        </div>
        {engine.status !== "idle" && (
          <Button variant="ghost" onClick={engine.reset}>
            Restart
          </Button>
        )}
      </div>

      <Panel
        label="Click speed test"
        corner={
          <span className="font-data text-xs text-fg-muted">
            CPS <span className="tabular-nums text-signal">{engine.rate.toFixed(1)}</span>
          </span>
        }
      >
        <div className="p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="tabular-nums font-data text-4xl font-medium text-fg">
              {Math.ceil(timeRemaining)}
              <span className="ml-1 text-xs font-normal uppercase tracking-wide text-fg-muted">sec</span>
            </span>
            <span className="font-data text-xs uppercase tracking-wide text-fg-muted">
              Clicks <span className="text-fg">{engine.count}</span>
            </span>
          </div>

          {engine.status === "finished" ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div>
                <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">Result</p>
                <Readout value={finalCps} decimals={2} suffix="cps" className="text-signal" />
              </div>
              <Button variant="primary" onClick={engine.reset} className="px-8 py-3 text-sm">
                Run again
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={engine.register}
              className="flex h-52 w-full select-none items-center justify-center rounded-sm border border-border bg-panel-raised font-display text-xl font-bold text-fg shadow-bezel transition-colors hover:border-signal/60 active:bg-signal active:text-base"
            >
              {engine.status === "idle" ? "Click to start" : "Click as fast as you can"}
            </button>
          )}
        </div>
      </Panel>

      <Panel label="Click interval trace" className="overflow-hidden">
        <div className="p-3">
          <TelemetryTrace ticks={engine.ticks} frozen={engine.status === "finished"} height={80} emptyHint="Clicks appear here once you start" />
        </div>
      </Panel>
    </div>
  );
}
