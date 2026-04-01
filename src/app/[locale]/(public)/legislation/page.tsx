import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  FileText,
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Scale,
  BookOpen,
  TrendingUp,
  ExternalLink,
  Info,
  Shield,
  Zap,
} from "lucide-react";

const recentChanges = [
  {
    date: "25.03.2026",
    title: "Изменения в Налоговый кодекс (Закон №147-З)",
    impact: "high" as const,
    category: "Налоги",
    summary:
      "Новые критерии для применения УСН, изменение ставок подоходного налога для ИП, введение налогового мониторинга для крупных предприятий.",
    effectiveDate: "01.07.2026",
  },
  {
    date: "18.03.2026",
    title: "Постановление Совмина №189 о ценообразовании",
    impact: "medium" as const,
    category: "Ценообразование",
    summary:
      "Обновлён перечень социально значимых товаров, изменены предельные торговые надбавки для отдельных категорий продукции.",
    effectiveDate: "01.05.2026",
  },
  {
    date: "10.03.2026",
    title: "Закон о цифровом развитии (Закон №152-З)",
    impact: "medium" as const,
    category: "Цифровизация",
    summary:
      "Регулирование электронных договоров, облачных сервисов, требования к хранению данных на территории РБ.",
    effectiveDate: "01.01.2027",
  },
  {
    date: "01.03.2026",
    title: "Указ №78 о поддержке малого бизнеса",
    impact: "high" as const,
    category: "Поддержка МСП",
    summary:
      "Расширение программ льготного кредитования, снижение арендных ставок для начинающих предпринимателей, упрощение отчётности.",
    effectiveDate: "01.04.2026",
  },
  {
    date: "20.02.2026",
    title: "Изменения в Трудовой кодекс",
    impact: "high" as const,
    category: "Трудовое право",
    summary:
      "Новые нормы о дистанционной работе, изменение порядка увольнения по контракту, расширение гарантий для работающих родителей.",
    effectiveDate: "01.06.2026",
  },
  {
    date: "15.02.2026",
    title: "Постановление МАРТ №45",
    impact: "low" as const,
    category: "Антимонопольное",
    summary:
      "Уточнение критериев доминирующего положения на товарных рынках, изменение порядка рассмотрения дел о недобросовестной конкуренции.",
    effectiveDate: "Вступило в силу",
  },
];

const impactConfig = {
  high: { label: "Высокое влияние", className: "bg-cta/10 text-cta border-cta/20" },
  medium: { label: "Среднее влияние", className: "bg-gold/10 text-gold border-gold/20" },
  low: { label: "Низкое влияние", className: "bg-success/10 text-success border-success/20" },
};

const upcomingChanges = [
  {
    date: "01.07.2026",
    title: "Налоговый кодекс — новая редакция",
    description: "Вступают в силу изменения по УСН, подоходному налогу и налоговому мониторингу",
  },
  {
    date: "01.01.2027",
    title: "Закон о цифровом развитии",
    description: "Новые требования к электронным договорам и хранению данных",
  },
  {
    date: "Q2 2026",
    title: "Экологическое законодательство",
    description: "Планируемые изменения по утилизации и переработке отходов для бизнеса",
  },
  {
    date: "Q3 2026",
    title: "Закон о госзакупках",
    description: "Цифровизация процедур, расширение доступа МСП к госзаказу",
  },
];

const monitoringAreas = [
  { icon: Scale, label: "Налоговое право", count: 47 },
  { icon: FileText, label: "Корпоративное право", count: 32 },
  { icon: Shield, label: "Трудовое право", count: 28 },
  { icon: TrendingUp, label: "Ценообразование", count: 19 },
  { icon: Eye, label: "Лицензирование", count: 15 },
  { icon: BookOpen, label: "Внешнеэкономическая деятельность", count: 23 },
  { icon: Zap, label: "Цифровизация", count: 11 },
  { icon: AlertTriangle, label: "Административное право", count: 14 },
];

const subscriptionBenefits = [
  "Еженедельный дайджест изменений в законодательстве",
  "Анализ влияния на ваш бизнес от экспертов БСПН",
  "Персонализированные уведомления по вашим отраслям",
  "Доступ к базе правовых позиций и разъяснений",
  "Консультации экспертов по применению новых норм",
  "Шаблоны документов с учётом последних изменений",
];

export default function LegislationPage() {
  return (
    <>
      <PageHeader
        title="Мониторинг законодательства"
        description="Актуальные изменения в законодательстве Беларуси, которые влияют на ваш бизнес — анализ, прогнозы, рекомендации"
      />

      {/* Monitoring Areas */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {monitoringAreas.map(({ icon: Icon, label, count }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{label}</span>
                <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Recent Changes */}
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">
            Последние изменения
          </h2>
          <Badge variant="outline" className="text-xs">
            <Bell className="mr-1 h-3 w-3" />
            {recentChanges.length} обновлений
          </Badge>
        </div>

        <div className="mt-8 space-y-4">
          {recentChanges.map((change) => {
            const impact = impactConfig[change.impact];
            return (
              <Card key={change.title} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {change.category}
                        </Badge>
                        <Badge className={cn("border text-xs", impact.className)}>
                          {impact.label}
                        </Badge>
                      </div>
                      <h3 className="mt-2 font-heading text-sm font-semibold">
                        {change.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {change.summary}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {change.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Вступает: {change.effectiveDate}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upcoming */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Ожидаемые изменения
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Что ждать бизнесу в ближайшие месяцы
        </p>
        <div className="mt-8 relative ml-4 border-l-2 border-primary/20 pl-6 space-y-0">
          {upcomingChanges.map((c) => (
            <div key={c.title} className="relative pb-8 last:pb-0">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="text-xs font-semibold text-primary">{c.date}</div>
              <h3 className="mt-1 font-heading text-sm font-semibold">{c.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>

        {/* Subscription Benefits */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold">
              Подписка на мониторинг
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Будьте в курсе всех изменений, которые влияют на ваш бизнес
            </p>
            <ul className="mt-6 space-y-3">
              {subscriptionBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center">
              <Info className="h-8 w-8 text-primary" />
              <h3 className="font-heading text-lg font-bold">
                Бесплатно для членов БСПН
              </h3>
              <p className="text-sm text-muted-foreground">
                Все участники БСПН получают полный доступ к мониторингу
                законодательства и персонализированным уведомлениям
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
      </div>
    </>
  );
}
