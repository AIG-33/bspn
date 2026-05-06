import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { CheckCircle2, X, ArrowRight, Star } from "lucide-react";

interface MemberTypeDef {
  key: "associated" | "solidary" | "active" | "full";
  popular: boolean;
  features: { id: number; included: boolean }[];
}

const TYPES: MemberTypeDef[] = [
  {
    key: "associated",
    popular: false,
    features: [
      { id: 1, included: true },
      { id: 2, included: true },
      { id: 3, included: true },
      { id: 4, included: false },
      { id: 5, included: false },
      { id: 7, included: false },
      { id: 8, included: false },
      { id: 9, included: false },
    ],
  },
  {
    key: "solidary",
    popular: false,
    features: [
      { id: 1, included: true },
      { id: 2, included: true },
      { id: 3, included: true },
      { id: 4, included: true },
      { id: 5, included: true },
      { id: 7, included: false },
      { id: 8, included: false },
      { id: 9, included: true },
    ],
  },
  {
    key: "active",
    popular: true,
    features: [
      { id: 1, included: true },
      { id: 2, included: true },
      { id: 6, included: true },
      { id: 11, included: true },
      { id: 10, included: true },
      { id: 7, included: true },
      { id: 8, included: true },
      { id: 9, included: true },
    ],
  },
  {
    key: "full",
    popular: false,
    features: [
      { id: 12, included: true },
      { id: 13, included: true },
      { id: 14, included: true },
      { id: 15, included: true },
      { id: 16, included: true },
      { id: 17, included: true },
      { id: 18, included: true },
      { id: 19, included: true },
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
          {TYPES.map((type) => (
            <GlassCard
              key={type.key}
              className={cn(
                "relative flex flex-col p-6",
                type.popular && "ring-1 ring-primary/40 glow-primary"
              )}
            >
              {type.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1 rounded-full bg-gradient-to-r from-primary to-[var(--cta)] text-white shadow-lg">
                    <Star className="h-3 w-3" />
                    {t("popular")}
                  </Badge>
                </div>
              )}

              <h3 className="font-heading text-lg font-bold">
                {t(`${type.key}Name`)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`${type.key}Desc`)}
              </p>

              <div className="mt-4">
                <span className="font-mono text-3xl font-bold">
                  {t(`${type.key}Price`)}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {tCommon("byPerYear")}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {type.features.map(({ id, included }) => (
                  <li
                    key={id}
                    className={cn(
                      "flex items-start gap-2 text-sm",
                      included
                        ? "text-foreground"
                        : "text-muted-foreground/40"
                    )}
                  >
                    {included ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    {t(`f${id}`)}
                  </li>
                ))}
              </ul>

              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({
                    variant: type.popular ? "default" : "outline",
                  }),
                  "mt-6 w-full justify-center rounded-xl",
                  type.popular &&
                    "bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
                )}
              >
                {t("select")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </GlassCard>
          ))}
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
