"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  Calendar,
  Clock,
  Eye,
  Newspaper,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { NewsItem } from "@/lib/supabase/types";

const newsCategories = [
  { id: "all", label: "Все" },
  { id: "legislation", label: "Законодательство" },
  { id: "events", label: "Мероприятия" },
  { id: "membership", label: "Членство" },
  { id: "international", label: "Международные связи" },
  { id: "analytics", label: "Аналитика" },
  { id: "awards", label: "Достижения" },
];

export function NewsClient({ initialData }: { initialData: NewsItem[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = initialData.filter((item) => {
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.excerpt ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const featured = filtered.filter((n) => n.featured);
  const regular = filtered.filter((n) => !n.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск новостей..."
            className="h-11 pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {newsCategories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/30"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {featured.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((item) => (
            <Card key={item.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
              <div className="h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-cta/10 flex items-center justify-center">
                <Newspaper className="h-16 w-16 text-primary/20" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Badge className="border border-cta/20 bg-cta/10 text-cta text-xs">
                    <Star className="mr-1 h-3 w-3" />
                    Важное
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {newsCategories.find((c) => c.id === item.category)?.label}
                  </Badge>
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {item.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.date).toLocaleDateString("ru-RU")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.read_time}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {item.views.toLocaleString("ru-RU")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 space-y-4">
        {regular.map((item) => (
          <Card key={item.id} className="group transition-shadow hover:shadow-md">
            <CardContent className="flex gap-4 p-5">
              <div className="hidden sm:flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Newspaper className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {newsCategories.find((c) => c.id === item.category)?.label}
                  </Badge>
                </div>
                <h3 className="mt-1.5 font-heading text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {item.excerpt}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString("ru-RU")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.read_time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {item.views.toLocaleString("ru-RU")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Newspaper className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Новости не найдены</p>
        </div>
      )}

      <div className="mt-10 flex items-center justify-center gap-2">
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
              p === 1
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-muted"
            )}
          >
            {p}
          </button>
        ))}
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <Card className="mt-16 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h3 className="font-heading text-xl font-bold">
            Подпишитесь на новости БСПН
          </h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Еженедельная рассылка с главными новостями и аналитикой для бизнеса
          </p>
          <div className="flex w-full max-w-sm gap-2">
            <Input placeholder="Ваш email" className="h-10" />
            <button
              className={cn(
                buttonVariants(),
                "bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl h-10 px-4"
              )}
            >
              Подписаться
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
