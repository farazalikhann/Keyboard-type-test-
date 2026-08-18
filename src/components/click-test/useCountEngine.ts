"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TraceTick } from "@/components/telemetry/TelemetryTrace";

export type CountEngineStatus = "idle" | "running" | "finished";

interface CountState {
  status: CountEngineStatus;
  count: number;
  ticks: TraceTick[];
  elapsedMs: number;
  rate: number; // count per second, live
}

/** Shared engine for "press/click N times within a duration" tools: click speed, spacebar counter. */
export function useCountEngine(durationSeconds: number) {
  const [state, setState] = useState<CountState>({ status: "idle", count: 0, ticks: [], elapsedMs: 0, rate: 0 });
  const startTimeRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const rafRef = useRef<number>();

  const reset = useCallback(() => {
    startTimeRef.current = null;
    lastTickRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setState({ status: "idle", count: 0, ticks: [], elapsedMs: 0, rate: 0 });
  }, []);

  useEffect(() => {
    reset();
  }, [durationSeconds, reset]);

  const finish = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setState((prev) => (prev.status === "finished" ? prev : { ...prev, status: "finished" }));
  }, []);

  useEffect(() => {
    if (state.status !== "running") return;
    function tick() {
      const start = startTimeRef.current;
      if (start == null) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = performance.now() - start;
      const remaining = durationSeconds * 1000 - elapsed;
      if (remaining <= 0) {
        finish();
        return;
      }
      setState((prev) => ({
        ...prev,
        elapsedMs: elapsed,
        rate: elapsed > 0 ? prev.count / (elapsed / 1000) : 0,
      }));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state.status, durationSeconds, finish]);

  const register = useCallback(() => {
    setState((prev) => {
      if (prev.status === "finished") return prev;
      const now = performance.now();
      let status = prev.status;
      if (status === "idle") {
        startTimeRef.current = now;
        lastTickRef.current = now;
        status = "running";
      }
      const prevT = lastTickRef.current;
      const interval = prevT == null ? 0 : now - prevT;
      lastTickRef.current = now;
      const count = prev.count + 1;
      const elapsed = startTimeRef.current ? now - startTimeRef.current : 0;
      return {
        ...prev,
        status,
        count,
        ticks: [...prev.ticks, { interval, error: false }],
        elapsedMs: elapsed,
        rate: elapsed > 0 ? count / (elapsed / 1000) : 0,
      };
    });
  }, []);

  return { ...state, register, reset, finishNow: finish };
}
