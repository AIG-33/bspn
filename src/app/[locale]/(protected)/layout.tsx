"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/header";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  FileText,
  CalendarDays,
  MessageSquare,
  CreditCard,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/components/auth-provider";

interface NavItem {
  href: string;
  labelKey:
    | "menuOverview"
    | "menuProfile"
    | "menuDocuments"
    | "menuEvents"
    | "menuConsultations"
    | "menuBilling"
    | "menuNotifications"
    | "menuSettings";
  icon: LucideIcon;
  badge?: number;
}

const SIDEBAR_NAV: NavItem[] = [
  { href: "/cabinet", labelKey: "menuOverview", icon: LayoutDashboard },
  { href: "/cabinet/profile", labelKey: "menuProfile", icon: User },
  { href: "/cabinet/documents", labelKey: "menuDocuments", icon: FileText, badge: 3 },
  { href: "/cabinet/events", labelKey: "menuEvents", icon: CalendarDays, badge: 2 },
  { href: "/cabinet/consultations", labelKey: "menuConsultations", icon: MessageSquare },
  { href: "/cabinet/billing", labelKey: "menuBilling", icon: CreditCard },
  { href: "/cabinet/notifications", labelKey: "menuNotifications", icon: Bell, badge: 5 },
  { href: "/cabinet/settings", labelKey: "menuSettings", icon: Settings },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("cabinet");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useUser();

  const renderItem = (item: NavItem, mobile = false) => {
    const isActive =
      pathname === item.href ||
      (item.href !== "/cabinet" && pathname.startsWith(item.href));
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={mobile ? () => setMobileOpen(false) : undefined}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          mobile && "py-3",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1">{t(item.labelKey)}</span>
        {item.badge && (
          <Badge className="h-5 min-w-5 justify-center bg-cta px-1.5 text-[10px] text-cta-foreground">
            {item.badge}
          </Badge>
        )}
        {mobile && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
      </Link>
    );
  };

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <aside className="hidden w-60 shrink-0 lg:block">
            <nav className="sticky top-24 space-y-1">
              {SIDEBAR_NAV.map((item) => renderItem(item))}
              <div className="mt-4 border-t border-foreground/5 pt-4">
                <button
                  type="button"
                  onClick={signOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  {tNav("logout")}
                </button>
              </div>
            </nav>
          </aside>

          <div className="fixed bottom-4 right-4 z-40 lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg glow-primary"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileOpen && (
            <>
              <div
                className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <aside className="fixed bottom-0 left-0 right-0 z-30 max-h-[70vh] overflow-y-auto rounded-t-3xl glass-strong p-4 lg:hidden">
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-foreground/15" />
                <nav className="space-y-1">
                  {SIDEBAR_NAV.map((item) => renderItem(item, true))}
                </nav>
              </aside>
            </>
          )}

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
