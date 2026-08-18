/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Keyboard Toolkit handles data, local storage, cookies, and advertising through Google AdSense.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy policy" breadcrumbLabel="Privacy policy" lastUpdated="March 2026">
      <p>
        This policy explains what {SITE_NAME} does and does not do with your data. The short version: the
        typing test and keyboard tester run entirely in your browser and never send what you type to a server.
        The site shows ads through Google AdSense, which involves third party cookies described below. Read on
        for the full detail.
      </p>

      <h2>What this site does not do</h2>
      <p>
        {SITE_NAME} has no account system, no server side database, and no backend that receives what you type
        during a typing test or a keyboard test. Every calculation, including your words per minute, accuracy,
        and which keys registered, happens locally in your browser using JavaScript. This is a structural fact
        about how the site is built, not a policy choice that could quietly change: there is simply no server
        for that data to be sent to.
      </p>

      <h2>Local storage</h2>
      <p>
        The site uses your browser's localStorage to remember your theme preference (light or dark), your
        cookie consent choice, and, where the feature is available, personal best results and recent test
        history. This data is stored only on your device and is never transmitted anywhere. Clearing your
        browser's site data for this domain removes it completely, and doing so simply resets those
        preferences and history to their defaults.
      </p>

      <h2>Advertising and Google AdSense</h2>
      <p>
        This site displays ads served by Google AdSense. Google and its advertising partners use cookies,
        including the DoubleClick DART cookie, to serve ads based on your visits to this site and other sites
        on the internet. This may include personalized advertising based on your browsing activity, unless you
        have opted out or your region's settings restrict it.
      </p>
      <p>
        You can opt out of personalized advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        , or opt out of a third party vendor's use of cookies for personalized advertising by visiting{" "}
        <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">
          aboutads.info
        </a>
        . Ads shown on this site are only loaded after you accept the cookie banner shown on your first visit;
        if you reject it, the AdSense script does not load and no advertising cookies from this site are set as
        a result.
      </p>
      <p>
        Google's own use of advertising cookies enables it and its partners to serve ads to you based on your
        visit to this site and other sites on the internet. You can read more about how Google uses data from
        sites that use its services at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          Google's Partner Sites policy
        </a>
        .
      </p>

      <h2>Analytics</h2>
      <p>
        This site does not currently use any analytics or tracking service beyond what Google AdSense itself
        requires to serve and measure ads. If that changes in the future, this policy will be updated in the
        same change that adds it, and this section will describe exactly what is collected and why.
      </p>

      <h2>Children's privacy</h2>
      <p>
        This site is not directed at children under 13, and does not knowingly collect personal information
        from anyone, regardless of age, since the tools do not require an account or any personal information
        to use. If you believe a child has provided personal information through the contact form, contact us
        using the details below and it will be removed.
      </p>

      <h2>Your rights under GDPR and CCPA</h2>
      <p>
        If you are located in the European Economic Area or the United Kingdom, you have rights under the
        General Data Protection Regulation, including the right to access, correct, or delete personal data
        held about you, and the right to object to processing based on legitimate interest, including
        advertising. If you are a California resident, you have rights under the California Consumer Privacy
        Act, including the right to know what personal information is collected and the right to opt out of
        its sale.
      </p>
      <p>
        Because this site does not operate its own server side data collection, most personal data connected to
        your visit here is held by Google in connection with AdSense, rather than by this site directly. Use
        the Google Ads Settings and About Ads opt out links above to exercise advertising related rights
        directly with those services, or contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
        with any request related to this site specifically.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        This policy may be updated as the site changes, particularly if a new feature adds analytics or another
        data collection mechanism. The "last updated" date at the top of this page reflects the most recent
        change.
      </p>

      <p>
        See also the <Link href="/cookie-policy">cookie policy</Link> for a category by category breakdown of
        cookies used on this site, and the <Link href="/terms">terms of use</Link>.
      </p>
    </LegalLayout>
  );
}
