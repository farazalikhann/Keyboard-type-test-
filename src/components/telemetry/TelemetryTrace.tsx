"use client";

import { useEffect, useRef } from "react";

export interface TraceTick {
  /** milliseconds since the previous tick (or since the trace started, for the first tick) */
  interval: number;
  error?: boolean;
}

interface TelemetryTraceProps {
  ticks: TraceTick[];
  /** true once the run has ended: the trace stretches to fill the width and stops scrolling */
  frozen?: boolean;
  height?: number;
  maxIntervalMs?: number;
  emptyHint?: string;
  className?: string;
}

const LIVE_SPACING = 5;

/**
 * The site's signature element: a strip-chart trace of input rhythm.
 * Reused for keystroke intervals, click intervals, and keyboard test event logs.
 * Height maps to interval since the previous tick; the warning color marks errors.
 */
export function TelemetryTrace({
  ticks,
  frozen = false,
  height = 96,
  maxIntervalMs = 700,
  emptyHint = "Telemetry appears once input starts",
  className = "",
}: TelemetryTraceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      widthRef.current = w;
      draw();
    });
    observer.observe(container);
    widthRef.current = container.clientWidth;
    draw();
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticks, frozen, height, maxIntervalMs]);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = widthRef.current;
    if (width <= 0) return;

    const style = getComputedStyle(document.documentElement);
    const colorBorder = style.getPropertyValue("--border").trim() || "#313a46";
    const colorSignal = style.getPropertyValue("--signal").trim() || "#4de8c9";
    const colorWarning = style.getPropertyValue("--warning").trim() || "#ff5c5c";

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const baselineY = height - 10;

    // baseline
    ctx.strokeStyle = colorBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, baselineY + 0.5);
    ctx.lineTo(width, baselineY + 0.5);
    ctx.stroke();

    if (ticks.length === 0) return;

    const usableHeight = baselineY - 8;
    const barMinHeight = 2;

    if (frozen) {
      const spacing = width / ticks.length;
      const barWidth = Math.max(1, Math.min(spacing * 0.7, 5));
      ticks.forEach((tick, i) => {
        const x = i * spacing + spacing / 2;
        const magnitude = Math.min(tick.interval, maxIntervalMs) / maxIntervalMs;
        const barHeight = Math.max(barMinHeight, magnitude * usableHeight);
        ctx.fillStyle = tick.error ? colorWarning : colorSignal;
        ctx.globalAlpha = tick.error ? 1 : 0.85;
        ctx.fillRect(x - barWidth / 2, baselineY - barHeight, barWidth, barHeight);
      });
      ctx.globalAlpha = 1;
    } else {
      const visibleCount = Math.floor(width / LIVE_SPACING);
      const visible = ticks.slice(-visibleCount);
      const barWidth = 2.5;
      visible.forEach((tick, i) => {
        const fromRight = visible.length - 1 - i;
        const x = width - fromRight * LIVE_SPACING - LIVE_SPACING / 2;
        if (x < 0) return;
        const magnitude = Math.min(tick.interval, maxIntervalMs) / maxIntervalMs;
        const barHeight = Math.max(barMinHeight, magnitude * usableHeight);
        ctx.fillStyle = tick.error ? colorWarning : colorSignal;
        ctx.globalAlpha = tick.error ? 1 : 0.85;
        ctx.fillRect(x - barWidth / 2, baselineY - barHeight, barWidth, barHeight);
      });
      ctx.globalAlpha = 1;

      // playhead
      ctx.fillStyle = colorSignal;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(width - 1.5, 4, 1.5, baselineY - 4);
      ctx.globalAlpha = 1;
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-sm border border-border bg-panel/60 ${className}`}
      style={{ height }}
      role="img"
      aria-label={frozen ? "Frozen input rhythm trace" : "Live input rhythm trace"}
    >
      <canvas ref={canvasRef} className="block" />
      {ticks.length === 0 && (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-data text-xs text-fg-muted">
          {emptyHint}
        </p>
      )}
    </div>
  );
}
