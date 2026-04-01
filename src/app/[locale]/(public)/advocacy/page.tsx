import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Users,
  Building2,
  TrendingDown,
  Scale,
  Megaphone,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";

const directions = [
  {
    icon: TrendingDown,
    title: "Снижение административного давления",
    description:
      "Мониторинг и противодействие избыточным проверкам, упрощение разрешительных процедур, сокращение отчётности",
    results: ["Сокращение проверок на 40%", "Отмена 12 избыточных форм отчётности"],
  },
  {
    icon: FileText,
    title: "Совершенствование законодательства",
    description:
      "Участие в разработке нормативных актов, экспертиза законопроектов, инициирование законодательных изменений",
    results: ["30+ законопроектов с учётом предложений БСПН", "Отмена 5 ограничительных норм"],
  },
  {
    icon: Scale,
    title: "Равные условия конкуренции",
    description:
      "Противодействие монополизации рынков, обеспечение равного доступа к госзакупкам, защита от демпинга",
    results: ["Открытие 8 рынков для малого бизнеса", "Снижение барьеров входа в 3 отраслях"],
  },
  {
    icon: Building2,
    title: "Диалог с государством",
    description:
      "Представительство бизнеса в госорганах, участие в рабочих группах, координационных советах",
    results: ["15+ площадок регулярного диалога", "Еженедельные консультации с МАРТ"],
  },
  {
    icon: Users,
    title: "Защита прав предпринимателей",
    description:
      "Правовая помощь при спорах с госорганами, представительство в судах, досудебное урегулирование",
    results: ["200+ успешных обращений в год", "85% положительных решений"],
  },
  {
    icon: Megaphone,
    title: "Публичная адвокация",
    description:
      "Медиакампании, общественные слушания, публикация позиций бизнес-сообщества по ключевым вопросам",
    results: ["50+ публикаций в год", "Регулярные выступления в СМИ"],
  },
];

const currentInitiatives = [
  {
    title: "Упрощение процедуры ликвидации юридических лиц",
    status: "active" as const,
    deadline: "Q2 2026",
    description:
      "Инициатива по сокращению сроков и упрощению процедуры добровольной ликвидации предприятий с 6 до 2 месяцев.",
  },
  {
    title: "Реформа системы ценообразования",
    status: "discussion" as const,
    deadline: "Q3 2026",
    description:
      "Предложения по либерализации ценообразования и сокращению перечня социально значимых товаров с регулируемыми ценами.",
  },
  {
    title: "Цифровизация разрешительных процедур",
    status: "active" as const,
    deadline: "Q4 2026",
    description:
      "Перевод всех разрешительных процедур в электронный формат через единый портал госуслуг.",
  },
  {
    title: "Поддержка экспортёров",
    status: "completed" as const,
    deadline: "Реализовано",
    description:
      "Расширение инструментов господдержки экспорта, упрощение таможенных процедур для малого бизнеса.",
  },
  {
    title: "Налоговый кодекс — предложения бизнеса",
    status: "discussion" as const,
    deadline: "2026",
    description:
      "Комплексные предложения по изменению Налогового кодекса: упрощение администрирования, снижение ставок для МСП.",
  },
];

const statusMap = {
  active: { label: "Активно", icon: Target, className: "bg-success/10 text-success border-success/20" },
  discussion: { label: "Обсуждение", icon: AlertTriangle, className: "bg-gold/10 text-gold border-gold/20" },
  completed: { label: "Реализовано", icon: CheckCircle2, className: "bg-primary/10 text-primary border-primary/20" },
};

const impactStats = [
  { value: "200+", label: "законодательных инициатив" },
  { value: "87%", label: "учтённых предложений" },
  { value: "15", label: "рабочих групп при госорганах" },
  { value: "1 500+", label: "предприятий получили помощь" },
];

export default function AdvocacyPage() {
  return (
    <>
      <PageHeader
        title="Адвокация и защита интересов бизнеса"
        description="Системная работа по улучшению бизнес-среды — от мониторинга законодательства до прямого диалога с государством"
      />

      {/* Impact Stats */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {impactStats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-heading text-3xl font-bold text-primary">{value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Directions */}
        <h2 className="font-heading text-2xl font-bold">Направления работы</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {directions.map(({ icon: Icon, title, description, results }) => (
            <Card key={title} className="group transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
                <ul className="mt-4 space-y-1.5">
                  {results.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                      <span className="text-muted-foreground">{r}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Initiatives */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Текущие инициативы
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Актуальные проекты по улучшению условий ведения бизнеса
        </p>
        <div className="mt-8 space-y-4">
          {currentInitiatives.map((init) => {
            const st = statusMap[init.status];
            const StatusIcon = st.icon;
            return (
              <Card key={init.title}>
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-sm font-semibold">{init.title}</h3>
                      <Badge className={cn("flex items-center gap-1 border", st.className)}>
                        <StatusIcon className="h-3 w-3" />
                        {st.label}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{init.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3.5 w-3.5" />
                    {init.deadline}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Как мы работаем
        </h2>
        <div className="mt-8 grid gap-px rounded-xl border border-border overflow-hidden bg-border md:grid-cols-4">
          {[
            { step: "01", title: "Мониторинг", text: "Отслеживаем изменения в законодательстве и их влияние на бизнес" },
            { step: "02", title: "Анализ", text: "Собираем мнения предпринимателей и формируем консолидированную позицию" },
            { step: "03", title: "Диалог", text: "Представляем позицию бизнеса в госорганах и на рабочих группах" },
            { step: "04", title: "Результат", text: "Добиваемся принятия решений в интересах бизнес-сообщества" },
          ].map(({ step, title, text }) => (
            <div key={step} className="bg-background p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step}
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Card className="mt-16 border-cta/20 bg-cta/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <BarChart3 className="h-8 w-8 text-cta" />
            <h3 className="font-heading text-xl font-bold">
              Ваш голос имеет значение
            </h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              Присоединяйтесь к БСПН, чтобы ваши интересы были представлены
              на всех уровнях принятия решений
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
