import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  Scale,
  LineChart,
  Globe2,
  Users2,
  CalendarDays,
  Megaphone,
  Mail,
  Phone,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "specialists" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "specialists",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("about"),
  });
}

const AREAS = [
  { key: "areaLegal", icon: Scale },
  { key: "areaEcon", icon: LineChart },
  { key: "areaIntl", icon: Globe2 },
  { key: "areaAssoc", icon: Users2 },
  { key: "areaEvents", icon: CalendarDays },
  { key: "areaComms", icon: Megaphone },
];

export default function SpecialistsPage() {
  const t = useTranslations("specialists");
  const tSite = useTranslations("site");

  return (
    <>
      <PageHeader title={t("pageTitle")} description={t("pageDescription")} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(({ key, icon: Icon }) => (
            <GlassCard key={key} hoverable className="p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}Desc`)}
              </p>
            </GlassCard>
          ))}
        </div>

        <section className="mt-16 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-10 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <div className="relative grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                {t("ctaDesc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={`mailto:${tSite("email")}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-cta text-cta-foreground hover:bg-cta/90"
                )}
              >
                <Mail className="h-4 w-4" />
                {tSite("email")}
              </a>
              <a
                href={`tel:${tSite("phone")}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <Phone className="h-4 w-4" />
                {tSite("phone")}
              </a>
            </div>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/contacts"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full"
            )}
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
