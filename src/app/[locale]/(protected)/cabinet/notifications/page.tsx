"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCircle2,
  CreditCard,
  CalendarDays,
  FileText,
  MessageSquare,
  Scale,
  Megaphone,
  Check,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  type: "payment" | "event" | "document" | "consultation" | "legal" | "announcement";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  payment: { icon: CreditCard, color: "text-cta" },
  event: { icon: CalendarDays, color: "text-gold" },
  document: { icon: FileText, color: "text-success" },
  consultation: { icon: MessageSquare, color: "text-primary" },
  legal: { icon: Scale, color: "text-primary" },
  announcement: { icon: Megaphone, color: "text-gold" },
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Выставлен счёт на членский взнос Q2 2026",
    description: "Сумма: 1 200 BYN. Срок оплаты: 15.04.2026",
    time: "2 часа назад",
    read: false,
  },
  {
    id: "2",
    type: "event",
    title: "Подтверждена регистрация на семинар",
    description: "Семинар «Изменения в ТК 2026» — 15 апреля, 14:00",
    time: "1 день назад",
    read: false,
  },
  {
    id: "3",
    type: "document",
    title: "Новый документ в библиотеке",
    description: "Индекс деловой активности Q1 2026 — доступен для скачивания",
    time: "2 дня назад",
    read: false,
  },
  {
    id: "4",
    type: "legal",
    title: "Изменения в Налоговый кодекс",
    description: "Новые критерии УСН вступают в силу 01.07.2026. Подробности в разделе «Мониторинг»",
    time: "3 дня назад",
    read: false,
  },
  {
    id: "5",
    type: "announcement",
    title: "Открыта регистрация на конференцию «Бизнес-среда 2026»",
    description: "25 апреля, отель «Президент». Для членов БСПН — бесплатно",
    time: "4 дня назад",
    read: false,
  },
  {
    id: "6",
    type: "consultation",
    title: "Напоминание: консультация завтра",
    description: "Ковалёв А.М., НДС при экспорте, 14:00, офис БСПН",
    time: "5 дней назад",
    read: true,
  },
  {
    id: "7",
    type: "document",
    title: "Обновлён шаблон договора поставки",
    description: "Версия 2026 с учётом последних изменений ГК",
    time: "1 неделю назад",
    read: true,
  },
  {
    id: "8",
    type: "event",
    title: "Получен сертификат участника",
    description: "Семинар «Защита персональных данных: практика» — сертификат доступен",
    time: "1 неделю назад",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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
                    {n.description}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
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
