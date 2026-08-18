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
  title: "3 minute typing test",
  description: "A longer 3 minute typing test that smooths out lucky bursts and shows your sustained typing speed.",
  alternates: { canonical: "/typing-test/3-minute" },
};

const FAQ_ITEMS = [
  {
    question: "Why would I take a 3 minute test instead of a 1 minute one?",
    answer:
      "A longer duration reduces how much a single lucky or unlucky stretch affects your final number. Three minutes is long enough to reveal whether your speed holds steady or drops off as your hands tire, which a 1 minute test rarely shows.",
  },
  {
    question: "Is my WPM usually lower on a 3 minute test than a 1 minute test?",
    answer:
      "Often slightly, yes. Sustaining a pace for 3 minutes is a different skill from a short burst, and fatigue or attention lapses have more time to show up. If your 3 minute score is meaningfully lower than your 1 minute score, that gap itself is useful information about your endurance, not just your peak speed.",
  },
];

export default function ThreeMinuteTypingTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="3 minute typing test"
        description="A 3 minute typing speed test with live WPM, accuracy, and a rhythm trace."
        path="/typing-test/3-minute"
        featureList={["Fixed 3 minute duration", "Live WPM and accuracy", "Rhythm trace"]}
      />
      <Breadcrumbs items={[{ label: "Typing test", href: "/typing-test" }, { label: "3 minute" }]} />
      <h1 className="sr-only">3 minute typing test</h1>

      <TypingTest defaultDuration={180} durationOptions={[180]} />

      <div className="mt-6">
        <AdSlot slotId="0000000019" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">What a 3 minute run actually tests</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Three minutes sits between a quick speed check and a full endurance test. It's long enough that a
            fast start doesn't dominate your final score the way it can in a 15 or 30 second test, and it's a
            common length for typing certifications and some job application screenings, which makes it a
            useful benchmark to practice at directly.
          </p>
          <p>
            Prefer something shorter or longer? Try the{" "}
            <a href="/typing-test/1-minute" className="text-signal underline underline-offset-2">
              1 minute test
            </a>{" "}
            or the{" "}
            <a href="/typing-test/5-minute" className="text-signal underline underline-offset-2">
              5 minute test
            </a>
            .
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/typing-test/3-minute" />
        <RelatedReading toolPath="/typing-test/3-minute" />

        <AdSlot slotId="0000000020" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
