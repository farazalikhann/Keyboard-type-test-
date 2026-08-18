import Link from "next/link";
import { TOOL_ROUTES, LEGAL_ROUTES } from "@/lib/routes";
import { POSTS } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  const typingTools = TOOL_ROUTES.filter((r) => r.group === "typing");
  const otherTools = TOOL_ROUTES.filter((r) => r.group !== "typing");
  const recentPosts = POSTS.slice(0, 5);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-fg">{SITE_NAME}</p>
            <p className="mt-2 font-body text-sm text-fg-muted">
              Client-side instruments for measuring typing speed and keyboard hardware. Nothing you type is
              sent anywhere.
            </p>
          </div>
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-fg-muted">Tools</p>
            <ul className="mt-2 space-y-1.5 font-body text-sm">
              {[...typingTools, ...otherTools].map((tool) => (
                <li key={tool.path}>
                  <Link href={tool.path} className="text-fg hover:text-signal">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-fg-muted">Guides</p>
            <ul className="mt-2 space-y-1.5 font-body text-sm">
              <li>
                <Link href="/blog" className="text-fg hover:text-signal">
                  All guides
                </Link>
              </li>
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-fg-muted hover:text-signal">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-data text-xs uppercase tracking-wide text-fg-muted">Legal</p>
            <ul className="mt-2 space-y-1.5 font-body text-sm">
              <li>
                <Link href="/about" className="text-fg hover:text-signal">
                  About
                </Link>
              </li>
              {LEGAL_ROUTES.filter((r) => r.path !== "/about").map((route) => (
                <li key={route.path}>
                  <Link href={route.path} className="text-fg hover:text-signal">
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 font-data text-[11px] text-fg-muted">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
