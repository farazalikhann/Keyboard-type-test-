/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "What the results from Keyboard Toolkit's tools can and cannot tell you.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" breadcrumbLabel="Disclaimer" lastUpdated="March 2026">
      <p>
        The tools on {SITE_NAME} are designed to be genuinely useful, but they have real limits worth
        understanding before you rely on a result for something important, like a warranty claim or a job
        application.
      </p>

      <h2>Typing test results are indicative</h2>
      <p>
        Your words per minute and accuracy results reflect your performance on that specific test, with that
        specific text, at that specific moment. They are a reasonable and honest measurement, but typing speed
        varies with tiredness, the specific words or punctuation involved, and how familiar you are with this
        particular test's format. Treat a single result as an indication of your general range rather than a
        precise, fixed score, and look at a few results over time for a more reliable picture.
      </p>

      <h2>The keyboard test cannot detect every hardware fault</h2>
      <p>
        The keyboard tester reports what your browser detects when you press a key. It can reliably show you
        whether a key is registering a signal to your operating system and browser. It cannot inspect the
        physical switch mechanism, detect a fault that only appears under specific pressure or temperature
        conditions, or diagnose issues that occur below the software level, such as a connector on the verge of
        failing intermittently. A key that tests as working today can still fail tomorrow, and a key that
        currently fails to register might be caused by something outside the keyboard itself, such as a
        driver or operating system setting.
      </p>
      <p>
        If a diagnostic report from this site shows unresponsive keys, treat that as strong evidence worth
        acting on, not as a certified hardware inspection. For high value warranty or return claims, check
        whether the manufacturer or seller has their own required diagnostic process.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on this site constitutes professional technical, legal, or career advice. Information about
        typing speed benchmarks for jobs, keyboard troubleshooting steps, or similar guidance reflects general,
        commonly understood practice, not advice tailored to your specific situation. Consult a relevant
        professional for decisions with real financial or legal consequences.
      </p>

      <p>
        See also the <Link href="/terms">terms of use</Link>, which describe the limitation of liability that
        applies alongside this disclaimer.
      </p>
    </LegalLayout>
  );
}
