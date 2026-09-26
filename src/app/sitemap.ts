import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { verticalPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/realisations", priority: 0.7 },
    { path: "/a-propos", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...verticalPages.map((v) => ({
      url: `${site.url}/solutions/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
