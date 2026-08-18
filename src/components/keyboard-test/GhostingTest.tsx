/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { useRolloverTest } from "./useRolloverTest";
import { GHOSTING_COMBOS } from "./ghostingCombos";

export function GhostingTest() {
  const rollover = useRolloverTest();
  const [achieved, setAchieved] = useState<Set<string>>(new Set());

  useEffect(() => {
    GHOSTING_COMBOS.forEach((combo) => {
      const allHeld = combo.keys.every((k) => rollover.pressed.has(k.code));
      if (allHeld) {
        setAchieved((prev) => (prev.has(combo.name) ? prev : new Set(prev).add(combo.name)));
      }
    });
  }, [rollover.pressed]);

  function clearAll() {
    rollover.clear();
    setAchieved(new Set());
  }

  return (
    <Panel
      label="Ghosting test"
      corner={
        rollover.capturing ? (
          <Button variant="primary" onClick={rollover.stop}>
            Exit test
          </Button>
        ) : (
          <Button variant="primary" onClick={rollover.start}>
            Start test
          </Button>
        )
      }
    >
      <div className="p-5">
        {!rollover.capturing ? (
          <p className="mb-4 font-body text-sm text-fg-muted">
            Starting the test captures every key on this page while it runs. Try holding each combination below
            fully at once to check whether every key in it registers together.
          </p>
        ) : (
          <p className="mb-4 font-body text-xs text-fg-muted">
            Hold every key in a combination at the same time. It's marked confirmed once all of its keys have
            registered together at least once.
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {GHOSTING_COMBOS.map((combo) => {
            const heldCount = combo.keys.filter((k) => rollover.pressed.has(k.code)).length;
            const isAchieved = achieved.has(combo.name);
            return (
              <div key={combo.name} className="rounded-sm border border-border bg-panel-raised p-3">
                <div className="flex items-center justify-between">
                  <p className="font-body text-sm font-semibold text-fg">{combo.name}</p>
                  <span
                    className={`font-data text-[10px] uppercase tracking-wide ${
                      isAchieved ? "text-signal" : "text-fg-muted"
                    }`}
                  >
                    {isAchieved ? "Confirmed" : `${heldCount}/${combo.keys.length}`}
                  </span>
                </div>
                <p className="mt-1 font-body text-xs text-fg-muted">{combo.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {combo.keys.map((k) => {
                    const held = rollover.pressed.has(k.code);
                    return (
                      <span
                        key={k.code}
                        className={`rounded-sm border px-2 py-0.5 font-data text-xs ${
                          held ? "border-signal bg-signal text-base" : "border-border text-fg-muted"
                        }`}
                      >
                        {k.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="ghost" onClick={clearAll}>
            Clear results
          </Button>
        </div>
      </div>
    </Panel>
  );
}
