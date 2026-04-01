"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  BookOpen,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Calculator,
  FileText,
  Scale,
  Headphones,
  Award,
  Percent,
} from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Защита интересов",
    items: [
      "Представительство в 20+ коллегиальных органах при госорганах",
      "Экспертиза законопроектов до их принятия",
      "Защита прав при проверках и спорах с госорганами",
      "Обращения в госорганы от имени членов союза",
    ],
    color: "text-cta",
    bg: "bg-cta/10",
  },
  {
    icon: BookOpen,
    title: "Знания и экспертиза",
    items: [
      "Бесплатные юридические и экономические консультации",
      "Разъяснения по изменениям законодательства",
      "Шаблоны документов (15+ документов)",
      "Доступ к аналитическим обзорам",
    ],
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: Users,
    title: "Сообщество и нетворкинг",
    items: [
      "Каталог членов по 14 отраслям",
      "Республиканский Клуб Директоров",
      "Мероприятия, конференции, семинары",
      "Деловые контакты и партнёрства",
    ],
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Globe,
    title: "Международные связи",
    items: [
      "Система бизнес-послов в 15+ странах",
      "Участие в бизнес-миссиях",
      "Содействие в выходе на новые рынки",
      "Контакты с международными организациями",
    ],
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const additionalBenefits = [
  {
    icon: FileText,
    title: "Эксклюзивные шаблоны",
    desc: "Договоры, акты, чек-листы — готовые к использованию",
  },
  {
    icon: Scale,
    title: "Судебная поддержка",
    desc: "Разбор кейсов, рекомендации по спорам",
  },
  {
    icon: Headphones,
    title: "Горячая линия",
    desc: "Оперативные консультации по бизнес-вопросам",
  },
  {
    icon: Award,
    title: "Статус и имидж",
    desc: "Использование бренда БСПН для вашей компании",
  },
  {
    icon: Percent,
    title: "Партнёрские скидки",
    desc: "Скидки от партнёров союза на услуги и продукцию",
  },
  {
    icon: Calculator,
    title: "Экономия",
    desc: "Стоимость членства окупается за 1–2 консультации",
  },
];

const comparisonRows = [
  { feature: "Юридические консультации", with: "Бесплатно", without: "от 200 BYN/час" },
  { feature: "Шаблоны документов", with: "15+ готовых", without: "Разработка от 500 BYN" },
  { feature: "Участие в мероприятиях", with: "Бесплатно / скидки", without: "от 100 BYN" },
  { feature: "Представительство в госорганах", with: "✓", without: "✗" },
  { feature: "Каталог экспертов", with: "Полный доступ", without: "Только список" },
  { feature: "Международные контакты", with: "Контакты послов", without: "✗" },
  { feature: "Аналитические обзоры", with: "Полный доступ", without: "✗" },
];

function RoiCalculator() {
  const [consultations, setConsultations] = useState(3);
  const [documents, setDocuments] = useState(2);

  const avgConsultationCost = 250;
  const avgDocumentCost = 400;
  const membershipCost = 500;

  const savings =
    consultations * avgConsultationCost +
    documents * avgDocumentCost -
    membershipCost;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6 sm:p-8">
        <h3 className="font-heading text-xl font-bold flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Калькулятор выгоды
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Рассчитайте, сколько вы сэкономите с членством в БСПН за год
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-sm font-medium">
              Юридических консультаций в год: {consultations}
            </label>
            <input
              type="range"
              min={0}
              max={12}
              value={consultations}
              onChange={(e) => setConsultations(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>12</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Разработок документов в год: {documents}
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={documents}
              onChange={(e) => setDocuments(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>10</span>
            </div>
          </div>

          <div className="rounded-xl bg-background p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  Стоимость без БСПН
                </p>
                <p className="mt-1 font-mono text-lg font-bold">
                  {(
                    consultations * avgConsultationCost +
                    documents * avgDocumentCost
                  ).toLocaleString()}{" "}
                  BYN
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Взнос БСПН (в год)
                </p>
                <p className="mt-1 font-mono text-lg font-bold">
                  {membershipCost} BYN
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ваша экономия</p>
                <p
                  className={cn(
                    "mt-1 font-mono text-lg font-bold",
                    savings > 0 ? "text-success" : "text-muted-foreground"
                  )}
                >
                  {savings > 0 ? "+" : ""}
                  {savings.toLocaleString()} BYN
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BenefitsPage() {
  return (
    <>
      <PageHeader
        title="Преимущества членства"
        description="Членство, которое окупается. Защита, знания, сообщество и международные связи — всё в одном."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* 4 Pillars */}
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, items, color, bg }) => (
            <Card key={title} className="border-border/50">
              <CardContent className="p-6 sm:p-8">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h2 className="font-heading text-xl font-bold">{title}</h2>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            А ещё вы получаете
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additionalBenefits.map(({ icon: Icon, title, desc }) => (
              <Card key={title}>
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mt-16">
          <RoiCalculator />
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            С БСПН vs Без БСПН
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-left font-heading font-semibold">Услуга</th>
                  <th className="px-4 py-3 text-center font-heading font-semibold">
                    <Badge className="bg-success text-success-foreground">С БСПН</Badge>
                  </th>
                  <th className="pl-4 py-3 text-center font-heading font-semibold">
                    <Badge variant="secondary">Без БСПН</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ feature, with: w, without }) => (
                  <tr key={feature} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-muted-foreground">{feature}</td>
                    <td className="px-4 py-3 text-center font-medium text-success">{w}</td>
                    <td className="pl-4 py-3 text-center text-muted-foreground">{without}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-8 text-center text-primary-foreground sm:p-12">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Готовы присоединиться?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-primary-foreground/70">
            Вступительный взнос окупается уже после первой консультации. Станьте
            частью сообщества из 94+ компаний.
          </p>
          <Link
            href="/membership/join"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 bg-cta text-cta-foreground hover:bg-cta/90 text-base px-8 h-12 rounded-xl"
            )}
          >
            Вступить в БСПН
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
