/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { ClickSpeedTest } from "@/components/click-test/ClickSpeedTest";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/ui/Faq";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "Click speed test — measure clicks per second",
  description:
    "Measure how many times you can click a mouse button per second, with 1, 5, 10, 30, and 60 second modes and a live click interval trace.",
  alternates: { canonical: "/cps-test" },
};

const FAQ_ITEMS = [
  {
    question: "What is a good clicks per second score?",
    answer:
      "Most people click at 4 to 6 clicks per second using a normal single-finger click. Techniques like jitter clicking or butterfly clicking can push scores well above 10, though those techniques trade consistency and are not representative of normal mouse use.",
  },
  {
    question: "Why does my score change between the 1 second and 60 second modes?",
    answer:
      "Short bursts favor an initial fast reaction, which can produce a higher rate than you can sustain. Longer durations reveal your sustained clicking rate, which is usually lower than a short burst, since finger fatigue and consistency matter more over time.",
  },
  {
    question: "Does this test measure my mouse or my hand?",
    answer:
      "Both. A mouse with debounce or chatter issues can also affect the numbers by registering doubled or dropped clicks. If your count looks unusually high or inconsistent with your effort, check the double click test for signs of a hardware issue.",
  },
];

export default function CpsTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="Click speed test"
        description="Measure clicks per second over 1, 5, 10, 30, or 60 second runs."
        path="/cps-test"
        featureList={["1, 5, 10, 30, and 60 second modes", "Live clicks per second", "Click interval trace"]}
      />
      <Breadcrumbs items={[{ label: "Click speed test" }]} />
      <h1 className="sr-only">Click speed test — measure clicks per second</h1>

      <ClickSpeedTest />

      <div className="mt-6">
        <AdSlot slotId="0000000007" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How this click speed test works</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Clicks per second, often shortened to CPS, measures how many times you can press a mouse button in
            a fixed window of time. The timer starts on your first click, not when the page loads, so getting
            into position never costs you time on the clock. Every click is timestamped so the reported rate
            reflects your actual clicking, not an estimate.
          </p>
          <p>
            The click interval trace beneath the test shows the gap between each click as a vertical tick. Even,
            low ticks mean a consistent clicking rhythm. Taller ticks mean your clicks slowed down partway
            through, which is common as fingers fatigue during longer runs.
          </p>
          <p>
            Try more than one duration. A 1 second burst tests your fastest possible reaction, while a 30 or 60
            second run tests what you can actually sustain, which is the more useful number if you're comparing
            mice or checking for consistency issues rather than chasing a peak score.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/cps-test" />

        <AdSlot slotId="0000000008" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
