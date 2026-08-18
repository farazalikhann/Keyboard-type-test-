/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { RolloverTest } from "@/components/keyboard-test/RolloverTest";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/ui/Faq";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { RelatedReading } from "@/components/blog/RelatedReading";

export const metadata: Metadata = {
  title: "Key rollover test — how many keys register at once",
  description:
    "Find out how many keys your keyboard can register at the same time, with a live count and the maximum simultaneous keys reached.",
  alternates: { canonical: "/key-rollover-test" },
};

const FAQ_ITEMS = [
  {
    question: "What is a good rollover result?",
    answer:
      "Six simultaneous keys, often marketed as 6KRO, is enough for the large majority of typing and gaming needs. If your keyboard reaches at least 6 in this test across different key combinations, it will handle almost anything you throw at it outside specialized use cases like certain fighting games.",
  },
  {
    question: "Why does my rollover count depend on which keys I press?",
    answer:
      "Rollover limits usually come from how keys are wired internally in a grid, which means certain combinations hit the limit sooner than others depending on their physical position. Testing a variety of combinations, not just one, gives a more complete picture than a single attempt.",
  },
];

export default function KeyRolloverTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="Key rollover test"
        description="Measure how many keys a keyboard can register simultaneously, with a live count and session maximum."
        path="/key-rollover-test"
        featureList={["Live simultaneous key count", "Session maximum tracking", "Named list of currently held keys"]}
      />
      <Breadcrumbs items={[{ label: "Key rollover test" }]} />
      <h1 className="sr-only">Key rollover test — how many keys register at once</h1>

      <RolloverTest />

      <div className="mt-6">
        <AdSlot slotId="0000000013" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How to test keyboard rollover</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Start the test, then hold down groups of keys at the same time, trying different combinations
            across the keyboard rather than just one cluster. Watch the "keys held now" count as you add
            fingers, and note where it stops climbing even though you're pressing more keys. That point is
            your keyboard's practical rollover limit for that particular combination.
          </p>
          <p>
            The "max reached" number tracks the highest simultaneous count you've hit across your whole
            session, so you don't need to hold everything at once in a single attempt. Try a few different
            combinations, including ones spread across the keyboard and ones clustered together, since rollover
            limits are often tied to specific physical key groupings rather than being a single flat number for
            the whole board.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/key-rollover-test" />
        <RelatedReading toolPath="/key-rollover-test" />

        <AdSlot slotId="0000000014" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
