"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockNews = [
  {
    id: 1,
    title: "БСПН принял участие в обсуждении изменений налогового законодательства",
    category: "Законодательство",
    date: "28 марта 2026",
    slug: "/news/1",
  },
  {
    id: 2,
    title: "Итоги заседания Республиканского Клуба Директоров",
    category: "Мероприятия",
    date: "25 марта 2026",
    slug: "/news/2",
  },
  {
    id: 3,
    title: "Новые шаблоны документов по защите персональных данных",
    category: "Для членов",
    date: "20 марта 2026",
    slug: "/news/3",
  },
];

const mockEvents = [
  {
    id: 1,
    title: "Семинар: Изменения в трудовом законодательстве 2026",
    date: "15 апреля 2026",
    location: "Минск, ул. Фабричная 22",
    slug: "/events/1",
  },
  {
    id: 2,
    title: "Заседание РКД: Цифровая трансформация бизнеса",
    date: "22 апреля 2026",
    location: "Минск, Бизнес-центр «Столица»",
    slug: "/events/2",
  },
];

export function NewsPreview() {
  const t = useTranslations("news");

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* News */}
          <div className="lg:col-span-3">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("title")}
              </h2>
              <Link
                href="/news"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                {t("viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {mockNews.map((item) => (
                <Link key={item.id} href={item.slug}>
                  <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
                    <CardContent className="flex items-start justify-between gap-4 p-5">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {item.category}
                        </Badge>
                        <h3 className="font-heading text-sm font-semibold leading-snug sm:text-base">
                          {item.title}
                        </h3>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <Link
              href="/news"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline sm:hidden"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Events */}
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("events")}
              </h2>
              <Link
                href="/events"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                {t("viewAllEvents")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {mockEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border-primary/10 bg-primary/5"
                >
                  <CardContent className="p-5">
                    <h3 className="font-heading text-sm font-semibold leading-snug">
                      {event.title}
                    </h3>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </div>
                    </div>
                    <Link
                      href={event.slug}
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {t("register")}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
