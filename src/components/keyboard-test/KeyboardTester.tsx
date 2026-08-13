"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { TelemetryTrace } from "@/components/telemetry/TelemetryTrace";
import { useIsTouchOnly } from "@/lib/useIsTouchOnly";
import { keyLabel, type LayoutVariant } from "@/lib/keyboardLayouts";
import { KeyboardLayout } from "./KeyboardLayout";
import { useKeyboardTester } from "./useKeyboardTester";
import { DiagnosticSummary } from "./DiagnosticSummary";

const LAYOUTS: { id: LayoutVariant; label: string }[] = [
  { id: "ansi", label: "ANSI" },
  { id: "iso", label: "ISO" },
  { id: "tkl", label: "TKL" },
];

export function KeyboardTester() {
  const [variant, setVariant] = useState<LayoutVariant>("ansi");
  const touchOnly = useIsTouchOnly();
  const tester = useKeyboardTester(variant);

  if (touchOnly) {
    return (
      <Panel label="Keyboard test">
        <div className="p-8 text-center">
          <p className="font-display text-xl font-bold text-fg">A physical keyboard is required</p>
          <p className="mx-auto mt-2 max-w-md font-body text-sm text-fg-muted">
            This device appears to have no physical keyboard attached. Connect one, or open this page on a
            computer, to test individual keys. The typing test works fine on a touchscreen if you want to
            measure speed instead.
          </p>
        </div>
      </Panel>
    );
  }

  const heldModifiers = Array.from(tester.modifiersHeld).map((code) => keyLabel(code, variant));

  return (
    <div className="space-y-3">
      <Panel
        label="Keyboard test"
        corner={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-sm border border-border bg-panel-raised p-1">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setVariant(l.id)}
                  className={`rounded-sm px-2.5 py-1 font-data text-xs uppercase tracking-wide transition-colors ${
                    variant === l.id ? "bg-signal text-base" : "text-fg-muted hover:text-fg"
                  }`}
                  aria-pressed={variant === l.id}
                >
                  {l.label}
                </button>
              ))}
            </div>
            {tester.capturing ? (
              <Button variant="primary" onClick={tester.stop}>
                Exit test
              </Button>
            ) : (
              <Button variant="primary" onClick={tester.start}>
                Start test
              </Button>
            )}
          </div>
        }
      >
        <div className="p-5">
          {!tester.capturing ? (
            <p className="mb-4 font-body text-sm text-fg-muted">
              Starting the test captures every key on this page, including Tab, function keys, and browser
              shortcuts, so you can test all of them. Use the exit test button to leave at any time.
            </p>
          ) : (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-panel-raised p-3 font-data text-xs">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-fg-muted">Last key </span>
                  <span className="text-signal">{tester.lastEvent?.label ?? "—"}</span>
                </div>
                <div>
                  <span className="text-fg-muted">Code </span>
                  <span className="text-fg">{tester.lastEvent?.code ?? "—"}</span>
                </div>
                <div>
                  <span className="text-fg-muted">Character </span>
                  <span className="text-fg">{tester.lastEvent?.key ?? "—"}</span>
                </div>
                <div>
                  <span className="text-fg-muted">Time </span>
                  <span className="text-fg">{tester.lastEvent?.time ?? "—"}</span>
                </div>
              </div>
              <div className="text-fg-muted">
                Modifiers held: <span className="text-fg">{heldModifiers.length ? heldModifiers.join(" + ") : "none"}</span>
              </div>
            </div>
          )}

          <div className="overflow-x-auto pb-2">
            <KeyboardLayout variant={variant} pressed={tester.pressed} verified={tester.verified} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-data text-xs text-fg-muted">
              Verified <span className="text-signal">{tester.verified.size}</span> keys
            </p>
            <Button variant="ghost" onClick={tester.clear}>
              Clear results
            </Button>
          </div>
        </div>
      </Panel>

      <Panel label="Event trace" className="overflow-hidden">
        <div className="p-3">
          <TelemetryTrace ticks={tester.ticks} height={80} emptyHint="Key events appear here once the test starts" />
        </div>
      </Panel>

      <DiagnosticSummary variant={variant} verified={tester.verified} />
    </div>
  );
}
