"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent } from "@/lib/consent";

/**
 * A minimal, self-contained consent banner. It blocks non-essential scripts (the AdSense loader,
 * see AdsenseLoader) until the visitor makes a choice, and remembers that choice in localStorage.
 *
 * This is not a certified Consent Management Platform. Google requires a certified CMP (such as
 * Google-certified Funding Choices) for serving personalized/non-personalized ads compliantly to
 * EEA and UK visitors under the Google-mandated EU user consent policy. Treat this banner as a
 * baseline placeholder to keep the build self-contained — register a real CMP before serving ads
 * to EU/UK traffic at scale. See TODO-MANUAL.md.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(choice: "accepted" | "rejected") {
    writeConsent(choice);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-panel px-4 py-4 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.5)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-sm text-fg-muted">
          This site shows ads through Google AdSense, which may use cookies to serve ads based on your visits
          here and elsewhere. Test results and settings always stay in your browser regardless of your choice.
          Read the{" "}
          <Link href="/cookie-policy" className="text-signal underline underline-offset-2">
            cookie policy
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-sm border border-border bg-panel-raised px-3 py-2 font-data text-xs uppercase tracking-wide text-fg-muted hover:text-fg"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-sm bg-signal px-4 py-2 font-data text-xs font-semibold uppercase tracking-wide text-base"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
