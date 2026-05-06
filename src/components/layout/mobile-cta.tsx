"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function MobileCtaBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  if (pathname?.startsWith("/membership/join")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="glass-strong border-t border-white/10 p-3">
        <Link
          href="/membership/join"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cta px-4 py-3 text-sm font-semibold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90 glow-cta"
        >
          {t("joinCta")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
