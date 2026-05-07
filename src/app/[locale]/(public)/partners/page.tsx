import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  Banknote,
  Briefcase,
  Newspaper,
  Building2,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/partners`,
      languages: {
        ru: "/ru/partners",
        en: "/en/partners",
        zh: "/zh/partners",
      },
    },
    openGraph: { title: t("pageTitle"), description: t("pageDescription") },
  };
}

const GROUPS = [
  {
    key: "groupFinance",
    icon: Banknote,
    members: ["p1", "p2"],
  },
  {
    key: "groupConsulting",
    icon: Briefcase,
    members: ["p3", "p4"],
  },
  {
    key: "groupMedia",
    icon: Newspaper,
    members: ["p5", "p6", "p7"],
  },
  {
    key: "groupGov",
    icon: Building2,
    members: ["p8"],
  },
];

export default function PartnersPage() {
  const t = useTranslations("partners");

  return (
    <>
      <PageHeader title={t("pageTitle")} description={t("pageDescription")} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 space-y-14">
          {GROUPS.map(({ key, icon: Icon, members }) => (
            <section key={key}>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                    {t(`${key}Title`)}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((m) => (
                  <GlassCard key={m} hoverable className="p-5">
                    <h3 className="font-heading text-base font-semibold leading-snug">
                      {t(`${m}Name`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`${m}Desc`)}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-20 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              {t("ctaDesc")}
            </p>
            <Link
              href="/contacts"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 rounded-full bg-cta text-cta-foreground hover:bg-cta/90"
              )}
            >
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
