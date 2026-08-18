import Link from "next/link";
import { POSTS } from "@/lib/blog";

/** Shows up to two blog posts that reference the given tool path, for use at the bottom of a tool page. */
export function RelatedReading({ toolPath, count = 2 }: { toolPath: string; count?: number }) {
  const posts = POSTS.filter((p) => p.relatedTools.includes(toolPath)).slice(0, count);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-reading-heading" className="mt-10">
      <h2 id="related-reading-heading" className="font-display text-lg font-bold text-fg">
        Related reading
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-sm border border-border bg-panel p-4 shadow-bezel transition-colors hover:border-signal/60"
          >
            <p className="font-body text-sm font-semibold text-fg">{post.title}</p>
            <p className="mt-1 font-body text-xs text-fg-muted">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
