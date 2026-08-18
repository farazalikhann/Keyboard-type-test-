"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ReadoutProps {
  value: number;
  decimals?: number;
  live?: boolean;
  size?: "lg" | "xl";
  suffix?: string;
  className?: string;
}

/** A dominant numeric readout that counts and settles toward its target rather than snapping. */
export function Readout({ value, decimals = 0, live = false, size = "xl", suffix, className = "" }: ReadoutProps) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const frame = useRef<number>();

  useEffect(() => {
    if (reducedMotion || live) {
      setDisplay(value);
      return;
    }
    const start = display;
    const delta = value - start;
    if (Math.abs(delta) < 0.05) {
      setDisplay(value);
      return;
    }
    const duration = 420;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + delta * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    }
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reducedMotion, live]);

  const sizeClass = size === "xl" ? "text-6xl sm:text-7xl" : "text-4xl sm:text-5xl";

  return (
    <span
      className={`tabular-nums font-data font-medium leading-none ${sizeClass} ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {display.toFixed(decimals)}
      {suffix && <span className="ml-1 text-[0.35em] font-normal uppercase tracking-wide text-fg-muted">{suffix}</span>}
    </span>
  );
}
