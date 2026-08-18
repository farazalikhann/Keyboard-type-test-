import type { Metadata } from "next";
import { TypingTest } from "@/components/typing-test/TypingTest";
import { Faq } from "@/components/ui/Faq";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ToolSchema } from "@/components/seo/ToolSchema";
import { AdSlot } from "@/components/ads/AdSlot";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { RelatedReading } from "@/components/blog/RelatedReading";

export const metadata: Metadata = {
  title: "Typing speed test — measure your WPM",
  description:
    "Test your typing speed in words per minute. Choose 15, 30, or 60 second runs, common words or full quotes, and read your typing rhythm on a live trace.",
  alternates: { canonical: "/typing-test" },
};

const FAQ_ITEMS = [
  {
    question: "What is a good typing speed?",
    answer:
      "Average typing speed is around 40 words per minute. 50 to 65 WPM is considered above average for most office and writing work. Professional typists, data entry specialists, and competitive typists often reach 80 to 120 WPM. Above 120 WPM is rare and usually comes from years of daily practice.",
  },
  {
    question: "What is the difference between net WPM and raw WPM?",
    answer:
      "Raw WPM counts every character you typed, including mistakes, divided by five and by the elapsed minutes. Net WPM subtracts your uncorrected errors from that count, so it reflects how many correct words actually reached the screen. Net WPM is the number most typing tests report as your real speed.",
  },
  {
    question: "Why does my WPM change between tests?",
    answer:
      "Typing speed varies with the text itself, how tired your hands are, and how much attention you're paying to accuracy versus raw speed. Short bursts of common words tend to score higher than long test durations with punctuation and rare letter combinations, because your fingers spend less time on unfamiliar key sequences.",
  },
  {
    question: "Does this typing test track or store what I type?",
    answer:
      "No. The test runs entirely in your browser. Nothing you type is sent to a server, logged, or stored anywhere outside your device.",
  },
];

export default function TypingTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ToolSchema
        name="Typing speed test"
        description="Measure typing speed in words per minute with live accuracy tracking and a rhythm trace."
        path="/typing-test"
        featureList={[
          "15, 30, and 60 second test durations",
          "Word list and quote content modes",
          "Live WPM and accuracy",
          "Net and raw WPM comparison",
          "Live rhythm trace of keystroke timing",
        ]}
      />
      <Breadcrumbs items={[{ label: "Typing test" }]} />
      <h1 className="sr-only">Typing speed test — measure your words per minute</h1>

      <TypingTest />

      <div className="mt-6">
        <AdSlot slotId="0000000001" height={100} label="below results" />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How this typing test measures speed</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            This tool measures typing speed the way most professional typing tests do: in words per minute,
            using a five-character word as the standard unit. The timer starts the instant you press your first
            key, not when the page loads, so idle time before you begin never counts against you. Every
            keystroke is timestamped with <code className="font-data text-xs text-fg">performance.now()</code>,
            a high-resolution clock built into the browser, which keeps the measurement accurate even if the
            tab is busy doing other work.
          </p>
          <p>
            Two numbers appear on your results screen. Net WPM is your real typing speed: it takes every
            character you typed, divides by five, and subtracts any word you left with an uncorrected mistake.
            Raw WPM ignores accuracy entirely and just measures how fast your fingers moved. Comparing the two
            tells you something useful. A large gap between raw and net WPM usually means you are typing fast
            but careless; a small gap means your speed is already close to your effective output.
          </p>
          <p>
            You can correct a mistake by backspacing, but only within the word you are currently typing. Once
            you move on to the next word, that word is scored as it stands. This mirrors how most fast typists
            actually work: correcting a typo mid-word is normal, but going back several words to fix something
            breaks your rhythm and rarely reflects how you would type in practice, whether that is chat, code,
            or a document.
          </p>
          <p>
            The rhythm trace beneath the test is not decoration. Each tick is one keystroke, and its height
            shows how long you paused before pressing it. Even, low ticks mean consistent typing. Tall spikes
            mean hesitation, usually at punctuation, unfamiliar words, or after a mistake. Reading your own
            trace after a test is often more useful than the WPM number alone, because it shows you exactly
            where your rhythm breaks down.
          </p>
          <p>
            Typing speed improves with deliberate practice more than volume. Typing the same test repeatedly
            without reviewing your mistakes trains bad habits as much as good ones. Watch your accuracy first;
            speed that comes at the cost of accuracy is not free, since every uncorrected error subtracts
            directly from your net WPM.
          </p>
        </div>

        <Faq items={FAQ_ITEMS} />

        <RelatedTools currentPath="/typing-test" />
        <RelatedReading toolPath="/typing-test" />

        <AdSlot slotId="0000000002" height={100} label="content" className="mt-10" />
      </article>
    </div>
  );
}
