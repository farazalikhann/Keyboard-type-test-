/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { TypingTest } from "@/components/typing-test/TypingTest";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/ui/Faq";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { RelatedReading } from "@/components/blog/RelatedReading";

export const metadata: Metadata = {
  title: "1 minute typing test",
  description: "A focused 60 second typing speed test. Long enough for a real reading, short enough to fit into a break.",
  alternates: { canonical: "/typing-test/1-minute" },
};

const FAQ_ITEMS = [
  {
    question: "Is a 1 minute typing test accurate?",
    answer:
      "Yes, for a general sense of your speed. Sixty seconds is long enough to smooth out the first few seconds of getting into rhythm, which is why very short tests, like 15 seconds, tend to be noisier. It's still short enough that a single lucky or unlucky run can shift your result a little, so a few attempts give a more reliable picture than one.",
  },
  {
    question: "How is this different from the main typing test page?",
    answer:
      "It's the same engine and scoring, fixed at 60 seconds so you can bookmark or share a link that always starts at this duration, rather than needing to select it each time on the main typing test page, which defaults to 30 seconds.",
  },
];

export default function OneMinuteTypingTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="1 minute typing test"
        description="A 60 second typing speed test with live WPM, accuracy, and a rhythm trace."
        path="/typing-test/1-minute"
        featureList={["Fixed 60 second duration", "Live WPM and accuracy", "Rhythm trace"]}
      />
      <Breadcrumbs items={[{ label: "Typing test", href: "/typing-test" }, { label: "1 minute" }]} />
      <h1 className="sr-only">1 minute typing test</h1>

      <TypingTest defaultDuration={60} durationOptions={[60]} />

      <div className="mt-6">
        <AdSlot slotId="0000000017" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">Why 60 seconds is a solid default</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            One minute is long enough to move past the first few seconds of finding your rhythm, which is where
            a lot of the noise in very short tests comes from, while still being short enough to fit into a
            quick break. It's the duration most typing tests default to for exactly that balance.
          </p>
          <p>
            If you want to compare your speed over a longer, more sustained run, try the{" "}
            <a href="/typing-test/3-minute" className="text-signal underline underline-offset-2">
              3 minute test
            </a>{" "}
            or the{" "}
            <a href="/typing-test/5-minute" className="text-signal underline underline-offset-2">
              5 minute test
            </a>
            .
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/typing-test/1-minute" />
        <RelatedReading toolPath="/typing-test/1-minute" />

        <AdSlot slotId="0000000018" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
