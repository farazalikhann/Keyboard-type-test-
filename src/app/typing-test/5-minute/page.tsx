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
  title: "5 minute typing test",
  description: "A 5 minute endurance typing test closer to real sustained typing sessions than a short sprint.",
  alternates: { canonical: "/typing-test/5-minute" },
};

const FAQ_ITEMS = [
  {
    question: "Who should use a 5 minute typing test?",
    answer:
      "Anyone preparing for a job typing assessment that uses a similar duration, or anyone who wants a realistic sense of their sustained typing speed rather than a short burst. Many transcription and data entry screening tests run 3 to 5 minutes, so practicing at this length builds the specific stamina those tests measure.",
  },
  {
    question: "Why might my accuracy drop during a longer test?",
    answer:
      "Sustained concentration is harder to maintain than a short burst of focus. A slight dip in accuracy over 5 minutes is normal and points to where fatigue affects your typing, which a 15 or 30 second test simply can't reveal.",
  },
];

export default function FiveMinuteTypingTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="5 minute typing test"
        description="A 5 minute typing speed test with live WPM, accuracy, and a rhythm trace."
        path="/typing-test/5-minute"
        featureList={["Fixed 5 minute duration", "Live WPM and accuracy", "Rhythm trace"]}
      />
      <Breadcrumbs items={[{ label: "Typing test", href: "/typing-test" }, { label: "5 minute" }]} />
      <h1 className="sr-only">5 minute typing test</h1>

      <TypingTest defaultDuration={300} durationOptions={[300]} />

      <div className="mt-6">
        <AdSlot slotId="0000000021" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">Why a 5 minute test is closer to real typing</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Most real typing, whether it's writing an email, transcribing audio, or entering data, happens over
            minutes, not seconds. A 5 minute test is long enough to show whether your speed and accuracy hold
            up over something closer to that timescale, rather than measuring only your fastest possible burst.
          </p>
          <p>
            This length is also common for employer typing assessments, particularly for data entry and
            transcription roles, so practicing at 5 minutes specifically builds familiarity with the format you
            might actually be tested on.
          </p>
          <p>
            Want a shorter run instead? Try the{" "}
            <a href="/typing-test/1-minute" className="text-signal underline underline-offset-2">
              1 minute test
            </a>{" "}
            or the{" "}
            <a href="/typing-test/3-minute" className="text-signal underline underline-offset-2">
              3 minute test
            </a>
            .
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/typing-test/5-minute" />
        <RelatedReading toolPath="/typing-test/5-minute" />

        <AdSlot slotId="0000000022" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
