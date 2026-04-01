"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Notification } from "@/lib/supabase/types";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/actions/profile";
import {
  Bell,
  CheckCircle2,
  CreditCard,
  CalendarDays,
  FileText,
  MessageSquare,
  Check,
  AlertCircle,
} from "lucide-react";

const typeConfig: Record<
  Notification["type"],
  { icon: React.ElementType; color: string }
> = {
  info: { icon: MessageSquare, color: "text-primary" },
  warning: { icon: AlertCircle, color: "text-gold" },
  success: { icon: CheckCircle2, color: "text-success" },
  event: { icon: CalendarDays, color: "text-gold" },
  document: { icon: FileText, color: "text-success" },
  billing: { icon: CreditCard, color: "text-cta" },
};

function pluralRu(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

function formatRelativeFromCreatedAt(createdAt: string): string {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "—";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "только что";
  if (diffMins < 60) {
    const label = pluralRu(diffMins, ["минуту", "минуты", "минут"]);
    return `${diffMins} ${label} назад`;
  }
  if (diffHours < 24) {
    const label = pluralRu(diffHours, ["час", "часа", "часов"]);
    return `${diffHours} ${label} назад`;
  }
  if (diffDays === 1) return "1 день назад";
  if (diffDays < 7) {
    const label = pluralRu(diffDays, ["день", "дня", "дней"]);
    return `${diffDays} ${label} назад`;
  }
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    const label = pluralRu(weeks, ["неделю", "недели", "недель"]);
    return `${weeks} ${label} назад`;
  }
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export type NotificationsClientProps = {
  initialData: Notification[];
};

export function NotificationsClient({ initialData }: NotificationsClientProps) {
  const [notifications, setNotifications] = useState(initialData);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const markAllRead = async () => {
    const result = await markAllNotificationsRead();
    if (result.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const markRead = async (id: string) => {
    const n = notifications.find((x) => x.id === id);
    if (!n || n.read) return;
    const result = await markNotificationRead(id);
    if (result.success) {
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, read: true } : item))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Уведомления</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} непрочитанных`
              : "Все прочитаны"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button size="sm" variant="outline" onClick={markAllRead} className="h-8 text-xs rounded-lg">
            <Check className="mr-1 h-3 w-3" />
            Прочитать все
          </Button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
            filter === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:border-primary/30"
          )}
        >
          Все ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
            filter === "unread"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:border-primary/30"
          )}
        >
          Непрочитанные ({unreadCount})
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map((n) => {
          const cfg = typeConfig[n.type];
          const Icon = cfg.icon;

          return (
            <Card
              key={n.id}
              className={cn(
                "transition-shadow hover:shadow-sm cursor-pointer",
                !n.read && "border-primary/20 bg-primary/[0.02]"
              )}
              onClick={() => markRead(n.id)}
            >
              <CardContent className="flex items-start gap-3 p-3">
                {!n.read && (
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cta" />
                )}
                {n.read && <div className="mt-1.5 h-2 w-2 shrink-0" />}
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted", cfg.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm truncate", !n.read && "font-semibold")}>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {n.description ?? ""}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {formatRelativeFromCreatedAt(n.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <Bell className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Нет уведомлений</p>
        </div>
      )}
    </div>
  );
}
