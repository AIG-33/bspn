import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { ExpertsCatalog, UnionSkills } from "@/components/sections/experts-catalog";
import { ArrowRight, Unlock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experts" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "experts",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("forBusiness"),
  });
}

export default function ExpertsPage() {
  const t = useTranslations("experts");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          <Unlock className="h-3.5 w-3.5" />
          {t("openTag")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <UnionSkills />
        <ExpertsCatalog />

        {/* Приглашение стать экспертом */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("futureTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              {t("futureBody")}
            </p>
            <div className="mt-6">
              <Link
                href="/contacts"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-cta text-cta-foreground hover:bg-cta/90"
                )}
              >
                {t("futureCta")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
