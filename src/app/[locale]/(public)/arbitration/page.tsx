import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Gavel,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "arbitrationPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "arbitration",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("forBusiness"),
  });
}

interface TextBlock {
  title: string;
  desc: string;
}

const ADV_ICONS: LucideIcon[] = [Zap, Coins, Lock, ShieldCheck];

export default function ArbitrationPage() {
  const t = useTranslations("arbitrationPage");
  const advantages = t.raw("advantages") as TextBlock[];
  const steps = t.raw("steps") as TextBlock[];
  const scope = t.raw("scope") as string[];

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          <Gavel className="h-3.5 w-3.5" />
          {t("tag")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        {/* Advantages */}
        <section className="mt-14">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("advantagesTitle")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => {
              const Icon = ADV_ICONS[i] ?? ShieldCheck;
              return (
                <GlassCard key={i} hoverable className="p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-semibold">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.desc}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-20">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("stepsTitle")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <GlassCard key={i} className="relative h-full p-6">
                <span className="font-mono text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-base font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Scope */}
        <section className="mt-20">
          <GlassCard className="p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("scopeTitle")}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {scope.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-foreground/85"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>

        {/* CTA */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                {t("ctaBody")}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contacts"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-cta px-8 text-cta-foreground hover:bg-cta/90"
                  )}
                >
                  {t("ctaButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/court-practice"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-white/30 bg-white/10 px-8 text-white hover:bg-white/20"
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
