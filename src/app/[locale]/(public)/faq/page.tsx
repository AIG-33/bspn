"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/page-header";
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

const faqItems = [
  {
    id: "1",
    category: "registration",
    question: "Какие документы нужны для регистрации ООО в Беларуси?",
    answer:
      "Для регистрации ООО необходимы: заявление установленной формы, устав (в двух экземплярах), документ об оплате госпошлины (0,5 базовой величины), копии паспортов учредителей. Регистрация проводится в местном исполкоме по месту нахождения юридического лица. Срок — 1 рабочий день при подаче полного пакета документов.",
  },
  {
    id: "2",
    category: "registration",
    question: "Можно ли зарегистрировать ИП онлайн?",
    answer:
      "Да, с 2023 года в Беларуси можно зарегистрировать ИП через веб-портал Единого государственного регистра. Для этого необходима электронная цифровая подпись (ЭЦП). Госпошлина составляет 0,5 базовой величины. Срок регистрации — 1 рабочий день.",
  },
  {
    id: "3",
    category: "taxation",
    question: "Какие системы налогообложения доступны для ИП?",
    answer:
      "ИП в Беларуси могут применять: общую систему налогообложения (подоходный налог 20%), упрощённую систему (УСН — 6% от выручки без НДС или 8% с НДС), единый налог (для определённых видов деятельности). Выбор зависит от вида деятельности, объёма выручки и количества работников.",
  },
  {
    id: "4",
    category: "taxation",
    question: "Когда нужно переходить на общую систему налогообложения?",
    answer:
      "Переход на общую систему обязателен при превышении критериев для УСН: выручка более 2 150 000 BYN за календарный год, средняя численность работников более 100 человек. Также общая система обязательна для определённых видов деятельности (страхование, банковская деятельность и др.).",
  },
  {
    id: "5",
    category: "labor",
    question: "Какой максимальный срок трудового договора?",
    answer:
      "Трудовой договор может быть заключён на неопределённый срок, на определённый срок не более 5 лет (контракт), на время выполнения определённой работы, на время выполнения обязанностей временно отсутствующего работника. Контракт (от 1 до 5 лет) — наиболее распространённая форма.",
  },
  {
    id: "6",
    category: "labor",
    question: "Обязательно ли оформлять трудовую книжку?",
    answer:
      "Да, трудовая книжка обязательна для всех работников, проработавших более 5 дней. Работодатель обязан оформить трудовую книжку при первом трудоустройстве работника. С 2025 года параллельно ведётся электронная трудовая книжка.",
  },
  {
    id: "7",
    category: "contracts",
    question: "Какие существенные условия должен содержать договор поставки?",
    answer:
      "Существенные условия договора поставки: наименование и количество товара, сроки поставки. Рекомендуется также включать: цену и порядок расчётов, качество и комплектность, тару и упаковку, ответственность сторон, порядок разрешения споров.",
  },
  {
    id: "8",
    category: "consumer",
    question: "Как защититься от необоснованных претензий потребителей?",
    answer:
      "Основные меры защиты: правильное оформление договора купли-продажи / оказания услуг, наличие акта приёмки с подписью потребителя, фиксация состояния товара при передаче, ведение журнала замечаний, соблюдение сроков ответа на претензии (15 дней). Члены БСПН получают доступ к шаблонам всех необходимых документов.",
  },
  {
    id: "9",
    category: "personal-data",
    question: "Нужно ли регистрировать базу персональных данных?",
    answer:
      "С 15 ноября 2021 года (Закон о защите персональных данных) все операторы обязаны уведомить Национальный центр защиты персональных данных о начале обработки ПД. Регистрация базы не требуется, но необходимо: назначить ответственного, принять политику обработки ПД, получить согласия субъектов.",
  },
  {
    id: "10",
    category: "foreign-trade",
    question: "Какие документы нужны для экспорта товаров из Беларуси?",
    answer:
      "Основные документы: внешнеторговый договор (контракт), товарно-транспортные накладные (CMR для автоперевозок), счёт-фактура (инвойс), упаковочный лист, сертификат происхождения, таможенная декларация. Для определённых товаров могут требоваться дополнительные разрешения и лицензии.",
  },
  {
    id: "11",
    category: "pricing",
    question: "Как формируются цены на социально значимые товары?",
    answer:
      "Цены на социально значимые товары регулируются государством. Перечень утверждается Советом Министров. Для этих товаров устанавливаются предельные торговые надбавки (не более 30%). Нарушение порядка ценообразования влечёт штрафы до 20% от выручки.",
  },
  {
    id: "12",
    category: "digital",
    question: "Нужна ли лицензия для оказания IT-услуг в Беларуси?",
    answer:
      "Для большинства IT-услуг лицензия не требуется. Исключения: деятельность в сфере криптографии, защиты информации, деятельность телеком-операторов. Резиденты ПВТ получают дополнительные преференции: налоговые льготы, упрощённый визовый режим для иностранных сотрудников.",
  },
];

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = faqItems.filter((item) => {
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHeader
        title="Вопросы и ответы"
        description="База знаний для предпринимателей — ответы на самые частые вопросы о ведении бизнеса в Беларуси"
      />
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
    </>
  );
}
