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
  User,
  BookOpen,
  TrendingUp,
  FileText,
  BarChart3,
  Scale,
  Shield,
  Globe,
  Lightbulb,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
}

const blogCategories = [
  { id: "all", label: "Все", icon: BookOpen },
  { id: "tax", label: "Налоги", icon: FileText },
  { id: "analytics", label: "Аналитика", icon: BarChart3 },
  { id: "law", label: "Право", icon: Scale },
  { id: "management", label: "Управление", icon: Lightbulb },
  { id: "export", label: "Экспорт", icon: Globe },
  { id: "compliance", label: "Комплаенс", icon: Shield },
];

const posts: BlogPost[] = [
  {
    id: "1",
    title: "Налоговая оптимизация 2026: легальные инструменты для белорусского бизнеса",
    excerpt:
      "Обзор актуальных способов оптимизации налоговой нагрузки в рамках действующего законодательства. Анализ изменений НК, рекомендации для ИП и юрлиц, примеры расчётов.",
    author: "Ковалёв Андрей",
    authorRole: "Партнёр, налоговый консультант",
    category: "tax",
    date: "2026-03-25",
    readTime: "12 мин",
    featured: true,
  },
  {
    id: "2",
    title: "Индекс деловой активности Q1 2026: рост на фоне неопределённости",
    excerpt:
      "Комплексный анализ деловой активности в Беларуси по итогам первого квартала. Секторальный обзор, прогнозы экспертов, рекомендации для стратегического планирования.",
    author: "Аналитический центр БСПН",
    authorRole: "Исследовательский отдел",
    category: "analytics",
    date: "2026-03-20",
    readTime: "15 мин",
    featured: true,
  },
  {
    id: "3",
    title: "Дистанционная работа: новые правила ТК и практика применения",
    excerpt:
      "С 1 июня 2026 года вступают в силу новые нормы о дистанционной работе. Разбираем ключевые изменения, обязанности работодателя и шаблоны документов.",
    author: "Петрова Елена",
    authorRole: "Старший юрист, трудовое право",
    category: "law",
    date: "2026-03-15",
    readTime: "8 мин",
    featured: false,
  },
  {
    id: "4",
    title: "5 ошибок при выходе на рынок ЕАЭС и как их избежать",
    excerpt:
      "На основе опыта 200+ белорусских экспортёров выделили типичные ошибки при экспансии на рынки России, Казахстана и других стран ЕАЭС. Практические кейсы и чек-листы.",
    author: "Мельников Павел",
    authorRole: "Юрист-международник",
    category: "export",
    date: "2026-03-10",
    readTime: "10 мин",
    featured: false,
  },
  {
    id: "5",
    title: "ESG-повестка для белорусского бизнеса: зачем и как начать",
    excerpt:
      "Экологическая, социальная и управленческая ответственность — тренд, который уже влияет на доступ к международным рынкам и финансированию. Пошаговое руководство.",
    author: "Романчук Алексей",
    authorRole: "Партнёр, стратегический консалтинг",
    category: "management",
    date: "2026-03-05",
    readTime: "9 мин",
    featured: false,
  },
  {
    id: "6",
    title: "GDPR vs белорусский Закон о ПД: сравнительный анализ",
    excerpt:
      "Для компаний, работающих с европейскими контрагентами, важно понимать отличия. Сравниваем требования, штрафы, права субъектов и практику применения.",
    author: "Козлова Марина",
    authorRole: "Юрист, защита ПД",
    category: "compliance",
    date: "2026-02-28",
    readTime: "11 мин",
    featured: false,
  },
  {
    id: "7",
    title: "Как привлечь иностранные инвестиции: опыт членов БСПН",
    excerpt:
      "Три истории успеха белорусских компаний, которые привлекли зарубежных инвесторов. Подготовка, переговоры, юридическое оформление — всё из первых рук.",
    author: "Сидоренко Игорь",
    authorRole: "Адвокат, к.ю.н.",
    category: "export",
    date: "2026-02-20",
    readTime: "14 мин",
    featured: false,
  },
  {
    id: "8",
    title: "Антикризисное управление: инструменты для среднего бизнеса",
    excerpt:
      "Практическое руководство по финансовому оздоровлению, реструктуризации и антикризисным коммуникациям. Основано на опыте сопровождения 50+ компаний.",
    author: "Романчук Алексей",
    authorRole: "Партнёр, стратегический консалтинг",
    category: "management",
    date: "2026-02-15",
    readTime: "13 мин",
    featured: false,
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = posts.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        title="Блог"
        description="Экспертные статьи, аналитика и практические руководства от специалистов БСПН"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Search + Categories */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск статей..."
              className="h-11 pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/30"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((post) => (
              <Card key={post.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="h-44 bg-gradient-to-br from-primary/10 via-primary/5 to-cta/5 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/20" />
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="text-xs">
                    {blogCategories.find((c) => c.id === post.category)?.label}
                  </Badge>
                  <h3 className="mt-2 font-heading text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">{post.author}</p>
                        <p className="text-[10px] text-muted-foreground">{post.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Regular Posts */}
        <div className="mt-8 space-y-4">
          {regular.map((post) => (
            <Card key={post.id} className="group transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 p-5">
                <div className="hidden sm:flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <BookOpen className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary" className="text-xs">
                    {blogCategories.find((c) => c.id === post.category)?.label}
                  </Badge>
                  <h3 className="mt-1.5 font-heading text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-4 text-muted-foreground">Статьи не найдены</p>
          </div>
        )}

        {/* CTA */}
        <Card className="mt-16 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              Станьте автором блога БСПН
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Делитесь экспертизой с деловым сообществом. Мы публикуем авторские
              статьи членов БСПН и партнёров.
            </p>
            <Link
              href="/contacts"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl"
              )}
            >
              Предложить статью
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
