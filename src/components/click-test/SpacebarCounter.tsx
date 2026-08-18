"use client";

import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { Readout } from "@/components/ui/Readout";
import { TelemetryTrace } from "@/components/telemetry/TelemetryTrace";
import { useCountEngine } from "./useCountEngine";

const DURATIONS = [5, 10, 30, 60] as const;

export function SpacebarCounter() {
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(10);
  const engine = useCountEngine(duration);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      e.preventDefault();
      if (e.repeat) return;
      if (engine.status === "finished") return;
      engine.register();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.status, engine.register]);

  const timeRemaining = engine.status === "idle" ? duration : Math.max(0, duration - engine.elapsedMs / 1000);

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

      <Panel label="Spacebar counter">
        <div className="p-5 text-center">
          <p className="font-data text-4xl font-medium tabular-nums text-fg">
            {Math.ceil(timeRemaining)}
            <span className="ml-1 text-xs font-normal uppercase tracking-wide text-fg-muted">sec</span>
          </p>

          <div className="my-8">
            <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">Presses</p>
            <Readout value={engine.count} decimals={0} live className="text-signal" />
          </div>

          {engine.status === "finished" ? (
            <Button variant="primary" onClick={engine.reset} className="px-8 py-3 text-sm">
              Run again
            </Button>
          ) : (
            <p className="font-data text-xs uppercase tracking-wide text-fg-muted">
              {engine.status === "idle" ? "Press space to start" : "Keep pressing space"}
            </p>
          )}
        </div>
      </Panel>

      <Panel label="Press interval trace" className="overflow-hidden">
        <div className="p-3">
          <TelemetryTrace
            ticks={engine.ticks}
            frozen={engine.status === "finished"}
            height={80}
            emptyHint="Presses appear here once you start"
          />
        </div>
      </Panel>
    </div>
  );
}
