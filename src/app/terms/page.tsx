/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply to using Keyboard Toolkit's typing test and keyboard diagnostic tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of use" breadcrumbLabel="Terms of use" lastUpdated="March 2026">
      <p>
        These terms apply to your use of {SITE_NAME}. By using the site, you agree to them. If you do not
        agree, please do not use the site.
      </p>

      <h2>Acceptable use</h2>
      <p>
        The tools on this site are provided for personal, non-commercial use in measuring typing speed and
        testing keyboard hardware. You agree not to use automated systems to scrape, overload, or abuse the
        site, and not to attempt to interfere with its normal operation for other visitors.
      </p>

      <h2>No warranty on hardware diagnostics</h2>
      <p>
        The keyboard tester and related diagnostic tools on this site are provided to help identify common
        keyboard problems, such as keys that fail to register. These tools report only what your browser
        detects and cannot inspect your keyboard's internal hardware directly. Results are provided "as is"
        without any warranty, express or implied, regarding their accuracy or completeness. See the{" "}
        <Link href="/disclaimer">disclaimer</Link> for more detail on the specific limits of these diagnostics.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The design, code, and written content on this site are owned by {SITE_NAME} and its author unless
        otherwise noted. You may not copy, redistribute, or create a derivative site using this site's design
        or written content without permission. Quoting short excerpts with a link back is fine.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE_NAME} and its author are not liable for any indirect,
        incidental, or consequential damages arising from your use of, or inability to use, this site or its
        tools, including any decision made based on a diagnostic result shown here, such as a warranty claim or
        purchase decision.
      </p>

      <h2>Changes to the site and these terms</h2>
      <p>
        The site and its tools may change, be added to, or be removed at any time without notice. These terms
        may also be updated periodically, with the "last updated" date above reflecting the most recent change.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction in which the site's operator resides, without
        regard to conflict of law principles. This section is intentionally general and will be updated with a
        specific jurisdiction if the site's operating structure requires it.
      </p>

      <p>
        Questions about these terms can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
