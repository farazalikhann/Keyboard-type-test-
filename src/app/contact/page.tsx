/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about a bug, a suggestion, or a question about Keyboard Toolkit.",
  alternates: { canonical: "/contact" },
};

// Fill this in with a real Formspree (or similar) form endpoint before relying on the form below.
// Until then, the mailto link above it is the guaranteed-working contact method.
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORM_ID";
const FORM_CONFIGURED = !FORM_ENDPOINT.includes("REPLACE_WITH");

export default function ContactPage() {
  return (
    <LegalLayout title="Contact" breadcrumbLabel="Contact">
      <p>
        The most reliable way to reach me is email:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. I read every message, though replies can take a
        few days depending on how busy things are.
      </p>
      <p>
        Use email for bug reports, a keyboard layout that isn't rendering correctly, ideas for a tool you'd
        find useful, or anything about how the site handles your data. Include your browser and operating
        system for anything that looks like a rendering or input bug, since keyboard layout and touch input
        issues are often specific to a particular browser and device combination.
      </p>

      {FORM_CONFIGURED ? (
        <form action={FORM_ENDPOINT} method="POST" className="mt-6 space-y-3 not-prose">
          <div>
            <label htmlFor="contact-email" className="block font-body text-xs uppercase tracking-wide text-fg-muted">
              Your email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-sm border border-border bg-panel-raised px-3 py-2 font-body text-sm text-fg"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block font-body text-xs uppercase tracking-wide text-fg-muted">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-sm border border-border bg-panel-raised px-3 py-2 font-body text-sm text-fg"
            />
          </div>
          <button
            type="submit"
            className="rounded-sm bg-signal px-4 py-2 font-data text-xs font-semibold uppercase tracking-wide text-base"
          >
            Send message
          </button>
        </form>
      ) : (
        <p className="rounded-sm border border-dashed border-border bg-panel p-4 text-xs text-fg-muted">
          A contact form will go here once a form endpoint is configured. Email is the reliable way to reach me
          in the meantime.
        </p>
      )}
    </LegalLayout>
  );
}
