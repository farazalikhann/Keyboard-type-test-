"use client";

import { useEffect, useState } from "react";

/** True when the device has no fine pointer and no hover — a phone or tablet with no physical keyboard attached. */
export function useIsTouchOnly(): boolean {
  const [touchOnly, setTouchOnly] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none) and (pointer: coarse)");
    setTouchOnly(query.matches);
    const listener = (e: MediaQueryListEvent) => setTouchOnly(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return touchOnly;
}
