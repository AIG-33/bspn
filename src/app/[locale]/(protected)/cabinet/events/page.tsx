"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarDays,
  Video,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Ticket,
  Download,
} from "lucide-react";

type EventStatus = "registered" | "attended" | "cancelled" | "upcoming";

interface UserEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  status: EventStatus;
  certificate?: boolean;
}

const statusConfig: Record<EventStatus, { label: string; icon: React.ElementType; className: string }> = {
  registered: { label: "Зарегистрирован", icon: CheckCircle2, className: "bg-primary/10 text-primary border-primary/20" },
  attended: { label: "Посещено", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  cancelled: { label: "Отменено", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
  upcoming: { label: "Предстоит", icon: Clock, className: "bg-gold/10 text-gold border-gold/20" },
};

const tabs = [
  { id: "upcoming", label: "Предстоящие" },
  { id: "past", label: "Прошедшие" },
  { id: "all", label: "Все" },
];

const userEvents: UserEvent[] = [
  {
    id: "1",
    title: "Семинар «Изменения в Трудовом кодексе — 2026»",
    date: "2026-04-15",
    time: "14:00–17:00",
    location: "Офис БСПН, Минск",
    isOnline: true,
    status: "registered",
  },
  {
    id: "2",
    title: "Заседание Республиканского Клуба Директоров",
    date: "2026-04-18",
    time: "18:00–21:00",
    location: "Ресторан «Усадьба», Минск",
    isOnline: false,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Вебинар «Защита ПД: проверки НЦЗПД»",
    date: "2026-04-10",
    time: "11:00–12:30",
    location: "Онлайн (Zoom)",
    isOnline: true,
    status: "registered",
  },
  {
    id: "4",
    title: "Конференция «Бизнес-среда 2026»",
    date: "2026-04-25",
    time: "10:00–18:00",
    location: "Отель «Президент», Минск",
    isOnline: false,
    status: "registered",
  },
  {
    id: "5",
    title: "Семинар «Защита персональных данных: практика»",
    date: "2026-03-25",
    time: "14:00–17:00",
    location: "Офис БСПН, Минск",
    isOnline: true,
    status: "attended",
    certificate: true,
  },
  {
    id: "6",
    title: "Вебинар «Налоговая оптимизация для ИП»",
    date: "2026-03-12",
    time: "11:00–12:30",
    location: "Онлайн (Zoom)",
    isOnline: true,
    status: "attended",
    certificate: true,
  },
  {
    id: "7",
    title: "Тренинг «Переговоры в бизнесе»",
    date: "2026-02-22",
    time: "10:00–17:00",
    location: "Офис БСПН, Минск",
    isOnline: false,
    status: "cancelled",
  },
  {
    id: "8",
    title: "Бизнес-миссия в Казахстан",
    date: "2026-02-10",
    time: "4 дня",
    location: "Нур-Султан, Казахстан",
    isOnline: false,
    status: "attended",
    certificate: false,
  },
];

export default function CabinetEventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const now = new Date();
  const filtered = userEvents.filter((ev) => {
    if (activeTab === "all") return true;
    const eventDate = new Date(ev.date);
    if (activeTab === "upcoming") return eventDate >= now;
    return eventDate < now;
  });

  const upcomingCount = userEvents.filter((ev) => new Date(ev.date) >= now).length;
  const pastCount = userEvents.filter((ev) => new Date(ev.date) < now).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Мои мероприятия</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Регистрации, посещения и сертификаты
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="font-heading text-2xl font-bold text-primary">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground">Предстоящих</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="font-heading text-2xl font-bold text-success">{pastCount}</div>
            <p className="text-xs text-muted-foreground">Посещено</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="font-heading text-2xl font-bold text-gold">
              {userEvents.filter((e) => e.certificate).length}
            </div>
            <p className="text-xs text-muted-foreground">Сертификатов</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              activeTab === id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/30"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filtered.map((ev) => {
          const st = statusConfig[ev.status];
          const StatusIcon = st.icon;

          return (
            <Card key={ev.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold truncate">{ev.title}</h3>
                    <Badge className={cn("shrink-0 border text-[10px]", st.className)}>
                      <StatusIcon className="mr-0.5 h-3 w-3" />
                      {st.label}
                    </Badge>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(ev.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ev.location}
                    </span>
                    {ev.isOnline && (
                      <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                        <Video className="mr-0.5 h-2.5 w-2.5" />
                        Онлайн
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {ev.certificate && (
                    <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                      <Download className="mr-1 h-3 w-3" />
                      Сертификат
                    </Button>
                  )}
                  {(ev.status === "registered" || ev.status === "upcoming") && (
                    <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg text-destructive border-destructive/20 hover:bg-destructive/10">
                      Отменить
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Мероприятий не найдено</p>
        </div>
      )}
    </div>
  );
}
