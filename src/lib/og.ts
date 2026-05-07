import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const MAX_TITLE = 140;
const MAX_EYEBROW = 60;

function clamp(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}

/**
 * Build a relative URL for the dynamic OG image endpoint.
 *
 * The path is intentionally relative — it gets resolved against
 * `metadataBase` declared in the root layout, so social crawlers
 * always receive an absolute URL.
 */
export function buildOgImageUrl({
  title,
  eyebrow,
  locale,
}: {
  title: string;
  eyebrow?: string;
  locale: string;
}) {
  const params = new URLSearchParams();
  params.set("title", clamp(title, MAX_TITLE));
  if (eyebrow) params.set("eyebrow", clamp(eyebrow, MAX_EYEBROW));
  params.set("locale", hasLocale(routing.locales, locale) ? locale : "ru");
  return `/api/og?${params.toString()}`;
}

export const OG_SIZE = { width: 1200, height: 630 } as const;
