"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, ArrowRight, Crown } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SiteLogo } from "@/components/layout/site-logo";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.kunyavsky"), href: "/about/kunyavsky" },
    { label: t("nav.symbolika"), href: "/about/symbolika" },
    { label: t("nav.partners"), href: "/partners" },
    { label: t("nav.awards"), href: "/awards" },
    { label: t("nav.contacts"), href: "/contacts" },
  ];

  const businessLinks: { label: string; href: string; memberOnly?: boolean }[] = [
    { label: t("nav.businessLegislation"), href: "/business/legislation-review" },
    { label: t("nav.businessEconomy"), href: "/business/economy" },
    { label: t("nav.advocacy"), href: "/advocacy", memberOnly: true },
    { label: t("nav.councils"), href: "/councils" },
    { label: t("nav.arbitration"), href: "/arbitration", memberOnly: true },
    { label: t("nav.dataProtection"), href: "/data-protection", memberOnly: true },
  ];

  const investorLinks = [
    { label: t("nav.foreignBusiness"), href: "/foreign-business" },
    { label: t("nav.investments"), href: "/investments" },
    { label: t("nav.international"), href: "/international" },
    { label: t("nav.aboutAssociations"), href: "/about/associations" },
  ];

  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-aurora text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 -top-20 size-[28rem] rounded-full bg-[var(--aurora-1)] opacity-30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-[32rem] rounded-full bg-[var(--aurora-2)] opacity-25 blur-3xl" />
        <div className="absolute inset-0 dot-pattern text-white/[0.06]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/15">
                <SiteLogo
                  variant="plain"
                  size="md"
                  alt={t("site.name")}
                  className="h-7 w-7"
                />
              </span>
              <span className="font-heading text-xl font-semibold">
                {t("site.name")}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              {t("footer.tagline")}
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-white/50">
              {t("site.fullName")}
            </p>
            <div className="space-y-2.5 text-sm text-white/80">
              <a
                href={`tel:${t("site.phone")}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                {t("site.phone")}
              </a>
              <a
                href={`mailto:${t("site.email")}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                {t("site.email")}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                {t("site.address")}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-wider text-white/60">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-wider text-white/60">
              {t("footer.forBusiness")}
            </h3>
            <ul className="space-y-2.5">
              {businessLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    {link.memberOnly && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-300/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200"
                        title={t("nav.membersOnly")}
                      >
                        <Crown className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-wider text-white/60">
              {t("footer.investorsCol")}
            </h3>
            <ul className="space-y-2.5">
              {investorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
              <h3 className="font-heading text-base font-semibold">
                {t("footer.joinTitle")}
              </h3>
              <p className="mt-1 text-sm text-white/70 leading-relaxed">
                {t("footer.joinSubtitle")}
              </p>
              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "mt-4 w-full justify-center rounded-xl bg-cta text-cta-foreground hover:bg-cta/90"
                )}
              >
                {t("footer.joinButton")}
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            {t("footer.copyright", { year })}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/legal/privacy"
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              {t("legal.navPrivacy")}
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/legal/terms"
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              {t("legal.navTerms")}
            </Link>
            <span className="text-white/20">·</span>
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
