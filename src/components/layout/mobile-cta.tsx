"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function MobileCtaBar() {
  const t = useTranslations("nav");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-lg p-3 lg:hidden">
      <Link
        href="/membership/join"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cta px-4 py-3 text-sm font-semibold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90"
      >
        {t("joinCta")}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
