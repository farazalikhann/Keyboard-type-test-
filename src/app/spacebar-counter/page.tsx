import type { Metadata } from "next";
import { SpacebarCounter } from "@/components/click-test/SpacebarCounter";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/ui/Faq";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "Spacebar counter — count spacebar presses against a timer",
  description: "Count how many times you can press the spacebar within 5, 10, 30, or 60 seconds.",
  alternates: { canonical: "/spacebar-counter" },
};

const FAQ_ITEMS = [
  {
    question: "What is a spacebar counter used for?",
    answer:
      "It's mostly used casually, to test reflexes or settle a friendly competition over who can press a key the most times in a fixed window. It also gives a rough sense of how your spacebar responds to rapid repeated presses, which can surface an unusually slow or unresponsive space key.",
  },
  {
    question: "Why does the count stop increasing sometimes even though I'm still pressing?",
    answer:
      "Holding the key down without releasing it only counts as one press, since the browser reports a held key as a single repeating event rather than separate new presses. Release the key fully between presses for each one to count.",
  },
];

export default function SpacebarCounterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="Spacebar counter"
        description="Count spacebar presses against a timer, from 5 to 60 seconds."
        path="/spacebar-counter"
        featureList={["5, 10, 30, and 60 second timers", "Live press count", "Press interval trace"]}
      />
      <Breadcrumbs items={[{ label: "Spacebar counter" }]} />
      <h1 className="sr-only">Spacebar counter</h1>

      <SpacebarCounter />

      <div className="mt-6">
        <AdSlot slotId="0000000009" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How the spacebar counter works</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Pick a duration, then start pressing space. The timer starts on your first press, and each
            complete press and release counts once, even if you press very quickly. The trace beneath the
            counter shows the interval between each press, which is a quick way to see how consistent your
            pressing rhythm actually was rather than just the final total.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/spacebar-counter" />

        <AdSlot slotId="0000000010" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
