import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Typing and keyboard guides",
  description:
    "Practical guides on typing speed, keyboard hardware, and diagnosing common problems, written for people who actually want to use the answer.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <h1 className="mt-2 font-display text-3xl font-bold text-fg sm:text-4xl">Typing and keyboard guides</h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-fg-muted">
        Practical guides on typing speed and keyboard hardware. No filler, no padded lists, written to actually
        answer the question in the title.
      </p>

      <div className="mt-8 space-y-1 border-t border-border">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border-b border-border py-5 transition-colors hover:bg-panel"
          >
            <p className="font-data text-[11px] uppercase tracking-wide text-fg-muted">
              {new Date(post.datePublished).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-fg">{post.title}</p>
            <p className="mt-1 font-body text-sm text-fg-muted">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
