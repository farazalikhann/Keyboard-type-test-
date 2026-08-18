"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/site";

interface AdSlotProps {
  slotId: string;
  height: number;
  format?: string;
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A fixed-height ad container so an ad loading never shifts layout. Renders a labeled placeholder
 * box until a real AdSense client ID is configured (see lib/site.ts), so the reserved space is
 * always visible during development without ever calling Google's script with a placeholder ID.
 */
export function AdSlot({ slotId, height, format = "auto", label = "Advertisement", className = "" }: AdSlotProps) {
  useEffect(() => {
    if (!ADSENSE_ENABLED) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not ready yet (e.g. consent not yet granted) — nothing to recover here
    }
  }, []);

  if (!ADSENSE_ENABLED) {
    return (
      <div
        className={`flex w-full items-center justify-center rounded-sm border border-dashed border-border bg-panel/40 font-data text-[11px] uppercase tracking-wide text-fg-muted ${className}`}
        style={{ height }}
        aria-hidden="true"
      >
        Ad space · {label}
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ minHeight: height }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: height }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
