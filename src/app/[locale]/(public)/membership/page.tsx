import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Gift,
  Layers,
  PenLine,
  Users,
  CheckCircle,
} from "lucide-react";

const sections = [
  {
    icon: Gift,
    title: "Преимущества",
    description:
      "Защита, знания, сообщество, международные связи — калькулятор выгоды покажет, сколько вы сэкономите",
    href: "/membership/benefits",
  },
  {
    icon: Layers,
    title: "Виды членства",
    description:
      "4 формата участия — от ассоциированного до полномочного. Сравните и выберите подходящий",
    href: "/membership/types",
  },
  {
    icon: PenLine,
    title: "Вступить онлайн",
    description:
      "Заполните заявку за 2 минуты. Мы свяжемся с вами в течение 24 часов",
    href: "/membership/join",
  },
  {
    icon: Users,
    title: "Каталог членов",
    description:
      "94+ компании из 14 отраслей. Доступно для членов БСПН",
    href: "/membership/directory",
  },
];

const highlights = [
  "Бесплатные юридические и экономические консультации",
  "Представительство в 20+ коллегиальных органах при госорганах",
  "Доступ к 15+ шаблонам документов",
  "Участие в мероприятиях и Клубе Директоров",
  "Международные деловые контакты в 15+ странах",
  "Партнёрские скидки от членов союза",
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        title="Членство в БСПН"
        description="Присоединяйтесь к 94+ компаниям, которые уже защищают свой бизнес с БСПН"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Sections */}
        <div className="grid gap-6 sm:grid-cols-2">
          {sections.map(({ icon: Icon, title, description, href }) => (
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

        {/* Key Highlights */}
        <div className="mt-16 rounded-2xl bg-primary p-8 text-primary-foreground sm:p-12">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Что включено в членство
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm text-primary-foreground/90">{item}</span>
              </div>
            ))}
          </div>
          <Link
            href="/membership/join"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 bg-cta text-cta-foreground hover:bg-cta/90 px-8 rounded-xl"
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
