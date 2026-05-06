"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  FileText,
  CalendarDays,
  Newspaper,
  BookOpen,
  Settings,
  Menu,
  X,
  LogOut,
  Shield,
  BarChart3,
  MessageSquare,
  CreditCard,
  Home,
  HelpCircle,
  Scale,
  UserCheck,
  Megaphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useUser } from "@/components/auth-provider";

interface AdminItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  badge?: number;
}

const ADMIN_NAV: { sectionKey: string; items: AdminItem[] }[] = [
  {
    sectionKey: "sectionMain",
    items: [
      { href: "/admin", labelKey: "dashboard", icon: LayoutDashboard },
      { href: "/admin/members", labelKey: "members", icon: Users, badge: 3 },
      { href: "/admin/applications", labelKey: "applications", icon: Shield, badge: 5 },
    ],
  },
  {
    sectionKey: "sectionContent",
    items: [
      { href: "/admin/news", labelKey: "news", icon: Newspaper },
      { href: "/admin/events", labelKey: "events", icon: CalendarDays },
      { href: "/admin/blog", labelKey: "blog", icon: BookOpen },
      { href: "/admin/documents", labelKey: "documents", icon: FileText },
      { href: "/admin/faq", labelKey: "faq", icon: HelpCircle },
      { href: "/admin/court-practice", labelKey: "courtPractice", icon: Scale },
      { href: "/admin/experts", labelKey: "experts", icon: UserCheck },
      { href: "/admin/advocacy", labelKey: "advocacy", icon: Megaphone },
    ],
  },
  {
    sectionKey: "sectionAnalytics",
    items: [
      { href: "/admin/analytics", labelKey: "analytics", icon: BarChart3 },
      { href: "/admin/consultations", labelKey: "consultations", icon: MessageSquare },
      { href: "/admin/billing", labelKey: "billing", icon: CreditCard },
    ],
  },
  {
    sectionKey: "sectionSystem",
    items: [{ href: "/admin/settings", labelKey: "settings", icon: Settings }],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("admin");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useUser();

  const sidebarContent = (
    <nav className="space-y-6">
      {ADMIN_NAV.map(({ sectionKey, items }) => (
        <div key={sectionKey}>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t(sectionKey)}
          </p>
          <div className="mt-2 space-y-0.5">
            {items.map(({ href, labelKey, icon: Icon, badge }) => {
              const isActive =
                pathname === href ||
                (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-primary to-[var(--cta)] text-white shadow-md"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{t(labelKey)}</span>
                  {badge && (
                    <Badge
                      className={cn(
                        "h-5 min-w-5 justify-center px-1.5 text-[10px]",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-cta text-cta-foreground"
                      )}
                    >
                      {badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-foreground/5 glass">
        <div className="flex h-14 items-center gap-2 border-b border-foreground/5 px-4">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-heading text-sm font-bold">
            {t("panelName")}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">{sidebarContent}</div>
        <div className="border-t border-foreground/5 p-3 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            {t("back")}
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            {tNav("logout")}
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-foreground/5 glass px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-heading text-sm font-bold">
              {t("panelName")}
            </span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto glass-strong p-3 lg:hidden">
              <div className="mb-4 flex h-10 items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-heading text-sm font-bold">
                  {t("panelName")}
                </span>
              </div>
              {sidebarContent}
            </aside>
          </>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
