"use client";

import { useCallback, useRef, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { TelemetryTrace, type TraceTick } from "@/components/telemetry/TelemetryTrace";

const CHATTER_THRESHOLD_MS = 50;

export function DoubleClickTest() {
  const [clicks, setClicks] = useState(0);
  const [flagged, setFlagged] = useState(0);
  const [ticks, setTicks] = useState<TraceTick[]>([]);
  const lastClickRef = useRef<number | null>(null);

  const onClick = useCallback(() => {
    const now = performance.now();
    const prev = lastClickRef.current;
    const interval = prev == null ? 0 : now - prev;
    lastClickRef.current = now;
    const isChatter = prev != null && interval < CHATTER_THRESHOLD_MS;
    setClicks((c) => c + 1);
    if (isChatter) setFlagged((f) => f + 1);
    setTicks((t) => [...t, { interval, error: isChatter }]);
  }, []);

  const clear = useCallback(() => {
    setClicks(0);
    setFlagged(0);
    setTicks([]);
    lastClickRef.current = null;
  }, []);

  return (
    <div className="space-y-3">
      <Panel
        label="Double click test"
        corner={
          <span className="font-data text-xs text-fg-muted">
            Flag threshold <span className="text-fg">{CHATTER_THRESHOLD_MS}ms</span>
          </span>
        }
      >
        <div className="p-5">
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat label="Clicks" value={clicks} />
            <Stat label="Flagged" value={flagged} warn={flagged > 0} />
            <Stat label="Flagged rate" value={clicks > 0 ? `${((flagged / clicks) * 100).toFixed(0)}%` : "0%"} />
          </div>

          <button
            type="button"
            onClick={onClick}
            className="flex h-52 w-full select-none items-center justify-center rounded-sm border border-border bg-panel-raised font-display text-xl font-bold text-fg shadow-bezel transition-colors hover:border-signal/60 active:bg-signal active:text-base"
          >
            Click here at a normal pace
          </button>

          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={clear}>
              Clear results
            </Button>
          </div>
        </div>
      </Panel>

      <Panel label="Click interval trace" className="overflow-hidden">
        <div className="p-3">
          <TelemetryTrace ticks={ticks} height={80} emptyHint="Click the button above to start logging" />
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string | number; warn?: boolean }) {
  return (
    <div>
      <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">{label}</p>
      <p className={`tabular-nums font-data text-xl font-medium ${warn ? "text-warning" : "text-fg"}`}>{value}</p>
    </div>
  );
}
