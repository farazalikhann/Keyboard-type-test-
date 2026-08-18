import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOL_ROUTES, LEGAL_ROUTES } from "@/lib/routes";
import { POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [{ url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 }];

  const tools: MetadataRoute.Sitemap = TOOL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.path === "/typing-test" || route.path === "/keyboard-test" ? 0.9 : 0.7,
  }));

  const legal: MetadataRoute.Sitemap = LEGAL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const posts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...home, ...tools, ...blogIndex, ...posts, ...legal];
}
