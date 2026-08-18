import Link from "next/link";
import { relatedTools } from "@/lib/routes";

export function RelatedTools({ currentPath }: { currentPath: string }) {
  const items = relatedTools(currentPath, 3);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-tools-heading" className="mt-10">
      <h2 id="related-tools-heading" className="font-display text-lg font-bold text-fg">
        Related tools
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {items.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="rounded-sm border border-border bg-panel p-4 shadow-bezel transition-colors hover:border-signal/60"
          >
            <p className="font-body text-sm font-semibold text-fg">{tool.title}</p>
            <p className="mt-1 font-body text-xs text-fg-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
