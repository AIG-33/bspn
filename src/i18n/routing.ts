import { defineRouting } from "next-intl/routing";

export const locales = ["ru", "en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "ru",
  localeCookie: {
    name: "BSPN_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
});
