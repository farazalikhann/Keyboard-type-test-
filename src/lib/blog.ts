export interface FaqPair {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  relatedTools: string[]; // paths from TOOL_ROUTES
  /** Minimal markdown: blank-line-separated paragraphs, "## " / "### " headings, "- " bullet lines. */
  body: string;
  takeaways: string[];
  faq: FaqPair[];
}

import { post as goodTypingSpeed } from "@/content/blog/good-typing-speed";
import { post as typeFaster30Days } from "@/content/blog/type-faster-30-day-plan";
import { post as touchTypingVsHuntPeck } from "@/content/blog/touch-typing-vs-hunt-and-peck";
import { post as keysStopWorking } from "@/content/blog/why-keys-stop-working";
import { post as keyboardGhosting } from "@/content/blog/keyboard-ghosting-and-rollover";
import { post as mechanicalVsMembrane } from "@/content/blog/mechanical-vs-membrane-keyboards";
import { post as typingAccuracy } from "@/content/blog/understanding-typing-accuracy";
import { post as keyboardLayouts } from "@/content/blog/keyboard-layouts-compared";
import { post as typingTestsForJobs } from "@/content/blog/typing-test-scores-for-job-applications";
import { post as cleanStickyKeyboard } from "@/content/blog/clean-sticky-keyboard";

export const POSTS: Post[] = [
  goodTypingSpeed,
  typeFaster30Days,
  touchTypingVsHuntPeck,
  keysStopWorking,
  keyboardGhosting,
  mechanicalVsMembrane,
  typingAccuracy,
  keyboardLayouts,
  typingTestsForJobs,
  cleanStickyKeyboard,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function wordCount(post: Post): number {
  const text = [post.body, post.takeaways.join(" "), post.faq.map((f) => f.question + " " + f.answer).join(" ")].join(" ");
  return text.trim().split(/\s+/).length;
}
