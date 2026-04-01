"use client";

import { useState } from "react";
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
  ChevronRight,
  Shield,
  BarChart3,
  MessageSquare,
  CreditCard,
  Bell,
  Home,
} from "lucide-react";

const adminNav = [
  { section: "Основное", items: [
    { href: "/admin", label: "Дашборд", icon: LayoutDashboard },
    { href: "/admin/members", label: "Члены", icon: Users, badge: 3 },
    { href: "/admin/applications", label: "Заявки", icon: Shield, badge: 5 },
  ]},
  { section: "Контент", items: [
    { href: "/admin/news", label: "Новости", icon: Newspaper },
    { href: "/admin/events", label: "Мероприятия", icon: CalendarDays },
    { href: "/admin/blog", label: "Блог", icon: BookOpen },
    { href: "/admin/documents", label: "Документы", icon: FileText },
  ]},
  { section: "Аналитика", items: [
    { href: "/admin/analytics", label: "Статистика", icon: BarChart3 },
    { href: "/admin/consultations", label: "Консультации", icon: MessageSquare },
    { href: "/admin/billing", label: "Финансы", icon: CreditCard },
  ]},
  { section: "Система", items: [
    { href: "/admin/settings", label: "Настройки", icon: Settings },
  ]},
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <nav className="space-y-6">
      {adminNav.map(({ section, items }) => (
        <div key={section}>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {section}
          </p>
          <div className="mt-2 space-y-0.5">
            {items.map(({ href, label, icon: Icon, badge }) => {
              const isActive =
                pathname === href ||
                (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <Badge className={cn(
                      "h-5 min-w-5 justify-center text-[10px] px-1.5",
                      isActive
                        ? "bg-white/20 text-primary-foreground"
                        : "bg-cta text-cta-foreground"
                    )}>
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
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-muted/30">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-heading text-sm font-bold">БСПН Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {sidebarContent}
        </div>
        <div className="border-t border-border p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            <Home className="h-4 w-4" />
            На сайт
          </Link>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-heading text-sm font-bold">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border p-3 overflow-y-auto lg:hidden">
              <div className="flex h-10 items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-heading text-sm font-bold">БСПН Admin</span>
              </div>
              {sidebarContent}
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
