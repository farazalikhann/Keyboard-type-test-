"use client";

import { useCallback, useEffect, useState } from "react";
import { keyLabel } from "@/lib/keyboardLayouts";

export function useRolloverTest() {
  const [capturing, setCapturing] = useState(false);
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [maxReached, setMaxReached] = useState(0);

  const clear = useCallback(() => {
    setPressed(new Set());
    setMaxReached(0);
  }, []);

  useEffect(() => {
    if (!capturing) return;

    function onKeyDown(e: KeyboardEvent) {
      e.preventDefault();
      if (e.repeat) return;
      setPressed((prev) => {
        const next = new Set(prev).add(e.code);
        setMaxReached((m) => Math.max(m, next.size));
        return next;
      });
    }
    function onKeyUp(e: KeyboardEvent) {
      e.preventDefault();
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    }
    function onBlur() {
      setPressed(new Set());
    }

    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("keyup", onKeyUp, { capture: true });
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("keyup", onKeyUp, { capture: true });
      window.removeEventListener("blur", onBlur);
    };
  }, [capturing]);

  const pressedLabels = Array.from(pressed).map((code) => keyLabel(code, "ansi"));

  return {
    capturing,
    start: () => setCapturing(true),
    stop: () => {
      setCapturing(false);
      setPressed(new Set());
    },
    pressed,
    pressedLabels,
    maxReached,
    clear,
  };
}
