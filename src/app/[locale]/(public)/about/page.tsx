import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  Target,
  Clock,
  Users,
  Trophy,
  Building2,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    title: "Миссия и ценности",
    description:
      "Социальное партнёрство, профессионализм и добровольность — основы нашей деятельности",
    href: "/about/mission",
    icon: Target,
  },
  {
    title: "История",
    description:
      "Путь БСПН с 1990 года — более 35 лет на стороне предпринимателей",
    href: "/about/history",
    icon: Clock,
  },
  {
    title: "Руководство и структура",
    description: "Правление, Сопредседатели и организационная структура союза",
    href: "/about/leadership",
    icon: Users,
  },
  {
    title: "Наши достижения",
    description:
      "Конкретные результаты работы: изменённые законы, защищённые права, решённые проблемы",
    href: "/about/achievements",
    icon: Trophy,
  },
  {
    title: "Отраслевые ассоциации",
    description:
      "7 ассоциаций по ключевым отраслям экономики Беларуси",
    href: "/about/associations",
    icon: Building2,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="О БСПН"
        description="Белорусский союз предпринимателей и нанимателей им. проф. М.С. Кунявского — ведущая бизнес-ассоциация страны с 1990 года"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
            БСПН объединяет 94 организации из 14 отраслей экономики. Мы
            представляем интересы бизнеса в 20+ коллегиальных органах при
            государственных органах, обеспечиваем правовую защиту, экспертную
            поддержку и международные деловые связи.
          </p>
        </div>

        {/* Section Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href}>
              <Card className="group h-full transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="flex flex-col p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-heading text-lg font-semibold">
                    {title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    Подробнее
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Facts */}
        <div className="mt-16 rounded-2xl bg-primary p-8 text-primary-foreground sm:p-12">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            БСПН в цифрах
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "1990", label: "Год основания" },
              { value: "94+", label: "Организации-члены" },
              { value: "20+", label: "Советов при госорганах" },
              { value: "7", label: "Отраслевых ассоциаций" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-mono text-3xl font-bold sm:text-4xl">
                  {value}
                </div>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
