"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Readout } from "@/components/ui/Readout";
import { computeWpm } from "@/lib/wpm";

export function WpmCalculator() {
  const [characters, setCharacters] = useState("250");
  const [minutes, setMinutes] = useState("1");
  const [seconds, setSeconds] = useState("30");
  const [errors, setErrors] = useState("0");

  const result = useMemo(() => {
    const chars = Math.max(0, Number(characters) || 0);
    const mins = Math.max(0, Number(minutes) || 0);
    const secs = Math.max(0, Number(seconds) || 0);
    const err = Math.max(0, Number(errors) || 0);
    const elapsedMs = (mins * 60 + secs) * 1000;
    if (elapsedMs <= 0) return null;
    return computeWpm(chars, err, elapsedMs);
  }, [characters, minutes, seconds, errors]);

  return (
    <Panel label="WPM calculator">
      <div className="grid gap-6 p-5 sm:grid-cols-2">
        <div className="space-y-4">
          <Field label="Characters typed" value={characters} onChange={setCharacters} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Minutes" value={minutes} onChange={setMinutes} />
            <Field label="Seconds" value={seconds} onChange={setSeconds} />
          </div>
          <Field label="Uncorrected errors" value={errors} onChange={setErrors} />
        </div>

        <div className="flex flex-col justify-center border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          {result ? (
            <>
              <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">Net WPM</p>
              <Readout value={result.netWpm} decimals={1} className="text-signal" />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Stat label="Raw WPM" value={result.rawWpm.toFixed(1)} />
                <Stat label="Accuracy" value={`${result.accuracy.toFixed(1)}%`} />
              </div>
            </>
          ) : (
            <p className="font-body text-sm text-fg-muted">Enter a time greater than zero to see a result.</p>
          )}
        </div>
      </div>
    </Panel>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="font-data text-[11px] uppercase tracking-wide text-fg-muted">{label}</span>
      <input
        type="number"
        min={0}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-sm border border-border bg-panel-raised px-3 py-2 font-data text-sm text-fg"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="tabular-nums font-data text-xl font-medium text-fg">{value}</p>
    </div>
  );
}
