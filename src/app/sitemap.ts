import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bspn.by";
  const locales = ["ru", "en", "zh"];
  const now = new Date();

  const publicRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about/mission", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about/history", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/about/leadership", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about/achievements", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/about/associations", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/membership", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/membership/benefits", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/membership/types", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/membership/join", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/court-practice", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/advocacy", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/experts", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/consumer-protection", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/data-protection", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/international", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/legislation", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/directors-club", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/arbitration", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contacts", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/legal/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/legal/terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );
}
