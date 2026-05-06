import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Gift,
  Layers,
  PenLine,
  Users,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SECTIONS: { key: number; href: string; icon: LucideIcon }[] = [
  { key: 1, href: "/membership/benefits", icon: Gift },
  { key: 2, href: "/membership/types", icon: Layers },
  { key: 3, href: "/membership/join", icon: PenLine },
  { key: 4, href: "/membership/directory", icon: Users },
];

const HIGHLIGHTS = [1, 2, 3, 4, 5, 6] as const;

export default function MembershipPage() {
  const t = useTranslations("membership");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {SECTIONS.map(({ key, href, icon: Icon }) => (
            <Link key={href} href={href} className="group">
              <GlassCard hoverable className="h-full p-7">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-lg font-semibold">
                  {t(`section${key}Title`)}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`section${key}Desc`)}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  {tCommon("readMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <h2 className="relative font-heading text-3xl font-bold sm:text-4xl">
            {t("highlightsTitle")}
          </h2>
          <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((n) => (
              <div key={n} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
                <span className="text-sm text-white/90">{t(`h${n}`)}</span>
              </div>
            ))}
          </div>
          <Link
            href="/membership/join"
            className={cn(
              buttonVariants({ size: "lg" }),
              "relative mt-8 rounded-2xl bg-cta px-8 text-cta-foreground hover:bg-cta/90 glow-cta"
            )}
          >
            {tNav("joinCta")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
