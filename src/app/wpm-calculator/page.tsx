/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { WpmCalculator } from "@/components/wpm-calculator/WpmCalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/ui/Faq";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { RelatedReading } from "@/components/blog/RelatedReading";

export const metadata: Metadata = {
  title: "WPM calculator — work out words per minute manually",
  description:
    "Calculate words per minute from a character count and elapsed time, with net and raw WPM and the formula explained.",
  alternates: { canonical: "/wpm-calculator" },
};

const FAQ_ITEMS = [
  {
    question: "What is the formula for words per minute?",
    answer:
      "Raw WPM is the total number of characters typed, divided by five, divided by the elapsed time in minutes. Five characters is used as the standard length of one word. Net WPM subtracts any uncorrected errors from that character count before dividing.",
  },
  {
    question: "Why divide characters by five instead of counting actual words?",
    answer:
      "Words vary a lot in length, which would make comparisons unfair between different pieces of text. Using a fixed five characters per word gives a consistent unit, so a result from one passage can be fairly compared with a result from a completely different one.",
  },
  {
    question: "Where would I get a character count and time from outside a typing test?",
    answer:
      "This is useful for transcription work, timed writing exercises, or any situation where you have a word processor's character count and a stopwatch time but didn't use a dedicated typing test tool to measure the run.",
  },
];

export default function WpmCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="WPM calculator"
        description="Calculate words per minute from a character count and elapsed time."
        path="/wpm-calculator"
        featureList={["Net and raw WPM", "Accuracy from an error count", "Works from any character count and duration"]}
      />
      <Breadcrumbs items={[{ label: "WPM calculator" }]} />
      <h1 className="sr-only">WPM calculator</h1>

      <WpmCalculator />

      <div className="mt-6">
        <AdSlot slotId="0000000005" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How to calculate words per minute by hand</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Words per minute is not actually a count of words. It is a count of characters, divided by five,
            divided by the time it took in minutes. Five characters is treated as the length of one standard
            word, which keeps the measurement fair regardless of whether the text you typed happened to be full
            of short words or long ones.
          </p>
          <p>
            Raw WPM uses the full character count, mistakes included. Net WPM subtracts any characters that
            were part of an uncorrected error before doing the division, which is why net WPM is usually the
            number worth paying attention to: it reflects what actually ended up correct on the screen, not
            just how fast your fingers moved.
          </p>
          <p>
            This calculator is useful when you already have a character count and a time from somewhere else,
            like a word processor's character count feature and a stopwatch, and want the WPM math done
            correctly without doing it by hand.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/wpm-calculator" />
        <RelatedReading toolPath="/wpm-calculator" />

        <AdSlot slotId="0000000006" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
