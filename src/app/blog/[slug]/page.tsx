import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS, getPost } from "@/lib/blog";
import { routeByPath } from "@/lib/routes";
import { MarkdownLite } from "@/components/blog/MarkdownLite";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { AUTHOR, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Person", name: AUTHOR },
    image: `${SITE_URL}/og-image.png`,
  };

  const faqJsonLd =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-6">
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <Breadcrumbs items={[{ label: "Guides", href: "/blog" }, { label: post.title }]} />

      <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">{post.title}</h1>
      <p className="mt-3 font-data text-xs uppercase tracking-wide text-fg-muted">
        Published{" "}
        {new Date(post.datePublished).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <MarkdownLite body={post.body} />

      <section className="mt-8 rounded-sm border border-border bg-panel p-5">
        <h2 className="font-display text-lg font-bold text-fg">Takeaways</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 font-body text-sm text-fg-muted">
          {post.takeaways.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      {post.faq.length > 0 && (
        <section aria-labelledby="post-faq-heading" className="mt-10">
          <h2 id="post-faq-heading" className="font-display text-xl font-bold text-fg">
            Frequently asked questions
          </h2>
          <dl className="mt-4 divide-y divide-border border-t border-border">
            {post.faq.map((f) => (
              <div key={f.question} className="py-4">
                <dt className="font-body text-sm font-semibold text-fg">{f.question}</dt>
                <dd className="mt-1.5 font-body text-sm leading-relaxed text-fg-muted">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {post.relatedTools.length > 0 && (
        <section aria-labelledby="post-related-tools-heading" className="mt-10">
          <h2 id="post-related-tools-heading" className="font-display text-lg font-bold text-fg">
            Related tools
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {post.relatedTools.map((path) => {
              const tool = routeByPath(path);
              if (!tool) return null;
              return (
                <Link
                  key={path}
                  href={path}
                  className="rounded-sm border border-border bg-panel p-4 shadow-bezel transition-colors hover:border-signal/60"
                >
                  <p className="font-body text-sm font-semibold text-fg">{tool.title}</p>
                  <p className="mt-1 font-body text-xs text-fg-muted">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
