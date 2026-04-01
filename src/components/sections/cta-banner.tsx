"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CtaBanner() {
  const t = useTranslations("cta");

  const steps = [t("step1"), t("step2"), t("step3")];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-24">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
          {t("subtitle")}
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cta text-sm font-bold text-white">
                {i + 1}
              </div>
              <span className="text-sm text-white/90">{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/membership/join"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-cta text-cta-foreground hover:bg-cta/90 text-base px-10 h-13 rounded-xl shadow-xl"
            )}
          >
            {t("button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/50">{t("memberCount")}</p>
      </div>
    </section>
  );
}
