import type { MetadataRoute } from "next";

type CF = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const LOCALES = ["ru", "en", "zh"] as const;

const ROUTES: { path: string; priority: number; changeFrequency: CF }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },

  // About
  { path: "/about", priority: 0.85, changeFrequency: "monthly" },
  { path: "/about/mission", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/history", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about/leadership", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/achievements", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/associations", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/kunyavsky", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about/symbolika", priority: 0.6, changeFrequency: "yearly" },

  // Membership
  { path: "/membership", priority: 0.95, changeFrequency: "monthly" },
  { path: "/membership/benefits", priority: 0.9, changeFrequency: "monthly" },
  { path: "/membership/types", priority: 0.85, changeFrequency: "monthly" },
  { path: "/membership/join", priority: 0.95, changeFrequency: "monthly" },

  // SEO landings (HIGH PRIORITY)
  { path: "/foreign-business", priority: 0.95, changeFrequency: "weekly" },
  { path: "/investments", priority: 0.95, changeFrequency: "weekly" },

  // For business
  { path: "/business", priority: 0.85, changeFrequency: "weekly" },
  { path: "/business/legislation-review", priority: 0.85, changeFrequency: "weekly" },
  { path: "/business/economy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/business/social-labor", priority: 0.75, changeFrequency: "monthly" },
  { path: "/business/research", priority: 0.75, changeFrequency: "monthly" },
  { path: "/business/press", priority: 0.75, changeFrequency: "weekly" },

  // Existing protect/services
  { path: "/faq", priority: 0.8, changeFrequency: "weekly" },
  { path: "/court-practice", priority: 0.7, changeFrequency: "weekly" },
  { path: "/advocacy", priority: 0.85, changeFrequency: "monthly" },
  { path: "/experts", priority: 0.7, changeFrequency: "monthly" },
  { path: "/consumer-protection", priority: 0.7, changeFrequency: "monthly" },
  { path: "/data-protection", priority: 0.75, changeFrequency: "monthly" },
  { path: "/international", priority: 0.85, changeFrequency: "monthly" },
  { path: "/legislation", priority: 0.8, changeFrequency: "weekly" },
  { path: "/arbitration", priority: 0.75, changeFrequency: "monthly" },
  { path: "/directors-club", priority: 0.7, changeFrequency: "monthly" },

  // Org
  { path: "/partners", priority: 0.7, changeFrequency: "monthly" },
  { path: "/awards", priority: 0.6, changeFrequency: "yearly" },
  { path: "/specialists", priority: 0.7, changeFrequency: "monthly" },
  { path: "/media", priority: 0.7, changeFrequency: "weekly" },
  { path: "/councils", priority: 0.85, changeFrequency: "monthly" },
  { path: "/regulations", priority: 0.6, changeFrequency: "yearly" },

  // Content streams
  { path: "/news", priority: 0.85, changeFrequency: "daily" },
  { path: "/events", priority: 0.85, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contacts", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bspn.by";
  const now = new Date();

  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${baseUrl}/${l}${route.path}`])
        ),
      },
    }))
  );
}
