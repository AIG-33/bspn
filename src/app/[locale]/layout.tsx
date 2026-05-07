import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import { buildOgImageUrl, OG_SIZE } from "@/lib/og";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bspn.by";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "meta" });

  const ogTitle = (() => {
    try {
      return t("ogTitle");
    } catch {
      return t("title");
    }
  })();
  const ogDescription = (() => {
    try {
      return t("ogDescription");
    } catch {
      return t("description");
    }
  })();

  // Pages that don't define their own OG images inherit this fallback.
  // The locale homepage itself has a colocated `opengraph-image.tsx`
  // that wins over the URL below for `/[locale]` only.
  const fallbackOg = buildOgImageUrl({ title: ogTitle, locale });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    authors: [{ name: t("siteName") }],
    publisher: t("siteName"),
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : locale === "en" ? "en_US" : "ru_RU",
      siteName: t("siteName"),
      title: ogTitle,
      description: ogDescription,
      url: `${SITE_URL}/${locale}`,
      images: [
        {
          url: fallbackOg,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [fallbackOg],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`])
      ),
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;

  const tSite = await getTranslations({ locale, namespace: "site" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: tSite("name"),
    legalName: tSite("fullName"),
    alternateName: tSite("shortName"),
    description: tMeta("description"),
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/bspn-logo-512.png`,
    image: `${SITE_URL}/images/bspn-logo-512.png`,
    foundingDate: "1990",
    email: tSite("email"),
    telephone: tSite("phone"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fabrichnaya 22",
      addressLocality: "Minsk",
      addressCountry: "BY",
      postalCode: "220033",
    },
    sameAs: [
      "https://bspn.by/",
    ],
    areaServed: {
      "@type": "Country",
      name: "Belarus",
    },
    knowsAbout: [
      "Business advocacy in Belarus",
      "Government relations Belarus",
      "Foreign market entry Belarus",
      "Investments in Belarus",
      "Belarus tax law",
      "EAEU market access",
      "Public-Private Partnership Belarus",
      "Arbitration court Belarus",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: tMeta("siteName"),
    description: tMeta("description"),
    inLanguage: locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "ru-RU",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="flex min-h-dvh flex-col" lang={locale}>
        {children}
      </div>
      <Toaster position="bottom-right" />
    </NextIntlClientProvider>
  );
}
