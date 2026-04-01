"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/supabase/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  HelpCircle,
  Building2,
  Receipt,
  Briefcase,
  FileText,
  ShieldCheck,
  Database,
  Globe,
  Calculator,
  Monitor,
} from "lucide-react";

const categories = [
  { id: "all", label: "Все", icon: HelpCircle },
  { id: "registration", label: "Регистрация бизнеса", icon: Building2 },
  { id: "taxation", label: "Налогообложение", icon: Receipt },
  { id: "labor", label: "Трудовое право", icon: Briefcase },
  { id: "contracts", label: "Договорное право", icon: FileText },
  { id: "consumer", label: "Защита прав потребителей", icon: ShieldCheck },
  { id: "personal-data", label: "Персональные данные", icon: Database },
  { id: "foreign-trade", label: "ВЭД", icon: Globe },
  { id: "pricing", label: "Ценообразование", icon: Calculator },
  { id: "digital", label: "Цифровизация", icon: Monitor },
];

export function FaqClient({ initialData }: { initialData: FaqItem[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = initialData.filter((item) => {
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Search */}
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по вопросам..."
            className="h-12 pl-10 text-base"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {categories.map(({ id, label, icon: Icon }) => (
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

      {/* Results count */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "вопрос" : filtered.length < 5 ? "вопроса" : "вопросов"}
      </p>

      {/* FAQ Items */}
      <div className="mx-auto mt-8 max-w-3xl">
        <Accordion className="space-y-3">
          {filtered.map((item) => {
            const cat = categories.find((c) => c.id === item.category);
            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-xl border border-border px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="py-4 text-left font-heading text-sm font-semibold hover:no-underline sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {cat?.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">
                      Полезно?
                    </span>
                    <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-success transition-colors">
                      <ThumbsUp className="h-3.5 w-3.5" /> Да
                    </button>
                    <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-cta transition-colors">
                      <ThumbsDown className="h-3.5 w-3.5" /> Нет
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-4 text-muted-foreground">Вопросы не найдены</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <Card className="mx-auto mt-16 max-w-3xl border-primary/20 bg-primary/5">
        <CardContent className="p-6 text-center sm:p-8">
          <h3 className="font-heading text-xl font-bold">
            Нужна более детальная помощь?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Вступите в БСПН для индивидуальных консультаций с нашими экспертами
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
            <Button variant="outline" size="lg" className="rounded-xl">
              Задать свой вопрос
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
