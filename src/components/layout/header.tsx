"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SiteLogo } from "@/components/layout/site-logo";
import { useUser } from "@/components/auth-provider";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, signOut } = useUser();

  const navItems: NavItem[] = [
    {
      label: t("nav.about"),
      href: "/about",
      children: [
        { label: t("nav.aboutMission"), href: "/about/mission" },
        { label: t("nav.aboutHistory"), href: "/about/history" },
        { label: t("nav.aboutLeadership"), href: "/about/leadership" },
        { label: t("nav.aboutAchievements"), href: "/about/achievements" },
        { label: t("nav.aboutAssociations"), href: "/about/associations" },
      ],
    },
    {
      label: t("nav.forBusiness"),
      href: "/faq",
      children: [
        { label: t("nav.faq"), href: "/faq" },
        { label: t("nav.courtPractice"), href: "/court-practice" },
        { label: t("nav.experts"), href: "/experts" },
        { label: t("nav.advocacy"), href: "/advocacy" },
        { label: t("nav.consumerProtection"), href: "/consumer-protection" },
        { label: t("nav.dataProtection"), href: "/data-protection" },
        { label: t("nav.arbitration"), href: "/arbitration" },
      ],
    },
    {
      label: t("nav.membership"),
      href: "/membership",
      children: [
        { label: t("nav.membershipBenefits"), href: "/membership/benefits" },
        { label: t("nav.membershipTypes"), href: "/membership/types" },
        { label: t("nav.membershipJoin"), href: "/membership/join" },
        { label: t("nav.membershipDirectory"), href: "/membership/directory" },
      ],
    },
    { label: t("nav.events"), href: "/events" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.contacts"), href: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/10 dark:border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label={t("site.name")}
          >
            <SiteLogo
              size="sm"
              priority
              alt={t("site.name")}
              className="transition-transform group-hover:scale-105"
            />
            <span className="hidden font-heading text-lg font-semibold sm:block">
              {t("site.name")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-all",
                    "text-foreground/80 hover:text-foreground hover:bg-foreground/8",
                    "group-hover:bg-foreground/8 group-hover:text-foreground",
                    pathname.startsWith(item.href) &&
                      "text-foreground bg-gradient-to-r from-primary/15 to-[var(--cta)]/15"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[280px] rounded-2xl border border-border/60 bg-popover p-1.5 shadow-2xl ring-1 ring-black/5 dark:bg-popover dark:ring-white/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "group/item relative block rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all",
                            "text-foreground/85",
                            "hover:bg-gradient-to-r hover:from-primary/12 hover:via-[var(--cta)]/10 hover:to-[var(--gold)]/10 hover:text-foreground hover:shadow-sm hover:translate-x-0.5",
                            pathname === child.href &&
                              "bg-gradient-to-r from-primary/15 via-[var(--cta)]/12 to-[var(--gold)]/12 text-primary"
                          )}
                        >
                          <span className="relative z-10">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-1 lg:flex">
            <ThemeToggle />
            <LanguageSwitcher />
            {!loading && user ? (
              <>
                <Link
                  href="/cabinet"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "ml-1 gap-1.5 rounded-full"
                  )}
                >
                  <User className="h-3.5 w-3.5" />
                  {t("nav.cabinet")}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="gap-1.5 rounded-full text-muted-foreground"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {t("nav.logout")}
                </Button>
              </>
            ) : !loading ? (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "ml-1 rounded-full"
                  )}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/membership/join"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "rounded-full bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
                  )}
                >
                  {t("nav.joinCta")}
                </Link>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSwitcher variant="compact" />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-background border-l border-border">
                <SheetTitle className="sr-only">
                  {t("a11y.openMenu")}
                </SheetTitle>
                <nav className="flex flex-col gap-0.5 pt-4">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-base font-semibold transition-all",
                          "text-foreground hover:bg-gradient-to-r hover:from-primary/12 hover:via-[var(--cta)]/10 hover:to-[var(--gold)]/10",
                          pathname.startsWith(item.href) &&
                            "bg-gradient-to-r from-primary/15 to-[var(--cta)]/12"
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-xl px-6 py-2 text-sm font-medium transition-all",
                            "text-foreground/75 hover:text-foreground hover:bg-foreground/5",
                            pathname === child.href &&
                              "text-primary font-semibold bg-primary/10"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ))}

                  <div className="mt-4 flex flex-col gap-2 border-t border-foreground/10 pt-4">
                    <ThemeToggle />
                    {!loading && user ? (
                      <>
                        <Link
                          href="/cabinet"
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-full justify-center gap-1.5 rounded-xl"
                          )}
                        >
                          <User className="h-4 w-4" />
                          {t("nav.cabinet")}
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setMobileOpen(false);
                            signOut();
                          }}
                          className="w-full justify-center gap-1.5 text-muted-foreground"
                        >
                          <LogOut className="h-4 w-4" />
                          {t("nav.logout")}
                        </Button>
                      </>
                    ) : !loading ? (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-full justify-center rounded-xl"
                          )}
                        >
                          {t("nav.login")}
                        </Link>
                        <Link
                          href="/membership/join"
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            buttonVariants(),
                            "w-full justify-center rounded-xl bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
                          )}
                        >
                          {t("nav.joinCta")}
                        </Link>
                      </>
                    ) : null}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
