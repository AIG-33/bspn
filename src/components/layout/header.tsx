"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Crown,
  Sun,
  Moon,
  Globe,
  Check,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SiteLogo } from "@/components/layout/site-logo";
import { useUser } from "@/components/auth-provider";

const FLAGS: Record<Locale, string> = {
  ru: "🇷🇺",
  en: "🇬🇧",
  zh: "🇨🇳",
};

interface NavLeaf {
  label: string;
  href: string;
  /** Highlights the link as a member-exclusive section. */
  memberOnly?: boolean;
}

interface NavGroup {
  title?: string;
  items: NavLeaf[];
}

interface NavItem {
  label: string;
  href: string;
  groups?: NavGroup[];
  /** Force the dropdown into a 2-column layout regardless of items count. */
  wide?: boolean;
}

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as Locale) ?? "ru";
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, signOut } = useUser();
  const { theme, setTheme } = useTheme();
  const [themeMounted, setThemeMounted] = useState(false);
  useEffect(() => setThemeMounted(true), []);
  const isDark = themeMounted && theme === "dark";

  const navItems: NavItem[] = [
    {
      label: t("nav.about"),
      href: "/about",
      wide: true,
      groups: [
        {
          title: t("nav.aboutGroup"),
          items: [
            { label: t("nav.aboutMission"), href: "/about/mission" },
            { label: t("nav.aboutHistory"), href: "/about/history" },
            { label: t("nav.kunyavsky"), href: "/about/kunyavsky" },
            { label: t("nav.symbolika"), href: "/about/symbolika" },
            { label: t("nav.aboutAssociations"), href: "/about/associations" },
            { label: t("nav.regulations"), href: "/regulations" },
          ],
        },
        {
          title: t("nav.aboutPeopleGroup"),
          items: [
            { label: t("nav.aboutLeadership"), href: "/about/leadership" },
            { label: t("nav.specialists"), href: "/specialists" },
            { label: t("nav.aboutAchievements"), href: "/about/achievements" },
            { label: t("nav.awards"), href: "/awards" },
            { label: t("nav.councils"), href: "/councils" },
            { label: t("nav.partners"), href: "/partners" },
            { label: t("nav.media"), href: "/media" },
          ],
        },
      ],
    },
    {
      label: t("nav.forBusiness"),
      href: "/business",
      wide: true,
      groups: [
        {
          title: t("nav.businessAnalytics"),
          items: [
            { label: t("nav.businessLegislation"), href: "/business/legislation-review" },
            { label: t("nav.businessEconomy"), href: "/business/economy" },
            { label: t("nav.businessSocialLabor"), href: "/business/social-labor" },
            { label: t("nav.businessResearch"), href: "/business/research" },
            { label: t("nav.businessPress"), href: "/business/press" },
            { label: t("nav.legislation"), href: "/legislation" },
            { label: t("nav.faq"), href: "/faq" },
          ],
        },
        {
          title: t("nav.businessServices"),
          items: [
            { label: t("nav.experts"), href: "/experts" },
            { label: t("nav.advocacy"), href: "/advocacy", memberOnly: true },
            { label: t("nav.consumerProtection"), href: "/consumer-protection", memberOnly: true },
            { label: t("nav.dataProtection"), href: "/data-protection", memberOnly: true },
            { label: t("nav.arbitration"), href: "/arbitration", memberOnly: true },
            { label: t("nav.courtPractice"), href: "/court-practice", memberOnly: true },
          ],
        },
      ],
    },
    {
      label: t("nav.foreignBusiness"),
      href: "/foreign-business",
      groups: [
        {
          items: [
            { label: t("nav.foreignBusiness"), href: "/foreign-business" },
            { label: t("nav.investments"), href: "/investments" },
            { label: t("nav.international"), href: "/international" },
          ],
        },
      ],
    },
    {
      label: t("nav.membership"),
      href: "/membership",
      groups: [
        {
          items: [
            { label: t("nav.membershipBenefits"), href: "/membership/benefits" },
            { label: t("nav.membershipTypes"), href: "/membership/types" },
            { label: t("nav.membershipJoin"), href: "/membership/join" },
            { label: t("nav.membershipDirectory"), href: "/membership/directory", memberOnly: true },
            { label: t("nav.directorsClub"), href: "/directors-club", memberOnly: true },
          ],
        },
      ],
    },
    {
      label: t("nav.newsEvents"),
      href: "/news",
      groups: [
        {
          items: [
            { label: t("nav.news"), href: "/news" },
            { label: t("nav.events"), href: "/events" },
            { label: t("nav.blog"), href: "/blog" },
          ],
        },
      ],
    },
    { label: t("nav.contacts"), href: "/contacts" },
  ];

  const memberBadge = (
    <span
      className={cn(
        "ml-auto inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5",
        "border border-amber-400/40 bg-amber-400/15 text-[10px] font-bold uppercase tracking-wide",
        "text-amber-700 dark:text-amber-200"
      )}
    >
      <Crown className="h-2.5 w-2.5" />
      {t("nav.membersOnly")}
    </span>
  );

  const renderLeaf = (leaf: NavLeaf, isMobile = false) => (
    <Link
      key={leaf.href}
      href={leaf.href}
      onClick={isMobile ? () => setMobileOpen(false) : undefined}
      className={cn(
        "group/item flex items-center gap-2 rounded-lg transition-all",
        isMobile
          ? "px-6 py-2 text-sm font-medium"
          : "px-3 py-2 text-[13px] font-semibold",
        leaf.memberOnly
          ? "text-amber-800 dark:text-amber-200 hover:bg-gradient-to-r hover:from-amber-400/15 hover:via-amber-300/10 hover:to-amber-200/10 hover:shadow-[inset_2px_0_0_var(--gold)]"
          : "text-foreground/85 hover:bg-gradient-to-r hover:from-primary/12 hover:via-[var(--cta)]/10 hover:to-[var(--gold)]/10 hover:text-foreground",
        pathname === leaf.href &&
          (leaf.memberOnly
            ? "bg-amber-400/15 text-amber-900 dark:text-amber-100"
            : "bg-gradient-to-r from-primary/15 via-[var(--cta)]/12 to-[var(--gold)]/12 text-primary")
      )}
    >
      <span className="truncate">{leaf.label}</span>
      {leaf.memberOnly ? memberBadge : null}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/10 dark:border-white/5">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 group"
            aria-label={t("site.name")}
          >
            <SiteLogo
              size="sm"
              priority
              alt={t("site.name")}
              className="transition-transform group-hover:scale-105"
            />
            <span className="hidden font-heading text-base font-semibold sm:block">
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
                    "flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-all",
                    "text-foreground/80 hover:text-foreground hover:bg-foreground/8",
                    "group-hover:bg-foreground/8 group-hover:text-foreground",
                    pathname.startsWith(item.href) &&
                      "text-foreground bg-gradient-to-r from-primary/15 to-[var(--cta)]/15"
                  )}
                >
                  {item.label}
                  {item.groups && (
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.groups && (
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div
                      className={cn(
                        "rounded-2xl border border-border/60 bg-popover p-2 shadow-2xl ring-1 ring-black/5 dark:bg-popover dark:ring-white/10",
                        item.wide
                          ? "grid w-[640px] grid-cols-2 gap-x-2"
                          : "min-w-[260px]"
                      )}
                    >
                      {item.groups.map((group, idx) => (
                        <div
                          key={group.title ?? idx}
                          className={cn(
                            item.wide && "p-1",
                            !item.wide && idx > 0 && "mt-2 pt-2 border-t border-border/40"
                          )}
                        >
                          {group.title && (
                            <div className="mb-1 px-3 pt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                              {group.title}
                            </div>
                          )}
                          <div className="flex flex-col gap-0.5">
                            {group.items.map((leaf) => renderLeaf(leaf))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions — consolidated account/settings menu */}
          <div className="hidden items-center gap-1.5 lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  user ? (
                    <button
                      type="button"
                      aria-label={t("a11y.userMenu")}
                      className={cn(
                        "group/trigger inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 bg-background/40 pl-1 pr-2.5 text-xs font-semibold transition-all",
                        "hover:border-primary/40 hover:bg-foreground/[0.04]",
                        "data-popup-open:border-primary/50 data-popup-open:bg-foreground/[0.05]"
                      )}
                    >
                      <span
                        aria-hidden
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary via-[var(--cta)] to-[var(--gold)] text-[11px] font-bold uppercase text-white shadow-sm"
                      >
                        {(user.email?.charAt(0) ?? "?").toUpperCase()}
                      </span>
                      <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted-foreground xl:inline">
                        {currentLocale}
                      </span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform group-data-popup-open/trigger:rotate-180" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label={t("a11y.settings")}
                      className={cn(
                        "group/trigger inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 text-xs font-semibold text-muted-foreground transition-all",
                        "hover:border-primary/40 hover:bg-foreground/[0.04] hover:text-foreground",
                        "data-popup-open:border-primary/50 data-popup-open:bg-foreground/[0.05] data-popup-open:text-foreground"
                      )}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span className="font-mono text-[11px] uppercase tracking-wider">
                        {currentLocale}
                      </span>
                      <ChevronDown className="h-3 w-3 transition-transform group-data-popup-open/trigger:rotate-180" />
                    </button>
                  )
                }
              />
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-60 p-1.5"
              >
                {user && (
                  <>
                    <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
                      <span
                        aria-hidden
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-[var(--cta)] to-[var(--gold)] text-sm font-bold uppercase text-white shadow-sm"
                      >
                        {(user.email?.charAt(0) ?? "?").toUpperCase()}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          {t("nav.account")}
                        </div>
                        <div className="truncate text-xs font-medium text-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <DropdownMenuItem
                      render={<Link href="/cabinet" />}
                      className="gap-2 px-2 py-1.5 text-sm"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      {t("nav.cabinet")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuLabel className="px-2 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("nav.theme")}
                </DropdownMenuLabel>
                <DropdownMenuItem
                  closeOnClick={false}
                  onClick={() => setTheme("light")}
                  className="gap-2 px-2 py-1.5 text-sm"
                >
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{t("a11y.lightTheme")}</span>
                  {themeMounted && !isDark && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  closeOnClick={false}
                  onClick={() => setTheme("dark")}
                  className="gap-2 px-2 py-1.5 text-sm"
                >
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{t("a11y.darkTheme")}</span>
                  {themeMounted && isDark && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="px-2 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("nav.language")}
                </DropdownMenuLabel>
                {locales.map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    render={<Link href={pathname} locale={loc} />}
                    className={cn(
                      "gap-2 px-2 py-1.5 text-sm",
                      loc === currentLocale && "bg-primary/8 text-primary"
                    )}
                  >
                    <span className="text-base leading-none">{FLAGS[loc]}</span>
                    <span className="flex-1">{t(`lang.${loc}`)}</span>
                    {loc === currentLocale && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                  </DropdownMenuItem>
                ))}

                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={signOut}
                      className="gap-2 px-2 py-1.5 text-sm"
                    >
                      <LogOut className="h-4 w-4" />
                      {t("nav.logout")}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {!loading && !user && (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "h-9 rounded-full px-3 text-xs"
                  )}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/membership/join"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "h-9 rounded-full bg-cta px-4 text-cta-foreground hover:bg-cta/90 glow-cta text-xs"
                  )}
                >
                  {t("nav.joinCta")}
                </Link>
              </>
            )}
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
                      {item.groups?.map((group, gi) => (
                        <div key={gi} className="mt-1">
                          {group.title && (
                            <div className="px-3 pt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                              {group.title}
                            </div>
                          )}
                          {group.items.map((leaf) => renderLeaf(leaf, true))}
                        </div>
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
