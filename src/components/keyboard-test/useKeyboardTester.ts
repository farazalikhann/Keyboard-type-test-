"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TraceTick } from "@/components/telemetry/TelemetryTrace";
import type { LayoutVariant } from "@/lib/keyboardLayouts";
import { keyLabel } from "@/lib/keyboardLayouts";

export interface LastEvent {
  code: string;
  key: string;
  label: string;
  time: string;
}

const MODIFIER_CODES = new Set([
  "ShiftLeft",
  "ShiftRight",
  "ControlLeft",
  "ControlRight",
  "AltLeft",
  "AltRight",
  "MetaLeft",
  "MetaRight",
]);

export function useKeyboardTester(variant: LayoutVariant) {
  const [capturing, setCapturing] = useState(false);
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [verified, setVerified] = useState<Set<string>>(new Set());
  const [modifiersHeld, setModifiersHeld] = useState<Set<string>>(new Set());
  const [lastEvent, setLastEvent] = useState<LastEvent | null>(null);
  const [ticks, setTicks] = useState<TraceTick[]>([]);
  const lastEventTime = useRef<number | null>(null);

  const clear = useCallback(() => {
    setVerified(new Set());
    setPressed(new Set());
    setLastEvent(null);
    setTicks([]);
    lastEventTime.current = null;
  }, []);

  // switching the physical layout means a different key set — verified state no longer applies
  useEffect(() => {
    clear();
  }, [variant, clear]);

  useEffect(() => {
    if (!capturing) return;

    function onKeyDown(e: KeyboardEvent) {
      e.preventDefault();
      if (e.repeat) return;
      const { code, key } = e;

      setPressed((prev) => new Set(prev).add(code));
      setVerified((prev) => new Set(prev).add(code));
      if (MODIFIER_CODES.has(code)) {
        setModifiersHeld((prev) => new Set(prev).add(code));
      }

      const now = performance.now();
      const interval = lastEventTime.current == null ? 0 : now - lastEventTime.current;
      lastEventTime.current = now;
      setTicks((prev) => [...prev, { interval, error: false }]);

      setLastEvent({
        code,
        key: key === " " ? "Space" : key,
        label: keyLabel(code, variant),
        time: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      });
    }

    function onKeyUp(e: KeyboardEvent) {
      e.preventDefault();
      const { code } = e;
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
      if (MODIFIER_CODES.has(code)) {
        setModifiersHeld((prev) => {
          const next = new Set(prev);
          next.delete(code);
          return next;
        });
      }
    }

    function onBlur() {
      setPressed(new Set());
      setModifiersHeld(new Set());
    }

    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("keyup", onKeyUp, { capture: true });
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("keyup", onKeyUp, { capture: true });
      window.removeEventListener("blur", onBlur);
    };
  }, [capturing, variant]);

  return {
    capturing,
    start: () => setCapturing(true),
    stop: () => {
      setCapturing(false);
      setPressed(new Set());
      setModifiersHeld(new Set());
    },
    pressed,
    verified,
    modifiersHeld,
    lastEvent,
    ticks,
    clear,
  };
}
