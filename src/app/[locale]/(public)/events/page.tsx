"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  CalendarDays,
  Video,
  Building2,
  Mic2,
  GraduationCap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from "lucide-react";

type EventType = "conference" | "seminar" | "webinar" | "mission" | "club" | "training";

interface EventItem {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  speakers: number;
  seats: number;
  seatsLeft: number;
  price: string;
  description: string;
  tags: string[];
}

const eventTypes: Record<EventType, { label: string; icon: React.ElementType; color: string }> = {
  conference: { label: "Конференция", icon: Mic2, color: "bg-primary/10 text-primary border-primary/20" },
  seminar: { label: "Семинар", icon: GraduationCap, color: "bg-gold/10 text-gold border-gold/20" },
  webinar: { label: "Вебинар", icon: Video, color: "bg-success/10 text-success border-success/20" },
  mission: { label: "Бизнес-миссия", icon: Globe, color: "bg-cta/10 text-cta border-cta/20" },
  club: { label: "Клуб Директоров", icon: Building2, color: "bg-primary/10 text-primary border-primary/20" },
  training: { label: "Тренинг", icon: GraduationCap, color: "bg-gold/10 text-gold border-gold/20" },
};

const events: EventItem[] = [
  {
    id: "1",
    title: "Ежегодная конференция БСПН «Бизнес-среда 2026»",
    type: "conference",
    date: "2026-04-25",
    time: "10:00–18:00",
    location: "Минск, отель «Президент», зал «Беларусь»",
    isOnline: false,
    speakers: 25,
    seats: 500,
    seatsLeft: 87,
    price: "Бесплатно для членов",
    description:
      "Главное деловое событие года: стратегические сессии, панельные дискуссии с участием представителей государства, нетворкинг. Темы: налоговая реформа, цифровизация, экспорт.",
    tags: ["Стратегия", "Налоги", "Цифровизация"],
  },
  {
    id: "2",
    title: "Семинар «Изменения в Трудовом кодексе — 2026»",
    type: "seminar",
    date: "2026-04-15",
    time: "14:00–17:00",
    location: "Минск, офис БСПН",
    isOnline: true,
    speakers: 3,
    seats: 80,
    seatsLeft: 34,
    price: "Бесплатно для членов",
    description:
      "Практический разбор новых норм о дистанционной работе, увольнении по контракту, гарантий для работающих родителей. Раздаточный материал с шаблонами документов.",
    tags: ["Трудовое право", "Кадры"],
  },
  {
    id: "3",
    title: "Бизнес-миссия в Стамбул",
    type: "mission",
    date: "2026-05-15",
    time: "3 дня",
    location: "Стамбул, Турция",
    isOnline: false,
    speakers: 0,
    seats: 30,
    seatsLeft: 12,
    price: "от 1 200 BYN",
    description:
      "B2B-встречи с турецкими компаниями, посещение промышленных предприятий, участие в Белорусско-турецком бизнес-форуме. Полное организационное сопровождение БСПН.",
    tags: ["Экспорт", "Турция", "B2B"],
  },
  {
    id: "4",
    title: "Вебинар «Защита ПД: проверки НЦЗПД в 2026»",
    type: "webinar",
    date: "2026-04-10",
    time: "11:00–12:30",
    location: "Онлайн (Zoom)",
    isOnline: true,
    speakers: 2,
    seats: 200,
    seatsLeft: 143,
    price: "Бесплатно",
    description:
      "Как подготовиться к проверке Национального центра защиты персональных данных: чек-лист, типичные нарушения, ответы на вопросы.",
    tags: ["Персональные данные", "Комплаенс"],
  },
  {
    id: "5",
    title: "Заседание Республиканского Клуба Директоров",
    type: "club",
    date: "2026-04-18",
    time: "18:00–21:00",
    location: "Минск, ресторан «Усадьба»",
    isOnline: false,
    speakers: 1,
    seats: 40,
    seatsLeft: 8,
    price: "Только для членов клуба",
    description:
      "Тема: «Стратегии роста в условиях неопределённости». Спикер — Алексей Романчук, партнёр БСПН. Деловой ужин и нетворкинг.",
    tags: ["Стратегия", "Нетворкинг"],
  },
  {
    id: "6",
    title: "Тренинг «Переговоры и медиация в бизнес-спорах»",
    type: "training",
    date: "2026-04-22",
    time: "10:00–17:00",
    location: "Минск, офис БСПН",
    isOnline: false,
    speakers: 2,
    seats: 25,
    seatsLeft: 6,
    price: "150 BYN / бесплатно для членов",
    description:
      "Интерактивный тренинг: техники переговоров, досудебное урегулирование, ролевые игры на реальных кейсах. Сертификат участника.",
    tags: ["Навыки", "Медиация", "Практикум"],
  },
];

const filterTabs = [
  { id: "all", label: "Все" },
  { id: "upcoming", label: "Ближайшие" },
  { id: "free", label: "Бесплатные" },
  { id: "online", label: "Онлайн" },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeType, setActiveType] = useState<EventType | "all">("all");

  const filtered = events.filter((ev) => {
    const matchType = activeType === "all" || ev.type === activeType;
    const matchTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && new Date(ev.date) >= new Date()) ||
      (activeTab === "free" && ev.price.toLowerCase().includes("бесплатно")) ||
      (activeTab === "online" && ev.isOnline);
    return matchType && matchTab;
  });

  return (
    <>
      <PageHeader
        title="Мероприятия"
        description="Конференции, семинары, тренинги и бизнес-миссии — расширяйте связи и знания вместе с БСПН"
      />

      {/* Quick Stats */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: "120+", label: "мероприятий в год" },
            { value: "5 000+", label: "участников ежегодно" },
            { value: "85%", label: "бесплатно для членов" },
            { value: "30+", label: "спикеров-экспертов" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">{value}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {filterTabs.map(({ id, label }) => (
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
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveType("all")}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs transition-colors",
                activeType === "all"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              Все типы
            </button>
            {(Object.entries(eventTypes) as [EventType, typeof eventTypes[EventType]][]).map(
              ([key, { label, icon: Icon }]) => (
                <button
                  key={key}
                  onClick={() => setActiveType(activeType === key ? "all" : key)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors",
                    activeType === key
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filtered.map((ev) => {
            const typeConfig = eventTypes[ev.type];
            const TypeIcon = typeConfig.icon;
            const seatPercentage = ((ev.seats - ev.seatsLeft) / ev.seats) * 100;
            const isAlmostFull = ev.seatsLeft <= 10;

            return (
              <Card key={ev.id} className="group flex flex-col transition-shadow hover:shadow-lg">
                <CardContent className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <Badge className={cn("flex items-center gap-1 border text-xs", typeConfig.color)}>
                      <TypeIcon className="h-3 w-3" />
                      {typeConfig.label}
                    </Badge>
                    {ev.isOnline && (
                      <Badge variant="secondary" className="text-xs">
                        <Video className="mr-1 h-3 w-3" />
                        Онлайн
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-3 font-heading text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                    {ev.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                    {ev.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {new Date(ev.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {ev.location}
                    </span>
                  </div>

                  {ev.speakers > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {ev.speakers} {ev.speakers === 1 ? "спикер" : ev.speakers < 5 ? "спикера" : "спикеров"}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ev.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Seats Bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={cn("font-medium", isAlmostFull && "text-cta")}>
                        {isAlmostFull ? `Осталось ${ev.seatsLeft} мест!` : `${ev.seatsLeft} мест свободно`}
                      </span>
                      <span className="text-muted-foreground">{ev.price}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          isAlmostFull ? "bg-cta" : "bg-primary"
                        )}
                        style={{ width: `${seatPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Button className="mt-4 bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl" size="sm">
                    <Ticket className="mr-1.5 h-3.5 w-3.5" />
                    Зарегистрироваться
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-4 text-muted-foreground">Мероприятия не найдены</p>
          </div>
        )}

        {/* Calendar CTA */}
        <Card className="mt-16 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <CalendarDays className="h-8 w-8 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              Не пропустите важные мероприятия
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Члены БСПН получают приоритетную регистрацию и бесплатный доступ к 85% мероприятий
            </p>
            <Link
              href="/membership/join"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl"
              )}
            >
              Вступить в БСПН
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
