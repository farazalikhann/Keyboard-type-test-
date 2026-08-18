/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { GhostingTest } from "@/components/keyboard-test/GhostingTest";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/ui/Faq";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { RelatedReading } from "@/components/blog/RelatedReading";

export const metadata: Metadata = {
  title: "Ghosting test — check gaming key combinations",
  description:
    "Test specific key combinations, like WASD plus space, for ghosting and blocked keys, with a live confirmation for each combo.",
  alternates: { canonical: "/ghosting-test" },
};

const FAQ_ITEMS = [
  {
    question: "What combinations does this test check?",
    answer:
      "Four common gaming combinations: WASD plus space, QWER plus space, movement with shift and ctrl held, and arrow keys with shift. These cover the most common real-world cases where ghosting causes a problem during actual gameplay.",
  },
  {
    question: "What does it mean if a combination never gets confirmed?",
    answer:
      "If you hold every key in a combination fully and it still doesn't confirm, your keyboard is likely dropping or misregistering one of those keys when pressed together, which is what ghosting looks like in practice. Try the same keys in a different combination to see if the problem is specific to that key or that particular grouping.",
  },
];

export default function GhostingTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="Ghosting test"
        description="Test specific key combinations for ghosting and blocked keys."
        path="/ghosting-test"
        featureList={["Four common gaming key combinations", "Live per-key held status", "Session confirmation tracking"]}
      />
      <Breadcrumbs items={[{ label: "Ghosting test" }]} />
      <h1 className="sr-only">Ghosting test — check gaming key combinations</h1>

      <GhostingTest />

      <div className="mt-6">
        <AdSlot slotId="0000000015" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How to test for keyboard ghosting</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Ghosting happens when specific combinations of keys, based on their physical wiring inside the
            keyboard, cause one of them to be dropped or a different key to register instead. It only shows up
            with particular combinations, which is why testing a single key on its own never reveals it.
          </p>
          <p>
            Start the test, then hold each full combination shown above at the same time, ideally for at least
            a second. If every key in that group lights up together, it's marked confirmed. If you consistently
            can't get all the keys in a specific combination to hold at once, no matter how you try, that
            combination is affected by ghosting on your keyboard.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/ghosting-test" />
        <RelatedReading toolPath="/ghosting-test" />

        <AdSlot slotId="0000000016" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
