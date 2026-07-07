import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { CheckCircle2, Check, Minus, ArrowRight, Star } from "lucide-react";

// Порядок колонок: Ассоциированное / Солидарное / Действительное / Полномочное
const TIERS = [
  { key: "associated", popular: false, highlights: 3 },
  { key: "solidary", popular: false, highlights: 4 },
  { key: "active", popular: true, highlights: 4 },
  { key: "full", popular: false, highlights: 4 },
] as const;

// Матрица услуг из Приложения 1 Регламента работы БСПН.
// tiers: [ассоциированное, солидарное, действительное, полномочное]
const MATRIX: {
  group: string;
  rows: { key: string; tiers: [boolean, boolean, boolean, boolean] }[];
}[] = [
  {
    group: "g1",
    rows: [
      { key: "s1", tiers: [true, true, true, true] },
      { key: "s2", tiers: [false, false, true, true] },
    ],
  },
  {
    group: "g2",
    rows: [
      { key: "s3", tiers: [true, true, true, true] },
      { key: "s4", tiers: [true, true, true, true] },
      { key: "s5", tiers: [false, true, true, true] },
      { key: "s6", tiers: [false, false, true, true] },
      { key: "s7", tiers: [false, false, true, true] },
      { key: "s8", tiers: [false, false, false, true] },
      { key: "s9", tiers: [false, false, true, true] },
    ],
  },
  {
    group: "g3",
    rows: [
      { key: "s10", tiers: [false, true, true, true] },
      { key: "s11", tiers: [false, false, true, true] },
      { key: "s12", tiers: [true, true, true, true] },
      { key: "s13", tiers: [false, false, true, true] },
      { key: "s14", tiers: [false, false, false, true] },
    ],
  },
  {
    group: "g4",
    rows: [
      { key: "s15", tiers: [true, true, true, true] },
      { key: "s16", tiers: [false, false, true, true] },
      { key: "s17", tiers: [false, false, true, true] },
      { key: "s18", tiers: [false, true, true, true] },
    ],
  },
];

export default function MembershipTypesPage() {
  const t = useTranslations("memberTypes");
  const tCommon = useTranslations("common");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <GlassCard
              key={tier.key}
              className={cn(
                "relative flex flex-col p-6",
                tier.popular && "ring-1 ring-primary/40 glow-primary"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1 rounded-full bg-gradient-to-r from-primary to-[var(--cta)] text-white shadow-lg">
                    <Star className="h-3 w-3" />
                    {t("popular")}
                  </Badge>
                </div>
              )}

              <h3 className="font-heading text-lg font-bold">
                {t(`${tier.key}Name`)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`${tier.key}Desc`)}
              </p>

              <div className="mt-4">
                <span className="font-mono text-3xl font-bold">
                  {t(`${tier.key}Price`)}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {tCommon("byPerYear")}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {Array.from({ length: tier.highlights }, (_, i) => i + 1).map(
                  (n) => (
                    <li
                      key={n}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {t(`${tier.key}H${n}`)}
                    </li>
                  )
                )}
              </ul>

              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({
                    variant: tier.popular ? "default" : "outline",
                  }),
                  "mt-6 w-full justify-center rounded-xl",
                  tier.popular &&
                    "bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
                )}
              >
                {t("select")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Полная матрица услуг по Регламенту */}
        <div className="mt-20">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("matrixTitle")}
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {t("matrixNote")}
          </p>

          <GlassCard className="mt-8 overflow-x-auto p-0">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="p-4 text-left font-heading text-sm font-semibold text-muted-foreground">
                    {" "}
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.key}
                      className={cn(
                        "p-4 text-center font-heading text-sm font-bold",
                        tier.popular && "text-primary"
                      )}
                    >
                      {t(`${tier.key}Name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(({ group, rows }) => (
                  <Fragment key={group}>
                    <tr className="bg-primary/[0.04]">
                      <td
                        colSpan={5}
                        className="px-4 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary"
                      >
                        {t(`${group}Title`)}
                      </td>
                    </tr>
                    {rows.map(({ key, tiers }) => (
                      <tr
                        key={key}
                        className="border-b border-border/40 last:border-0"
                      >
                        <td className="px-4 py-3 leading-snug text-foreground/90">
                          {t(key)}
                        </td>
                        {tiers.map((included, i) => (
                          <td key={i} className="px-4 py-3 text-center">
                            {included ? (
                              <Check className="mx-auto h-4 w-4 text-success" />
                            ) : (
                              <Minus className="mx-auto h-4 w-4 text-muted-foreground/30" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>

        <GlassCard className="mt-20 p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold">
            {t("conditionsTitle")}
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <h3 className="font-heading text-base font-semibold">
                  {t(`cond${n}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`cond${n}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="mt-12 text-center">
          <p className="text-base text-muted-foreground">{t("ctaText")}</p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/membership/join"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-xl bg-cta px-8 text-cta-foreground hover:bg-cta/90 glow-cta"
              )}
            >
              {tCommon("applyNow")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contacts"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl px-8"
              )}
            >
              {tCommon("contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
