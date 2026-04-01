"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Users,
  TrendingUp,
  CreditCard,
  CalendarDays,
  FileText,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";

const kpis = [
  { label: "Всего членов", value: "347", change: "+12", trend: "up" as const, icon: Users },
  { label: "Новые заявки", value: "5", change: "+2", trend: "up" as const, icon: Shield },
  { label: "Доход (Q1)", value: "128K BYN", change: "+8%", trend: "up" as const, icon: CreditCard },
  { label: "Мероприятий в апреле", value: "6", change: "0", trend: "neutral" as const, icon: CalendarDays },
  { label: "Консультаций (март)", value: "89", change: "+15%", trend: "up" as const, icon: MessageSquare },
  { label: "Просмотры сайта", value: "24.5K", change: "+22%", trend: "up" as const, icon: Eye },
];

const recentApplications = [
  { company: "ООО «ИнноТех»", type: "Полное членство", date: "31.03.2026", status: "new" },
  { company: "ИП Козловский А.В.", type: "Ассоциированное", date: "30.03.2026", status: "new" },
  { company: "ЗАО «БелПромСтрой»", type: "Полное членство", date: "29.03.2026", status: "review" },
  { company: "ООО «Логистик Плюс»", type: "Солидарное", date: "28.03.2026", status: "new" },
  { company: "ЧУП «ЭкоФарм»", type: "Ассоциированное", date: "27.03.2026", status: "approved" },
];

const recentActivity = [
  { action: "Опубликована новость", detail: "«Указ №78 о поддержке МСП»", time: "15 мин назад", user: "Админ" },
  { action: "Новый член", detail: "ООО «СтройИнвест» — полное членство", time: "2 ч назад", user: "Система" },
  { action: "Создано мероприятие", detail: "Вебинар «Защита ПД» — 10.04", time: "3 ч назад", user: "Петрова Е." },
  { action: "Счёт оплачен", detail: "ООО «ТехноСтар» — Q2 2026", time: "5 ч назад", user: "Система" },
  { action: "Консультация завершена", detail: "Ковалёв А.М. → ООО «Мега»", time: "вчера", user: "Ковалёв А." },
];

const appStatus: Record<string, { label: string; className: string }> = {
  new: { label: "Новая", className: "bg-cta/10 text-cta border-cta/20" },
  review: { label: "На рассмотрении", className: "bg-gold/10 text-gold border-gold/20" },
  approved: { label: "Одобрена", className: "bg-success/10 text-success border-success/20" },
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Панель управления</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Обзор ключевых метрик БСПН
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map(({ label, value, change, trend, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="mt-2 font-heading text-xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{label}</p>
              {change !== "0" && (
                <span className={cn(
                  "mt-1 inline-flex items-center text-[10px] font-medium",
                  trend === "up" ? "text-success" : "text-destructive"
                )}>
                  {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {change}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Applications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Последние заявки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentApplications.map((app) => {
              const st = appStatus[app.status];
              return (
                <div key={app.company} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{app.company}</p>
                    <p className="text-xs text-muted-foreground">{app.type} · {app.date}</p>
                  </div>
                  <Badge className={cn("border text-[10px] shrink-0", st.className)}>
                    {st.label}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Последние действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-2">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{act.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{act.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground">{act.time}</p>
                  <p className="text-[10px] text-muted-foreground">{act.user}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
