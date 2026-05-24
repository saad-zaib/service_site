import type { MetadataRoute } from "next";
import { services } from "./lib/services";
import { blogPosts } from "./lib/blog-posts";
import { insights } from "./lib/insights";

const BASE = "https://ctfwithai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/get-a-quote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/the-bridge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/industry-insights`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.isoDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((i) => ({
    url: `${BASE}/industry-insights/${i.slug}`,
    lastModified: new Date(i.isoDate),
    changeFrequency: "yearly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...insightRoutes];
}
