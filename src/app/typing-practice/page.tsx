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
  title: "Typing practice — words, punctuation, numbers, and code",
  description:
    "Practice typing with plain word lists, punctuation heavy text, numbers, or code-like symbols and tokens, whichever matches what you actually type day to day.",
  alternates: { canonical: "/typing-practice" },
};

const FAQ_ITEMS = [
  {
    question: "How is typing practice different from the main typing test?",
    answer:
      "The main typing test is meant for a clean speed and accuracy reading, mostly with plain word lists or quotes. Practice mode adds punctuation, numbers, and code-like content specifically so you can drill the characters and symbols that plain word lists barely touch, like shifted punctuation or digit rows.",
  },
  {
    question: "Why is there a code mode if this isn't a programming typing test?",
    answer:
      "Code involves a very different mix of characters than prose: brackets, semicolons, operators, and short identifiers rather than full words and sentences. If you type code daily, practicing on prose alone under-trains the specific keys code relies on most.",
  },
  {
    question: "Should I practice every mode or just the one closest to my work?",
    answer:
      "Practicing the mode closest to what you actually type day to day gives the most direct benefit. That said, punctuation and numbers practice benefits almost everyone, since most typing tests and casual typing under-represent both compared to how often they actually show up in real writing.",
  },
];

export default function TypingPracticePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="Typing practice"
        description="Practice typing with word lists, punctuation, numbers, or code-like content."
        path="/typing-practice"
        featureList={["Words, punctuation, numbers, and code modes", "15, 30, and 60 second durations", "Live WPM and accuracy"]}
      />
      <Breadcrumbs items={[{ label: "Typing practice" }]} />
      <h1 className="sr-only">Typing practice</h1>

      <TypingTest modeOptions={["words", "punctuation", "numbers", "code"]} />

      <div className="mt-6">
        <AdSlot slotId="0000000023" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">What each practice mode targets</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            Words mode uses the same common word list as the main typing test, useful as a baseline or a warm
            up. Punctuation mode weaves in commas, periods, quotation marks, parentheses, and occasional
            capitalized words, which are common in real writing but rare in plain word lists, so they often
            expose weak spots that a words-only test hides.
          </p>
          <p>
            Numbers mode generates digit sequences of varying length, along with decimals, percentages, and
            negative numbers, which is useful for anyone who regularly types data, prices, or measurements and
            wants to build comfort with the number row specifically.
          </p>
          <p>
            Code mode samples common programming keywords, symbols, and short fragments like brackets,
            semicolons, and operators. It won't replace practicing in your actual editor, but it isolates the
            character mix that trips up a lot of typists who are otherwise fast at prose: reaching for shift
            heavy symbols and switching between letters and punctuation rapidly.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/typing-practice" />
        <RelatedReading toolPath="/typing-practice" />

        <AdSlot slotId="0000000024" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
