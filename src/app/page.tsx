import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="panel-grid absolute inset-x-0 top-0 -z-10 h-64" aria-hidden="true" />
      <p className="font-data text-xs uppercase tracking-[0.2em] text-signal">Instrument panel</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold leading-tight text-fg sm:text-5xl">
        Measure how you type and test what you type on.
      </h1>
      <p className="mt-4 max-w-xl font-body text-base text-fg-muted">
        Two client-side instruments: a typing speed test that reads your rhythm, and a keyboard tester that
        checks every physical key. No accounts, no server, nothing you type leaves your browser.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <ToolCard
          href="/typing-test"
          title="Typing test"
          description="15, 30, or 60 second runs. Live WPM, accuracy, and a rhythm trace of every keystroke."
        />
        <ToolCard
          href="/keyboard-test"
          title="Keyboard test"
          description="Press every key and see which ones register. Generate a diagnostic report for dead keys."
        />
      </div>
    </div>
  );
}

function ToolCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-sm border border-border bg-panel p-6 shadow-bezel transition-colors hover:border-signal/60"
    >
      <p className="font-display text-xl font-bold text-fg group-hover:text-signal">{title}</p>
      <p className="mt-2 font-body text-sm text-fg-muted">{description}</p>
      <p className="mt-4 font-data text-xs uppercase tracking-wide text-signal">Start →</p>
    </Link>
  );
}
