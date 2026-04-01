"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Globe, LogOut, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { SITE } from "@/lib/constants";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useUser } from "@/components/auth-provider";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, signOut } = useUser();

  const navItems: NavItem[] = [
    {
      label: t("about"),
      href: "/about",
      children: [
        { label: t("aboutMission"), href: "/about/mission" },
        { label: t("aboutHistory"), href: "/about/history" },
        { label: t("aboutLeadership"), href: "/about/leadership" },
        { label: t("aboutAchievements"), href: "/about/achievements" },
        { label: t("aboutAssociations"), href: "/about/associations" },
      ],
    },
    {
      label: t("forBusiness"),
      href: "/faq",
      children: [
        { label: t("faq"), href: "/faq" },
        { label: t("courtPractice"), href: "/court-practice" },
        { label: t("experts"), href: "/experts" },
        { label: t("advocacy"), href: "/advocacy" },
      ],
    },
    {
      label: t("membership"),
      href: "/membership",
      children: [
        { label: t("membershipBenefits"), href: "/membership/benefits" },
        { label: t("membershipTypes"), href: "/membership/types" },
        { label: t("membershipJoin"), href: "/membership/join" },
      ],
    },
    { label: t("events"), href: "/events" },
    { label: t("news"), href: "/news" },
    { label: t("contacts"), href: "/contacts" },
  ];

  const altLocale = locale === "ru" ? "en" : "ru";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm">
            БС
          </div>
          <span className="hidden font-heading text-lg font-semibold text-foreground sm:block">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground",
                  pathname.startsWith(item.href) && "text-foreground"
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[220px] rounded-xl border border-border bg-popover p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors",
                          "text-muted-foreground hover:bg-accent hover:text-foreground",
                          pathname === child.href &&
                            "bg-accent text-foreground font-medium"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link
            href={pathname}
            locale={altLocale}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            {t("language")}
          </Link>
          {!loading && user ? (
            <>
              <Link
                href="/cabinet"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5"
                )}
              >
                <User className="h-3.5 w-3.5" />
                Кабинет
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="gap-1.5 text-muted-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
                Выйти
              </Button>
            </>
          ) : !loading ? (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" })
                )}
              >
                {t("login")}
              </Link>
              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "bg-cta text-cta-foreground hover:bg-cta/90"
                )}
              >
                {t("joinCta")}
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={pathname}
            locale={altLocale}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground"
          >
            <Globe className="h-4 w-4" />
          </Link>
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
            <SheetContent side="right" className="w-full sm:w-80">
              <SheetTitle className="sr-only">Меню навигации</SheetTitle>
              <nav className="flex flex-col gap-1 pt-4">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                        "text-foreground hover:bg-accent",
                        pathname.startsWith(item.href) && "bg-accent"
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
                          "block rounded-lg px-6 py-2 text-sm transition-colors",
                          "text-muted-foreground hover:text-foreground",
                          pathname === child.href &&
                            "text-foreground font-medium"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  {!loading && user ? (
                    <>
                      <Link
                        href="/cabinet"
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full justify-center gap-1.5"
                        )}
                      >
                        <User className="h-4 w-4" />
                        Личный кабинет
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
                        Выйти
                      </Button>
                    </>
                  ) : !loading ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full justify-center"
                        )}
                      >
                        {t("login")}
                      </Link>
                      <Link
                        href="/membership/join"
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          buttonVariants(),
                          "w-full justify-center bg-cta text-cta-foreground hover:bg-cta/90"
                        )}
                      >
                        {t("joinCta")}
                      </Link>
                    </>
                  ) : null}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
