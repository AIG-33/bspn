import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/sections/animated-counter";
import {
  Scale,
  FileText,
  Users,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react";

const stats = [
  { icon: FileText, value: 150, suffix: "+", label: "Законодательных инициатив" },
  { icon: Scale, value: 500, suffix: "+", label: "Правовых консультаций" },
  { icon: Users, value: 94, suffix: "", label: "Организаций-членов" },
  { icon: Globe, value: 15, suffix: "+", label: "Стран-партнёров" },
  { icon: Award, value: 20, suffix: "+", label: "Советов при госорганах" },
  { icon: TrendingUp, value: 35, suffix: "+", label: "Лет работы" },
];

const achievements = [
  {
    title: "Защита интересов МСБ в налоговом законодательстве",
    description:
      "Инициировали и продвинули ряд изменений в Налоговый кодекс, снизивших налоговую нагрузку на малый и средний бизнес.",
    year: "2024–2025",
  },
  {
    title: "Упрощение процедуры регистрации бизнеса",
    description:
      "Благодаря систематической работе БСПН с Минэкономики были сокращены сроки и требования к регистрации юридических лиц.",
    year: "2023",
  },
  {
    title: "Защита прав предпринимателей при проверках",
    description:
      "Разработали и продвинули рекомендации по ограничению необоснованных проверок субъектов хозяйствования.",
    year: "2022–2023",
  },
  {
    title: "Международные бизнес-миссии",
    description:
      "Организовали более 10 бизнес-миссий в страны ЕС, СНГ и Азии, обеспечив установление более 200 деловых контактов.",
    year: "2020–2025",
  },
  {
    title: "Создание системы бизнес-послов",
    description:
      "Запустили институт бизнес-послов БСПН в 15+ странах для содействия экспорту и международному сотрудничеству.",
    year: "2021",
  },
];

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        title="Наши достижения"
        description="Конкретные результаты работы БСПН для белорусского бизнеса"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ icon: Icon, value, suffix, label }) => (
            <Card key={label} className="text-center">
              <CardContent className="p-6 sm:p-8">
                <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-mono text-3xl font-bold sm:text-4xl">
                  <AnimatedCounter value={value} />
                  {suffix}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Achievements */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Ключевые победы
          </h2>
          <div className="mt-8 space-y-6">
            {achievements.map(({ title, description, year }) => (
              <Card key={title}>
                <CardContent className="p-6 sm:flex sm:items-start sm:gap-6 sm:p-8">
                  <span className="mb-2 block shrink-0 font-mono text-sm font-bold text-primary sm:mb-0 sm:pt-0.5">
                    {year}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
