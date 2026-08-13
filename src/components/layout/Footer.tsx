import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-fg">
              Keyboard Toolkit
            </p>
            <p className="mt-2 font-body text-sm text-fg-muted">
              Client-side instruments for measuring typing speed and keyboard hardware. Nothing you type is sent anywhere.
            </p>
          </div>
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-fg-muted">Tools</p>
            <ul className="mt-2 space-y-1.5 font-body text-sm">
              <li><Link href="/typing-test" className="text-fg hover:text-signal">Typing test</Link></li>
              <li><Link href="/keyboard-test" className="text-fg hover:text-signal">Keyboard test</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-fg-muted">About</p>
            <p className="mt-2 font-body text-sm text-fg-muted">
              No accounts, no server, no tracking of what you type. Results and settings stay in your browser.
            </p>
          </div>
        </div>
        <p className="mt-8 font-data text-[11px] text-fg-muted">
          © {new Date().getFullYear()} Keyboard Toolkit
        </p>
      </div>
    </footer>
  );
}
