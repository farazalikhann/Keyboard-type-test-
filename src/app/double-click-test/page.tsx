/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { DoubleClickTest } from "@/components/click-test/DoubleClickTest";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/ui/Faq";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "Double click test — check for mouse button chatter",
  description:
    "Click at a normal pace and see whether your mouse ever registers two clicks for one press, a common sign of switch wear called double click chatter.",
  alternates: { canonical: "/double-click-test" },
};

const FAQ_ITEMS = [
  {
    question: "What is double click chatter?",
    answer:
      "Chatter is when a mouse button's switch registers two rapid clicks from a single physical press, usually because the switch's internal contact is worn or has a failing spring. It gets more common the longer a mouse has been in heavy use, and it can cause real problems, like accidentally double clicking a file or firing twice in a game.",
  },
  {
    question: "What counts as a flagged click on this test?",
    answer:
      "Any click that lands less than 50 milliseconds after the previous one is flagged, since a genuine intentional double click from a human is almost always slower than that. A flagged click during normal, unhurried clicking is a reasonable sign of a hardware issue worth investigating.",
  },
  {
    question: "What should I do if I see flagged clicks?",
    answer:
      "A small number of flagged clicks during a long session might be noise. A consistent pattern of flagged clicks during deliberate, normal-paced clicking is a real sign of switch chatter, and replacing the mouse's switches or the mouse itself is the usual fix.",
  },
];

export default function DoubleClickTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="Double click test"
        description="Check a mouse button for double click chatter by clicking at a normal pace."
        path="/double-click-test"
        featureList={["Flags clicks under 50ms apart", "Live click interval trace", "No timer, test at your own pace"]}
      />
      <Breadcrumbs items={[{ label: "Double click test" }]} />
      <h1 className="sr-only">Double click test — check for mouse button chatter</h1>

      <DoubleClickTest />

      <div className="mt-6">
        <AdSlot slotId="0000000011" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How to test for mouse double click issues</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Click the button above at a pace that feels normal to you, the way you'd click while browsing or
            working, not deliberately fast and not deliberately slow. Do this for a few dozen clicks. Any click
            that lands unusually close to the one before it, closer than a genuine human double click would
            normally land, gets flagged.
          </p>
          <p>
            A single flagged click in a long session isn't necessarily meaningful; hands are not perfectly
            consistent. A mouse with a real chatter problem tends to show a repeated pattern of flagged clicks
            across the session, often concentrated on one specific button rather than spread evenly.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/double-click-test" />

        <AdSlot slotId="0000000012" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
