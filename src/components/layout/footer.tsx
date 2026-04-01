"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.membership"), href: "/membership" },
    { label: t("nav.faq"), href: "/faq" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.events"), href: "/events" },
    { label: t("nav.contacts"), href: "/contacts" },
  ];

  const businessLinks = [
    { label: t("nav.courtPractice"), href: "/court-practice" },
    { label: t("nav.experts"), href: "/experts" },
    { label: t("nav.advocacy"), href: "/advocacy" },
    { label: t("directions.consumerProtection"), href: "/consumer-protection" },
    { label: t("directions.dataProtection"), href: "/data-protection" },
  ];

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground text-primary font-heading font-bold text-sm">
                БС
              </div>
              <span className="font-heading text-lg font-semibold">
                {SITE.name}
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {SITE.fullName}
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {SITE.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                {t("footer.address")}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">
              {t("nav.forBusiness")}
            </h3>
            <ul className="space-y-2">
              {businessLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">
              {t("nav.membership")}
            </h3>
            <p className="mb-4 text-sm text-primary-foreground/70 leading-relaxed">
              {t("cta.subtitle")}
            </p>
            <Link
              href="/membership/join"
              className="inline-flex items-center justify-center rounded-lg bg-cta px-4 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta/90"
            >
              {t("nav.joinCta")}
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">
            {t("footer.copyright", { year })}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
            >
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
