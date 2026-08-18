"use client";

import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { Readout } from "@/components/ui/Readout";
import { useRolloverTest } from "./useRolloverTest";

export function RolloverTest() {
  const rollover = useRolloverTest();

  return (
    <Panel
      label="Key rollover test"
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
            Starting the test captures every key on this page while it runs, so held combinations register
            accurately. Use the exit test button to leave at any time.
          </p>
        ) : (
          <p className="mb-4 font-body text-xs text-fg-muted">
            Hold down as many keys at once as you can, in different combinations across the keyboard.
          </p>
        )}

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
          <div>
            <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">Keys held now</p>
            <Readout value={rollover.pressed.size} decimals={0} live className="text-signal" />
          </div>
          <div>
            <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">Max reached</p>
            <Readout value={rollover.maxReached} decimals={0} live className="text-fg" />
          </div>
        </div>

        <div className="mt-6 min-h-[3rem] rounded-sm border border-border bg-panel-raised p-3 font-data text-sm text-fg">
          {rollover.pressedLabels.length > 0 ? rollover.pressedLabels.join(" + ") : (
            <span className="text-fg-muted">No keys currently held</span>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="ghost" onClick={rollover.clear}>
            Clear results
          </Button>
        </div>
      </div>
    </Panel>
  );
}
