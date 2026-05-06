"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "header" | "compact" | "footer";
  className?: string;
}

const flags: Record<Locale, string> = {
  ru: "🇷🇺",
  en: "🇬🇧",
  zh: "🇨🇳",
};

export function LanguageSwitcher({
  variant = "header",
  className,
}: Props) {
  const t = useTranslations();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as Locale) ?? "ru";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("a11y.switchLanguage")}
        className={cn(
          "flex items-center gap-1.5 rounded-full text-sm transition-colors",
          variant === "header" &&
            "px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-foreground/5",
          variant === "compact" &&
            "h-9 w-9 justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5",
          variant === "footer" &&
            "px-3 py-1.5 text-primary-foreground/70 hover:text-primary-foreground"
        )}
      >
        <Globe className="h-4 w-4" />
        {variant !== "compact" && (
          <span className="font-medium">{t("lang.current")}</span>
        )}
      </button>

      {open && (
        <div
          role="listbox"
          className="glass-strong absolute right-0 top-full mt-2 min-w-[10rem] rounded-2xl p-1.5 shadow-xl z-50 animate-fade-up"
        >
          {locales.map((loc) => (
            <Link
              key={loc}
              href={pathname}
              locale={loc}
              onClick={() => setOpen(false)}
              role="option"
              aria-selected={loc === currentLocale}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                "text-foreground hover:bg-foreground/5",
                loc === currentLocale && "bg-primary/10 text-primary font-medium"
              )}
            >
              <span className="text-base leading-none">{flags[loc]}</span>
              <span className="flex-1">{t(`lang.${loc}`)}</span>
              {loc === currentLocale && <Check className="h-3.5 w-3.5" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
