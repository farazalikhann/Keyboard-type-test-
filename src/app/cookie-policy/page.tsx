/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "The categories of cookies used on Keyboard Toolkit and how to manage them.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie policy" breadcrumbLabel="Cookie policy" lastUpdated="March 2026">
      <p>
        {SITE_NAME} uses a small number of cookies and browser storage items, described by category below. The
        site does not use tracking cookies of its own; the only third party cookies come from Google AdSense
        once you accept the cookie banner.
      </p>

      <h2>Strictly necessary</h2>
      <p>
        Your cookie consent choice itself is stored in localStorage (not a cookie, but functionally similar) so
        the banner does not reappear on every visit. This is required for the banner to function and is not
        optional.
      </p>

      <h2>Functional</h2>
      <p>
        Your theme preference (light or dark) and, where available, personal best results and test history are
        stored in localStorage. These make the site remember your preferences between visits. Nothing in this
        category is used for advertising or shared with any third party.
      </p>

      <h2>Advertising</h2>
      <p>
        If you accept the cookie banner, Google AdSense's script loads and may set cookies, including the
        DoubleClick DART cookie, to serve and measure ads, potentially including ads personalized to your
        browsing activity across sites. These cookies are set by Google and its advertising partners, not
        directly by this site. If you reject the banner, the AdSense script does not load and these cookies are
        not set as a result of visiting this site.
      </p>

      <h2>How to manage cookies</h2>
      <ul>
        <li>Use the cookie banner shown on your first visit to accept or reject advertising cookies.</li>
        <li>
          Clear your browser's cookies and site data for this domain at any time to reset all stored
          preferences and consent choices.
        </li>
        <li>
          Visit{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>{" "}
          to manage how Google personalizes ads for you across the sites it serves ads on.
        </li>
        <li>
          Visit{" "}
          <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>{" "}
          to opt out of interest based advertising from participating companies more broadly.
        </li>
        <li>Most browsers also let you block third party cookies entirely in their privacy settings.</li>
      </ul>

      <p>
        See the <Link href="/privacy-policy">privacy policy</Link> for the fuller picture of how data is
        handled on this site.
      </p>
    </LegalLayout>
  );
}
