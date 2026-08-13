"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { allKeyCodes, keyLabel, type LayoutVariant } from "@/lib/keyboardLayouts";

const LAYOUT_LABEL: Record<LayoutVariant, string> = {
  ansi: "ANSI full-size",
  iso: "ISO full-size",
  tkl: "Tenkeyless (TKL)",
};

interface DiagnosticSummaryProps {
  variant: LayoutVariant;
  verified: Set<string>;
}

export function DiagnosticSummary({ variant, verified }: DiagnosticSummaryProps) {
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const total = allKeyCodes(variant);
  const unresponsive = total.filter((code) => !verified.has(code)).map((code) => keyLabel(code, variant));

  async function download() {
    const canvas = await renderReportCanvas(variant, total.length, unresponsive);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `keyboard-diagnostic-${variant}-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <Panel label="Diagnostic summary">
      <div className="p-4">
        {!generated ? (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-body text-sm text-fg-muted">
              Generate a report naming exactly which keys did not register. Useful for a warranty claim or a
              return request.
            </p>
            <Button variant="primary" onClick={() => setGenerated(true)}>
              Generate summary
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-sm border border-border bg-panel-raised p-4 font-data text-sm">
              <p className="text-[11px] uppercase tracking-wide text-fg-muted">Keyboard diagnostic report</p>
              <p className="mt-1 text-fg-muted">
                Layout tested: <span className="text-fg">{LAYOUT_LABEL[variant]}</span>
              </p>
              <p className="text-fg-muted">
                Date: <span className="text-fg">{new Date().toLocaleDateString()}</span>
              </p>
              <p className="text-fg-muted">
                Keys tested: <span className="text-fg">{verified.size}</span> of {total.length}
              </p>
              <p className="mt-3 leading-relaxed">
                {unresponsive.length === 0 ? (
                  <span className="text-signal">All {total.length} keys registered a response.</span>
                ) : (
                  <span className="text-warning">
                    {unresponsive.length} key{unresponsive.length === 1 ? "" : "s"} did not register during this
                    test: {unresponsive.join(", ")}.
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={download}>
                Download as image
              </Button>
              <Button variant="ghost" onClick={() => setGenerated(false)}>
                Close report
              </Button>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Panel>
  );
}

async function renderReportCanvas(
  variant: LayoutVariant,
  totalCount: number,
  unresponsive: string[]
): Promise<HTMLCanvasElement> {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // font loading readiness isn't guaranteed everywhere — draw with whatever is available
    }
  }

  const width = 1000;
  const height = 560;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  const base = "#11141a";
  const panel = "#1a1f27";
  const border = "#313a46";
  const fg = "#e4e7ec";
  const fgMuted = "#7c8695";
  const signal = "#4de8c9";
  const warning = "#ff5c5c";

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.strokeRect(24.5, 24.5, width - 49, height - 49);

  ctx.fillStyle = panel;
  ctx.fillRect(24, 24, width - 48, 88);
  ctx.strokeStyle = border;
  ctx.strokeRect(24.5, 24.5, width - 49, 87);

  ctx.fillStyle = signal;
  ctx.font = "600 13px 'IBM Plex Mono', monospace";
  ctx.fillText("KEYBOARD TOOLKIT · DIAGNOSTIC REPORT", 48, 60);

  ctx.fillStyle = fg;
  ctx.font = "700 30px 'Space Grotesk', sans-serif";
  ctx.fillText("Keyboard diagnostic summary", 48, 96);

  let y = 160;
  ctx.font = "400 16px 'IBM Plex Mono', monospace";
  ctx.fillStyle = fgMuted;
  ctx.fillText("Layout tested", 48, y);
  ctx.fillStyle = fg;
  ctx.fillText(LAYOUT_LABEL[variant], 260, y);

  y += 34;
  ctx.fillStyle = fgMuted;
  ctx.fillText("Date", 48, y);
  ctx.fillStyle = fg;
  ctx.fillText(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }), 260, y);

  y += 34;
  ctx.fillStyle = fgMuted;
  ctx.fillText("Keys tested", 48, y);
  ctx.fillStyle = fg;
  ctx.fillText(`${totalCount - unresponsive.length} of ${totalCount}`, 260, y);

  y += 60;
  ctx.strokeStyle = border;
  ctx.beginPath();
  ctx.moveTo(48, y);
  ctx.lineTo(width - 48, y);
  ctx.stroke();

  y += 50;
  ctx.font = "600 18px 'IBM Plex Mono', monospace";
  if (unresponsive.length === 0) {
    ctx.fillStyle = signal;
    ctx.fillText(`All ${totalCount} keys registered a response during this test.`, 48, y);
  } else {
    ctx.fillStyle = warning;
    const headline = `${unresponsive.length} key${unresponsive.length === 1 ? "" : "s"} did not register during this test:`;
    ctx.fillText(headline, 48, y);

    y += 36;
    ctx.font = "400 16px 'IBM Plex Mono', monospace";
    const maxWidth = width - 96;
    const line = unresponsive.join(", ") + ".";
    wrapText(ctx, line, 48, y, maxWidth, 26).forEach(() => {});
  }

  ctx.font = "400 12px 'IBM Plex Mono', monospace";
  ctx.fillStyle = fgMuted;
  ctx.fillText("Generated locally in the browser. No data was sent to a server.", 48, height - 40);

  return canvas;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number[] {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  const lines: number[] = [];
  ctx.fillStyle = "#ff5c5c";
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      lines.push(currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    lines.push(currentY);
  }
  return lines;
}
