"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/site";
import { readConsent, CONSENT_CHANGE_EVENT } from "@/lib/consent";

/** Loads the AdSense script only once a visitor has accepted the cookie banner, and never in dev. */
export function AdsenseLoader() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(readConsent() === "accepted");
    function onChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      setConsented(detail === "accepted");
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!ADSENSE_ENABLED || !consented) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
