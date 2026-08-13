import type { Metadata } from "next";
import { KeyboardTester } from "@/components/keyboard-test/KeyboardTester";
import { AdSlot } from "@/components/layout/AdSlot";
import { Faq } from "@/components/ui/Faq";

export const metadata: Metadata = {
  title: "Keyboard test — check every key and find dead keys",
  description:
    "Test every key on your keyboard, see which ones never register, and generate a diagnostic report for a warranty claim or return request. Works with ANSI, ISO, and TKL layouts.",
  alternates: { canonical: "/keyboard-test" },
};

const FAQ_ITEMS = [
  {
    question: "How do I test if a keyboard key is broken?",
    answer:
      "Start this test, then press every key on your keyboard one at a time, including modifiers and function keys. Each key highlights the moment it registers and stays marked once verified. Keys you never manage to trigger a response from are the ones worth investigating, whether that means cleaning underneath the keycap or filing a warranty claim.",
  },
  {
    question: "Why does this test use event.code instead of event.key?",
    answer:
      "event.code identifies the physical position of a key on the keyboard, regardless of what language or layout is active. event.key reports the character that position produces, which changes if you switch to a different keyboard layout. Testing physical position is what actually tells you whether the key itself works.",
  },
  {
    question: "What is key rollover and ghosting?",
    answer:
      "Rollover is how many keys a keyboard can register at the same time when pressed together. Ghosting happens when pressing a combination of keys causes an unrelated key to register, or a pressed key to be dropped, because of how the internal circuit is wired. Cheaper keyboards with limited rollover are more prone to it, which matters most for gaming and fast typing.",
  },
  {
    question: "Why did the page capture my Tab and function keys?",
    answer:
      "Tab, the function keys, and common browser shortcuts normally do something else in the browser, like moving focus or refreshing the page. While the test is running, this page intercepts them so you can confirm they register like any other key. Use the exit test button to hand control back to the browser at any time.",
  },
  {
    question: "Can this test detect a stuck key?",
    answer:
      "It shows you when a key is currently held down and when it was last pressed, which helps confirm a key that fires repeatedly or won't release. It cannot inspect hardware directly, so a key that appears stuck in the operating system outside the browser should be checked with your system's keyboard settings too.",
  },
];

export default function KeyboardTestPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="sr-only">Keyboard test — check every key and find dead keys</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <KeyboardTester />
        <aside className="hidden lg:block">
          <AdSlot label="sidebar" height={600} />
        </aside>
      </div>

      <div className="mt-6">
        <AdSlot label="below results" height={100} />
      </div>

      <article className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-fg">How to test a keyboard for dead or faulty keys</h2>
        <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-fg-muted">
          <p>
            A keyboard can fail in a few different ways. A key can stop registering entirely, usually from
            debris under the switch or a worn contact. A key can double-fire, sending two keystrokes for one
            press, which points to a switch with a failing spring or a dirty contact bouncing. A key can also
            get stuck, continuing to send input after you release it, which is usually a hardware fault rather
            than something software can fix. This tool is built to catch the first and most common case: a key
            that simply never registers.
          </p>
          <p>
            Start the test, then work through the keyboard methodically rather than randomly. Go row by row:
            function keys, number row, the letter rows, modifiers, and the arrow or numpad cluster if your
            keyboard has one. Every key you press highlights immediately and stays marked once verified, so you
            can see at a glance which ones you have already covered and which ones you have not tried yet.
          </p>
          <p>
            This tester reads the physical position of each key rather than the character it produces, which
            matters if your operating system is set to a non-English layout. A key tested this way reports the
            same result no matter what layout is active, because the test is checking the hardware position,
            not the character mapping on top of it.
          </p>
          <p>
            If you find keys that never respond, generate the diagnostic summary. It lists exactly which keys
            did not register, along with the layout you tested and the date, in a format you can download as an
            image and attach to a warranty claim or a return request. Sellers and manufacturers generally want
            specifics, not &ldquo;my keyboard is broken,&rdquo; and a dated report naming the exact keys is far more useful
            than a description.
          </p>
          <p>
            Keep in mind that a browser-based test can only report what reaches the browser. If your operating
            system remaps a key before the browser ever sees it, this test will reflect the remapped result. For
            most standard keyboards straight out of the box, that is not a concern.
          </p>
        </div>

        <AdSlot label="content" height={100} className="mt-8" />

        <Faq items={FAQ_ITEMS} />
      </article>
    </div>
  );
}
