"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";

const sidebarNav = [
  { href: "/cabinet", label: "Дашборд", icon: LayoutDashboard },
  { href: "/cabinet/profile", label: "Профиль", icon: User },
  { href: "/cabinet/documents", label: "Документы", icon: FileText, badge: 3 },
  { href: "/cabinet/events", label: "Мероприятия", icon: CalendarDays, badge: 2 },
  { href: "/cabinet/consultations", label: "Консультации", icon: MessageSquare },
  { href: "/cabinet/billing", label: "Оплата и счета", icon: CreditCard },
  { href: "/cabinet/notifications", label: "Уведомления", icon: Bell, badge: 5 },
  { href: "/cabinet/settings", label: "Настройки", icon: Settings },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <nav className="sticky top-20 space-y-1">
              {sidebarNav.map(({ href, label, icon: Icon, badge }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/cabinet" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <Badge className="h-5 min-w-5 justify-center bg-cta text-cta-foreground text-[10px] px-1.5">
                        {badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border mt-4">
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <LogOut className="h-4 w-4" />
                  Выйти
                </button>
              </div>
            </nav>
          </aside>

          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileOpen && (
            <>
              <div
                className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <aside className="fixed bottom-0 left-0 right-0 z-30 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-background border-t border-border p-4 lg:hidden">
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
                <nav className="space-y-1">
                  {sidebarNav.map(({ href, label, icon: Icon, badge }) => {
                    const isActive =
                      pathname === href ||
                      (href !== "/cabinet" && pathname.startsWith(href));
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1">{label}</span>
                        {badge && (
                          <Badge className="h-5 min-w-5 justify-center bg-cta text-cta-foreground text-[10px] px-1.5">
                            {badge}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                      </Link>
                    );
                  })}
                </nav>
              </aside>
            </>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
