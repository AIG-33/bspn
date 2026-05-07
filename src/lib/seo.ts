import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { buildOgImageUrl, OG_SIZE } from "./og";

const OG_LOCALE: Record<string, string> = {
  ru: "ru_RU",
  en: "en_US",
  zh: "zh_CN",
};

function normalizePath(path: string) {
  if (!path || path === "/") return "";
  return "/" + path.replace(/^\/+|\/+$/g, "");
}

/**
 * Generate consistent SEO metadata for a single page across all locales.
 *
 * Produces:
 *  - canonical + hreflang `alternates` for every supported locale
 *  - openGraph and twitter blocks pointing at the dynamic /api/og renderer
 *  - keyword + description fields
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  eyebrow,
  keywords,
  alt,
}: {
  locale: string;
  /** Path relative to the locale segment, e.g. "about/symbolika". Pass "" for the locale root. */
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  keywords?: string[];
  alt?: string;
}): Metadata {
  const tail = normalizePath(path);
  const canonical = `/${locale}${tail}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}${tail}`])
  );
  const ogImageUrl = buildOgImageUrl({ title, eyebrow, locale });
  const ogLocale = OG_LOCALE[locale] || OG_LOCALE.ru;

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: ogLocale,
      title,
      description,
      url: canonical,
      images: [
        {
          url: ogImageUrl,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt: alt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
