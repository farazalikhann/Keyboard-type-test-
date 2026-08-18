"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOL_ROUTES } from "@/lib/routes";

const GROUP_LABELS: Record<string, string> = {
  typing: "Typing",
  keyboard: "Keyboard",
  mouse: "Mouse",
};

export function ToolsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const groups: Array<"typing" | "keyboard" | "mouse"> = ["typing", "keyboard", "mouse"];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="rounded-sm px-3 py-1.5 font-data text-xs uppercase tracking-wide text-fg-muted transition-colors hover:text-fg"
      >
        Tools
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-[min(90vw,560px)] rounded-sm border border-border bg-panel p-4 shadow-bezel"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group}>
                <p className="font-data text-[10px] uppercase tracking-widest text-fg-muted">
                  {GROUP_LABELS[group]}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {TOOL_ROUTES.filter((r) => r.group === group).map((tool) => (
                    <li key={tool.path}>
                      <Link
                        href={tool.path}
                        role="menuitem"
                        className="block font-body text-sm text-fg hover:text-signal"
                      >
                        {tool.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
