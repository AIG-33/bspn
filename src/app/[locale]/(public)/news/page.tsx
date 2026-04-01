"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  Tag,
  Newspaper,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  views: number;
  featured: boolean;
  image?: string;
}

const newsCategories = [
  { id: "all", label: "Все" },
  { id: "legislation", label: "Законодательство" },
  { id: "events", label: "Мероприятия" },
  { id: "membership", label: "Членство" },
  { id: "international", label: "Международные связи" },
  { id: "analytics", label: "Аналитика" },
  { id: "awards", label: "Достижения" },
];

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "БСПН добился снижения административной нагрузки на бизнес: подписан Указ №78",
    excerpt:
      "По итогам многомесячной работы экспертов БСПН с Администрацией Президента и Советом Министров подписан Указ о поддержке малого бизнеса. Документ предусматривает расширение программ льготного кредитования и упрощение отчётности.",
    category: "legislation",
    date: "2026-03-28",
    readTime: "5 мин",
    views: 3420,
    featured: true,
  },
  {
    id: "2",
    title: "Итоги Белорусско-китайского бизнес-форума: 12 новых соглашений",
    excerpt:
      "В рамках форума подписано 12 соглашений о сотрудничестве между белорусскими и китайскими компаниями на общую сумму более $45 млн. БСПН организовал 80+ B2B-встреч для участников.",
    category: "international",
    date: "2026-03-22",
    readTime: "4 мин",
    views: 2180,
    featured: true,
  },
  {
    id: "3",
    title: "Новые критерии для применения УСН: что изменится с 1 июля",
    excerpt:
      "Анализ изменений в Налоговый кодекс, которые вступят в силу с 1 июля 2026 года. Эксперты БСПН подготовили разъяснения по новым критериям и рекомендации для предпринимателей.",
    category: "legislation",
    date: "2026-03-18",
    readTime: "7 мин",
    views: 5640,
    featured: false,
  },
  {
    id: "4",
    title: "БСПН принял 45 новых членов в I квартале 2026 года",
    excerpt:
      "По итогам первого квартала в ряды БСПН вступили 45 новых предприятий из различных отраслей экономики. Общее число членов превысило 350 организаций.",
    category: "membership",
    date: "2026-03-15",
    readTime: "3 мин",
    views: 1230,
    featured: false,
  },
  {
    id: "5",
    title: "Семинар «Защита персональных данных: практика 2026»",
    excerpt:
      "25 марта состоялся семинар для членов БСПН по актуальным вопросам обработки персональных данных. Более 120 участников получили практические рекомендации от экспертов НЦЗПД.",
    category: "events",
    date: "2026-03-12",
    readTime: "3 мин",
    views: 890,
    featured: false,
  },
  {
    id: "6",
    title: "Рейтинг деловой активности регионов: Минская область — лидер",
    excerpt:
      "БСПН опубликовал ежеквартальный рейтинг деловой активности регионов Беларуси. Минская область сохраняет лидерство, Гродненская область показала наибольший рост.",
    category: "analytics",
    date: "2026-03-08",
    readTime: "6 мин",
    views: 2740,
    featured: false,
  },
  {
    id: "7",
    title: "БСПН отмечен наградой МОТ за развитие социального диалога",
    excerpt:
      "Международная организация труда вручила БСПН награду за вклад в развитие социального партнёрства и защиту прав работодателей в Республике Беларусь.",
    category: "awards",
    date: "2026-03-05",
    readTime: "3 мин",
    views: 1870,
    featured: false,
  },
  {
    id: "8",
    title: "Обзор судебной практики по трудовым спорам за 2025 год",
    excerpt:
      "Юридический департамент БСПН подготовил комплексный обзор ключевых решений судов по трудовым спорам с участием работодателей. Выделены основные тенденции и рекомендации.",
    category: "analytics",
    date: "2026-03-01",
    readTime: "10 мин",
    views: 3150,
    featured: false,
  },
  {
    id: "9",
    title: "Открыта регистрация на бизнес-миссию в Турцию",
    excerpt:
      "БСПН приглашает предпринимателей принять участие в бизнес-миссии в Стамбул 15–17 мая 2026. Программа включает B2B-встречи, посещение предприятий и деловой форум.",
    category: "international",
    date: "2026-02-25",
    readTime: "3 мин",
    views: 1560,
    featured: false,
  },
];

export default function NewsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = newsItems.filter((item) => {
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const featured = filtered.filter((n) => n.featured);
  const regular = filtered.filter((n) => !n.featured);

  return (
    <>
      <PageHeader
        title="Новости"
        description="Последние новости БСПН, изменения в законодательстве и события делового сообщества Беларуси"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Search + Categories */}
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

        {/* Featured */}
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
                        {item.readTime}
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

        {/* Regular News */}
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
                      {item.readTime}
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

        {/* Pagination */}
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

        {/* Subscribe CTA */}
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
    </>
  );
}
