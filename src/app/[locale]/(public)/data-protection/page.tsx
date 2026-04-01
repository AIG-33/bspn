import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Database,
  ShieldCheck,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Eye,
  Server,
  Key,
  UserCheck,
  FileWarning,
  Clock,
  Target,
  BookOpen,
  Fingerprint,
  ScrollText,
} from "lucide-react";

const keyRequirements = [
  {
    icon: UserCheck,
    title: "Согласие субъекта",
    description:
      "Получение информированного согласия физического лица на обработку его персональных данных в письменной или иной форме",
    status: "required",
  },
  {
    icon: ScrollText,
    title: "Политика обработки ПД",
    description:
      "Разработка и публикация документа, определяющего цели, правовые основания, порядок обработки и защиты персональных данных",
    status: "required",
  },
  {
    icon: Users,
    title: "Назначение ответственного",
    description:
      "Определение должностного лица, ответственного за обработку персональных данных (DPO), и уведомление регулятора",
    status: "required",
  },
  {
    icon: Server,
    title: "Уведомление НЦЗПД",
    description:
      "Направление уведомления в Национальный центр защиты персональных данных до начала обработки ПД",
    status: "required",
  },
  {
    icon: Lock,
    title: "Технические меры защиты",
    description:
      "Внедрение организационных и технических мер обеспечения безопасности при обработке персональных данных",
    status: "required",
  },
  {
    icon: Eye,
    title: "Права субъектов",
    description:
      "Обеспечение права на доступ, исправление, удаление, ограничение обработки и отзыв согласия",
    status: "required",
  },
];

const services = [
  {
    icon: Target,
    title: "Аудит соответствия",
    description:
      "Комплексная проверка текущего состояния обработки ПД, выявление несоответствий, составление плана устранения",
    duration: "5–10 рабочих дней",
  },
  {
    icon: FileText,
    title: "Разработка документации",
    description:
      "Политика обработки ПД, согласия, договоры поручения обработки, регламенты, инструкции для персонала",
    duration: "10–15 рабочих дней",
  },
  {
    icon: BookOpen,
    title: "Обучение персонала",
    description:
      "Тренинги для сотрудников по правилам обработки ПД, ответственности, реагированию на инциденты",
    duration: "1–2 дня",
  },
  {
    icon: ShieldCheck,
    title: "Сопровождение проверок",
    description:
      "Представительство при проверках НЦЗПД, подготовка ответов на запросы регулятора, обжалование предписаний",
    duration: "По необходимости",
  },
  {
    icon: AlertTriangle,
    title: "Реагирование на инциденты",
    description:
      "Юридическое сопровождение при утечках данных: уведомление регулятора и субъектов, минимизация последствий",
    duration: "24/7",
  },
  {
    icon: Key,
    title: "Трансграничная передача",
    description:
      "Правовое обеспечение передачи ПД за пределы Республики Беларусь, в том числе в рамках ЕАЭС и третьих стран",
    duration: "5–7 рабочих дней",
  },
];

const penalties = [
  {
    violation: "Обработка ПД без правового основания",
    fine: "до 100 базовых величин",
    risk: "high",
  },
  {
    violation: "Отсутствие политики обработки ПД",
    fine: "до 50 базовых величин",
    risk: "high",
  },
  {
    violation: "Не уведомлен НЦЗПД",
    fine: "до 50 базовых величин",
    risk: "medium",
  },
  {
    violation: "Нарушение прав субъекта ПД",
    fine: "до 100 базовых величин",
    risk: "high",
  },
  {
    violation: "Отсутствие технических мер защиты",
    fine: "до 50 базовых величин",
    risk: "medium",
  },
  {
    violation: "Несвоевременное уведомление об инциденте",
    fine: "до 20 базовых величин",
    risk: "low",
  },
];

const riskColors: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-gold/10 text-gold border-gold/20",
  low: "bg-success/10 text-success border-success/20",
};

const riskLabels: Record<string, string> = {
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
};

const timeline = [
  {
    date: "15.11.2021",
    title: "Закон о защите ПД",
    description: "Вступил в силу Закон Республики Беларусь «О защите персональных данных»",
  },
  {
    date: "01.01.2023",
    title: "Обязательное уведомление",
    description: "Обязанность уведомления НЦЗПД о начале обработки персональных данных",
  },
  {
    date: "01.07.2024",
    title: "Усиление ответственности",
    description: "Увеличены штрафы за нарушения в сфере обработки персональных данных",
  },
  {
    date: "2025–2026",
    title: "Новые стандарты",
    description: "Ожидается принятие стандартов по информационной безопасности ПД",
  },
];

export default function DataProtectionPage() {
  return (
    <>
      <PageHeader
        title="Защита персональных данных"
        description="Полное юридическое сопровождение в сфере обработки и защиты персональных данных — от аудита до реагирования на инциденты"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Key Requirements */}
        <h2 className="font-heading text-2xl font-bold">
          Обязательные требования закона
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Каждое предприятие, обрабатывающее персональные данные, обязано выполнить
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {keyRequirements.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Penalties */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Ответственность за нарушения
        </h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <div className="hidden sm:grid sm:grid-cols-3 bg-muted/50 px-5 py-3 text-xs font-semibold">
            <span>Нарушение</span>
            <span>Штраф</span>
            <span>Риск</span>
          </div>
          {penalties.map((p) => (
            <div
              key={p.violation}
              className="grid gap-1 border-t border-border px-5 py-3 sm:grid-cols-3 sm:items-center sm:gap-4"
            >
              <div className="text-sm">{p.violation}</div>
              <div className="text-sm font-medium text-muted-foreground">{p.fine}</div>
              <Badge className={cn("w-fit border text-xs", riskColors[p.risk])}>
                {riskLabels[p.risk]}
              </Badge>
            </div>
          ))}
        </div>

        {/* Services */}
        <h2 className="mt-16 font-heading text-2xl font-bold">Наши услуги</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, duration }) => (
            <Card key={title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-semibold">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {duration}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Развитие законодательства
        </h2>
        <div className="mt-8 space-y-0 relative ml-4 border-l-2 border-border pl-6">
          {timeline.map((t, i) => (
            <div key={t.date} className="relative pb-8 last:pb-0">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="text-xs font-medium text-primary">{t.date}</div>
              <h3 className="mt-1 font-heading text-sm font-semibold">{t.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Card className="mt-16 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <Fingerprint className="h-8 w-8 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              Проверьте соответствие вашего бизнеса
            </h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              Для членов БСПН — бесплатный экспресс-аудит на соответствие
              требованиям Закона о защите персональных данных
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
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
              <Link
                href="/contacts"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-xl"
                )}
              >
                Заказать аудит
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
