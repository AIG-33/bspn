"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  FileText,
  CalendarDays,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Bell,
  User,
  Building2,
  Star,
  ChevronRight,
} from "lucide-react";

const memberInfo = {
  name: "ООО «ТехноСтар»",
  plan: "Полное членство",
  since: "15.03.2024",
  validUntil: "15.03.2027",
  representative: "Иванов Алексей Петрович",
};

const quickStats = [
  { label: "Консультации", value: "3/5", sublabel: "использовано в этом месяце", icon: MessageSquare, color: "text-primary" },
  { label: "Документы", value: "12", sublabel: "в библиотеке", icon: FileText, color: "text-success" },
  { label: "Мероприятия", value: "2", sublabel: "предстоящих", icon: CalendarDays, color: "text-gold" },
  { label: "Экономия", value: "~8 500", sublabel: "BYN за год", icon: TrendingUp, color: "text-cta" },
];

const recentActivity = [
  {
    type: "consultation",
    title: "Консультация по трудовому праву",
    description: "Вопрос о порядке увольнения по контракту",
    date: "28.03.2026",
    status: "completed" as const,
  },
  {
    type: "document",
    title: "Шаблон: Договор подряда",
    description: "Скачан из библиотеки документов",
    date: "25.03.2026",
    status: "completed" as const,
  },
  {
    type: "event",
    title: "Семинар «Изменения в ТК 2026»",
    description: "Регистрация подтверждена",
    date: "15.04.2026",
    status: "upcoming" as const,
  },
  {
    type: "payment",
    title: "Членский взнос Q2 2026",
    description: "Счёт выставлен",
    date: "01.04.2026",
    status: "pending" as const,
  },
  {
    type: "consultation",
    title: "Консультация по НДС при экспорте",
    description: "Запись к эксперту Ковалёву А.М.",
    date: "02.04.2026",
    status: "upcoming" as const,
  },
];

const statusConfig = {
  completed: { label: "Завершено", icon: CheckCircle2, className: "bg-success/10 text-success" },
  upcoming: { label: "Предстоит", icon: Clock, className: "bg-primary/10 text-primary" },
  pending: { label: "Ожидает", icon: AlertCircle, className: "bg-gold/10 text-gold" },
};

const notifications = [
  { text: "Выставлен счёт на членский взнос Q2 2026", time: "2 ч. назад", unread: true },
  { text: "Подтверждена регистрация на семинар 15.04", time: "1 день назад", unread: true },
  { text: "Новый выпуск дайджеста законодательства", time: "2 дня назад", unread: false },
];

export default function CabinetPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Личный кабинет</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Добро пожаловать, {memberInfo.representative}
          </p>
        </div>
        <Card className="border-primary/20 bg-primary/5 sm:w-auto">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{memberInfo.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge className="border border-gold/20 bg-gold/10 text-gold text-[10px] h-4">
                  <Star className="mr-0.5 h-2.5 w-2.5" />
                  {memberInfo.plan}
                </Badge>
                <span>до {memberInfo.validUntil}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map(({ label, value, sublabel, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Icon className={cn("h-5 w-5", color)} />
              </div>
              <div className="mt-2 font-heading text-2xl font-bold">{value}</div>
              <p className="text-xs font-medium">{label}</p>
              <p className="text-[10px] text-muted-foreground">{sublabel}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Последняя активность</CardTitle>
                <Link
                  href="/cabinet/notifications"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Все уведомления
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((item, i) => {
                const st = statusConfig[item.status];
                const StatusIcon = st.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", st.className)}>
                      <StatusIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-4">
          {/* Notifications */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Уведомления
                <Badge className="bg-cta text-cta-foreground text-[10px] h-4 px-1.5">3</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-2">
                  {n.unread && (
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cta" />
                  )}
                  {!n.unread && <div className="mt-1.5 h-2 w-2 shrink-0" />}
                  <div>
                    <p className={cn("text-xs", n.unread && "font-medium")}>{n.text}</p>
                    <p className="text-[10px] text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/cabinet/consultations"
                className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium hover:bg-muted transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-primary" />
                Записаться на консультацию
                <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground" />
              </Link>
              <Link
                href="/cabinet/documents"
                className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium hover:bg-muted transition-colors"
              >
                <FileText className="h-4 w-4 text-success" />
                Открыть библиотеку документов
                <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground" />
              </Link>
              <Link
                href="/cabinet/events"
                className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium hover:bg-muted transition-colors"
              >
                <CalendarDays className="h-4 w-4 text-gold" />
                Мои мероприятия
                <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground" />
              </Link>
              <Link
                href="/cabinet/billing"
                className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium hover:bg-muted transition-colors"
              >
                <CreditCard className="h-4 w-4 text-cta" />
                Оплатить членский взнос
                <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
