"use client";

const CONSENT_KEY = "kbtk.consent";

export type ConsentChoice = "accepted" | "rejected";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function writeConsent(choice: ConsentChoice) {
  window.localStorage.setItem(CONSENT_KEY, choice);
  window.dispatchEvent(new CustomEvent("kbtk-consent-change", { detail: choice }));
}

export const CONSENT_CHANGE_EVENT = "kbtk-consent-change";
