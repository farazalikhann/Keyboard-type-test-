"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";

const TOOLS = [
  { href: "/typing-test", label: "Typing test" },
  { href: "/keyboard-test", label: "Keyboard test" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-base/95 backdrop-blur-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-fg">
          <LogoMark />
          <span>Keyboard Toolkit</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Tools">
          {TOOLS.map((tool) => {
            const active = pathname === tool.href;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`rounded-sm px-3 py-1.5 font-data text-xs uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-panel-raised text-signal"
                    : "text-fg-muted hover:text-fg"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {tool.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 sm:hidden" aria-label="Tools">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-sm px-2 py-1.5 font-data text-[11px] uppercase tracking-wide text-fg-muted hover:text-fg"
              >
                {tool.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-panel text-fg-muted shadow-bezel hover:text-signal"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="4" y="7" width="2" height="2" fill="currentColor" />
      <rect x="7.5" y="7" width="2" height="2" fill="currentColor" />
      <rect x="11" y="7" width="2" height="2" fill="currentColor" />
      <rect x="14.5" y="7" width="1.5" height="2" fill="currentColor" />
      <rect x="4" y="11" width="12" height="2" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.3" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M7.5 0.8v1.6M7.5 12.6v1.6M14.2 7.5h-1.6M2.9 7.5H1.3M12.4 2.6l-1.1 1.1M3.7 11.3l-1.1 1.1M12.4 12.4l-1.1-1.1M3.7 3.7L2.6 2.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M13 8.9A5.6 5.6 0 1 1 6.1 2 4.4 4.4 0 0 0 13 8.9Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
