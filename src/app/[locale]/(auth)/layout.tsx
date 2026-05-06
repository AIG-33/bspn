import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SiteLogo } from "@/components/layout/site-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-20 top-1/4 size-[28rem] rounded-full bg-[var(--aurora-1)] opacity-30 blur-3xl animate-orb-a" />
        <div className="absolute -right-20 bottom-0 size-[32rem] rounded-full bg-[var(--aurora-2)] opacity-25 blur-3xl animate-orb-b" />
      </div>

      <div className="absolute right-4 top-4 flex items-center gap-1">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <Link
        href="/"
        className="mb-8 flex items-center gap-2.5 group"
        aria-label={t("site.name")}
      >
        <SiteLogo
          size="lg"
          priority
          alt={t("site.name")}
          className="transition-transform group-hover:scale-105"
        />
        <span className="font-heading text-xl font-semibold">
          {t("site.name")}
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
