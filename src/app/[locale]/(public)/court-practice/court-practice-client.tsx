"use client";

import { useState } from "react";
import type { ElementType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CourtCase } from "@/lib/supabase/types";
import {
  Search,
  Scale,
  Calendar,
  ArrowRight,
  BookOpen,
  Filter,
  TrendingUp,
  Award,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

type CaseStatus = "won" | "lost" | "partial" | "pending";

const caseCategories = [
  { id: "all", label: "Все дела" },
  { id: "tax", label: "Налоговые споры" },
  { id: "contract", label: "Договорные споры" },
  { id: "labor", label: "Трудовые споры" },
  { id: "property", label: "Имущественные споры" },
  { id: "admin", label: "Административные" },
  { id: "antimonopoly", label: "Антимонопольные" },
];

const statusConfig: Record<CaseStatus, { label: string; icon: ElementType; className: string }> = {
  won: { label: "Выиграно", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  lost: { label: "Проиграно", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
  partial: { label: "Частично", icon: Scale, className: "bg-gold/10 text-gold border-gold/20" },
  pending: { label: "В процессе", icon: Clock, className: "bg-primary/10 text-primary border-primary/20" },
};

const stats = [
  { label: "Дел рассмотрено", value: "850+", icon: Scale },
  { label: "Процент побед", value: "87%", icon: TrendingUp },
  { label: "Сохранено клиентам", value: "12M+ BYN", icon: Award },
  { label: "Лет практики", value: "15+", icon: BookOpen },
];

export function CourtPracticeClient({ initialData }: { initialData: CourtCase[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState<CaseStatus | "all">("all");

  const filtered = initialData.filter((c) => {
    const desc = c.description ?? "";
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = activeCategory === "all" || c.category === activeCategory;
    const matchStatus = activeStatus === "all" || c.status === activeStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <>
      {/* Stats */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto h-6 w-6 text-primary" />
              <div className="mt-2 font-heading text-2xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Search + Filter */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по делам..."
              className="h-11 pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(Object.entries(statusConfig) as [CaseStatus, (typeof statusConfig)[CaseStatus]][]).map(
              ([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setActiveStatus(activeStatus === key ? "all" : key)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                    activeStatus === key ? cfg.className : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  <cfg.icon className="h-3 w-3" />
                  {cfg.label}
                </button>
              )
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {caseCategories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/30"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cases */}
        <div className="mt-8 space-y-4">
          {filtered.map((c) => {
            const st = statusConfig[c.status];
            const StatusIcon = st.icon;
            return (
              <Card key={c.id} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold leading-snug">
                        {c.title}
                      </CardTitle>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(c.date).toLocaleDateString("ru-RU")}
                        </span>
                        <span>·</span>
                        <span>{c.court}</span>
                      </div>
                    </div>
                    <Badge className={cn("flex items-center gap-1 border", st.className)}>
                      <StatusIcon className="h-3 w-3" />
                      {st.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                  {c.amount && (
                    <div className="mt-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-success" />
                      <span className="text-sm font-semibold text-success">
                        {c.amount}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Scale className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-4 text-muted-foreground">
                Дела не найдены
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <Card className="mt-16 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <Scale className="h-8 w-8 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              Нужна юридическая защита?
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Наши юристы имеют 15+ лет опыта в защите бизнеса.
              Члены БСПН получают приоритетное юридическое сопровождение.
            </p>
            <Link
              href="/membership/join"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl"
              )}
            >
              Получить консультацию
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
