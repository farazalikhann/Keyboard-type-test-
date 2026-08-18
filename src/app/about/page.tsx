/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Keyboard Toolkit",
  description:
    "Who runs Keyboard Toolkit, why it exists, and how the typing test and keyboard diagnostics work entirely inside your browser.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalLayout title="About Keyboard Toolkit" breadcrumbLabel="About">
      <p>
        Keyboard Toolkit is a small set of browser based instruments for measuring typing speed and testing
        keyboard hardware. It started from a simple frustration: most typing tests online feel like they were
        built for a marketing page rather than for someone who actually wants an honest, precise reading of how
        they type, and most keyboard testers stop at "press some keys and see if they light up" without giving
        you anything useful to act on afterward, like a report you can actually send to a seller.
      </p>
      <p>
        The site is built and maintained by {AUTHOR}, a computer science student and web developer. It is a
        solo project, built in the open in the sense that every tool on it is meant to be genuinely useful on
        its own, not a thin wrapper designed only to carry ads. The ads that do appear on the site exist to
        cover hosting and development time, not the other way around.
      </p>

      <h2>Why everything runs in your browser</h2>
      <p>
        Every tool on this site, the typing test, the keyboard tester, and everything since, runs entirely on
        your device using JavaScript in your browser. Nothing you type during a test is sent to a server,
        because there is no server involved in running the tests at all. This is not a privacy feature bolted
        on for marketing purposes. It is simply the most straightforward way to build a tool like this: your
        keystrokes are measured locally, using the browser's own high resolution timer, and the results are
        calculated and shown to you without ever leaving your device.
      </p>
      <p>
        The one exception is personal bests and saved settings, which are stored using your browser's
        localStorage so they persist between visits. That data also never leaves your device. Clearing your
        browser's site data for this domain removes it completely.
      </p>

      <h2>How the tools are built</h2>
      <p>
        The site is built with Next.js and exported as a fully static site, meaning there is no backend
        database or API for it to talk to. The typing test uses the browser's <code>performance.now()</code>{" "}
        high resolution timer rather than a coarser clock, so word per minute calculations stay accurate even
        under load. The keyboard tester reads the physical position of each key, using the browser's{" "}
        <code>event.code</code> property rather than the character it produces, so results stay accurate
        regardless of what keyboard layout or language you have set on your system.
      </p>
      <p>
        Design decisions on this site lean toward an instrument panel feel on purpose: dense information,
        immediate feedback, and a live trace of your input rhythm, rather than a generic dashboard look. The
        goal is for the site to feel like a piece of measuring equipment, because that is functionally what it
        is.
      </p>

      <h2>What the site is not</h2>
      <p>
        This is not a professional diagnostic service, and results here should not be treated as a substitute
        for a manufacturer's own testing tools when something serious is at stake, like a formal warranty
        dispute involving expensive hardware. It is a genuinely useful first check for common problems: how
        fast you type, which keys on your keyboard aren't registering, and similar everyday questions, built by
        someone who actually wanted these answers and couldn't find a version of these tools that felt right.
      </p>

      <p>
        Read the{" "}
        <Link href="/privacy-policy">privacy policy</Link> for details on cookies and advertising, or{" "}
        <Link href="/contact">get in touch</Link> if you run into a bug or have a suggestion.
      </p>
    </LegalLayout>
  );
}
