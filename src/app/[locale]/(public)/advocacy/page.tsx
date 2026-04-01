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
  type LucideIcon,
} from "lucide-react";
import { getAdvocacyDirections, getAdvocacyInitiatives } from "@/lib/queries/advocacy";
import { AdminEditBar } from "@/components/admin-edit-bar";

const iconMap: Record<string, LucideIcon> = {
  TrendingDown,
  FileText,
  Scale,
  Building2,
  Users,
  Megaphone,
  ShieldCheck,
  Target,
  BarChart3,
};

const statusMap: Record<string, { label: string; icon: LucideIcon; className: string }> = {
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

export default async function AdvocacyPage() {
  const [directions, initiatives] = await Promise.all([
    getAdvocacyDirections(),
    getAdvocacyInitiatives(),
  ]);

  return (
    <>
      <PageHeader
        title="Адвокация и защита интересов бизнеса"
        description="Системная работа по улучшению бизнес-среды — от мониторинга законодательства до прямого диалога с государством"
      />

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
        <h2 className="font-heading text-2xl font-bold">Направления работы</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {directions.map((dir) => {
            const Icon = iconMap[dir.icon_name] ?? FileText;
            return (
              <Card key={dir.id} className="group transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-semibold">{dir.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{dir.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {dir.results.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                        <span className="text-muted-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <h2 className="mt-16 font-heading text-2xl font-bold">
          Текущие инициативы
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Актуальные проекты по улучшению условий ведения бизнеса
        </p>
        <div className="mt-8 space-y-4">
          {initiatives.map((init) => {
            const st = statusMap[init.status] ?? statusMap.active;
            const StatusIcon = st.icon;
            return (
              <Card key={init.id}>
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
                  {init.deadline && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5" />
                      {init.deadline}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

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
      <AdminEditBar label="Адвокация" adminHref="/admin/advocacy" />
    </>
  );
}
