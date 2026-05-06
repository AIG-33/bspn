import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Lock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function DirectoryPage() {
  const t = useTranslations("directory");
  const tNav = useTranslations("nav");

  return (
    <>
      <PageHeader title={t("pageTitle")} description={t("pageDescription")} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <GlassCard className="p-8 text-center sm:p-12">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg glow-primary">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="mt-6 font-heading text-2xl font-bold sm:text-3xl">
            {t("membersOnly")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t("loginToAccess")}
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl"
              )}
            >
              {tNav("login")}
            </Link>
            <Link
              href="/membership/join"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-xl bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
              )}
            >
              {tNav("joinCta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
