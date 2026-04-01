import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, X, ArrowRight, Star } from "lucide-react";

const membershipTypes = [
  {
    name: "Ассоциированное",
    description: "Для компаний, которые хотят познакомиться с БСПН",
    price: "от 200",
    period: "BYN / год",
    popular: false,
    features: [
      { text: "Участие в открытых мероприятиях", included: true },
      { text: "Рассылка новостей и обзоров", included: true },
      { text: "Базовые консультации", included: true },
      { text: "Каталог членов", included: false },
      { text: "Шаблоны документов", included: false },
      { text: "Представительство в госорганах", included: false },
      { text: "Международные контакты", included: false },
      { text: "Личный кабинет", included: false },
    ],
  },
  {
    name: "Солидарное",
    description: "Для малого бизнеса и ИП, готовых к участию",
    price: "от 350",
    period: "BYN / год",
    popular: false,
    features: [
      { text: "Участие во всех мероприятиях", included: true },
      { text: "Рассылка новостей и обзоров", included: true },
      { text: "Юридические консультации", included: true },
      { text: "Каталог членов (просмотр)", included: true },
      { text: "Шаблоны документов", included: true },
      { text: "Представительство в госорганах", included: false },
      { text: "Международные контакты", included: false },
      { text: "Личный кабинет (базовый)", included: true },
    ],
  },
  {
    name: "Действительное",
    description: "Для среднего бизнеса — полный набор услуг",
    price: "от 500",
    period: "BYN / год",
    popular: true,
    features: [
      { text: "Участие во всех мероприятиях", included: true },
      { text: "Рассылка новостей и обзоров", included: true },
      { text: "Юридические и экономические консультации", included: true },
      { text: "Каталог членов (полный доступ)", included: true },
      { text: "Все шаблоны документов", included: true },
      { text: "Представительство в госорганах", included: true },
      { text: "Международные контакты", included: true },
      { text: "Личный кабинет (полный)", included: true },
    ],
  },
  {
    name: "Полномочное",
    description: "Для крупного бизнеса и отраслевых лидеров",
    price: "от 1 000",
    period: "BYN / год",
    popular: false,
    features: [
      { text: "Все преимущества действительного членства", included: true },
      { text: "Место в Правлении БСПН", included: true },
      { text: "Приоритетная экспертная поддержка", included: true },
      { text: "Участие в формировании позиции БСПН", included: true },
      { text: "Персональный менеджер", included: true },
      { text: "Участие в международных миссиях", included: true },
      { text: "Размещение логотипа на сайте БСПН", included: true },
      { text: "Индивидуальные аналитические отчёты", included: true },
    ],
  },
];

export default function MembershipTypesPage() {
  return (
    <>
      <PageHeader
        title="Виды членства"
        description="Выберите подходящий формат участия в БСПН — от ознакомительного до полного представительства"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Pricing Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {membershipTypes.map((type) => (
            <Card
              key={type.name}
              className={cn(
                "relative flex flex-col",
                type.popular && "border-primary shadow-lg ring-1 ring-primary/20"
              )}
            >
              {type.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Star className="h-3 w-3" />
                    Рекомендуем
                  </Badge>
                </div>
              )}
              <CardContent className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-bold">{type.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {type.description}
                </p>

                <div className="mt-4">
                  <span className="font-mono text-3xl font-bold">
                    {type.price}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    {type.period}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {type.features.map(({ text, included }) => (
                    <li
                      key={text}
                      className={cn(
                        "flex items-start gap-2 text-sm",
                        included
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      )}
                    >
                      {included ? (
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0" />
                      )}
                      {text}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/membership/join"
                  className={cn(
                    buttonVariants({
                      variant: type.popular ? "default" : "outline",
                    }),
                    "mt-6 w-full justify-center",
                    type.popular &&
                      "bg-cta text-cta-foreground hover:bg-cta/90"
                  )}
                >
                  Выбрать
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conditions */}
        <div className="mt-16 rounded-2xl bg-muted p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold">Условия вступления</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-heading text-base font-semibold">
                Кто может вступить
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Юридические лица и индивидуальные предприниматели,
                зарегистрированные в Республике Беларусь, разделяющие цели и
                задачи БСПН.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold">
                Процедура вступления
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Подайте онлайн-заявку → получите звонок от представителя БСПН в
                течение 24 часов → получите одобрение Правления → оплатите взнос.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold">
                Размер взносов
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Размер ежегодного членского взноса зависит от вида членства и
                размера компании. Вступительный взнос не взимается.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-base text-muted-foreground">
            Не уверены, какой тип подходит? Свяжитесь с нами — поможем выбрать.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/membership/join"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-cta text-cta-foreground hover:bg-cta/90 px-8 rounded-xl"
              )}
            >
              Подать заявку
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contacts"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-8 rounded-xl"
              )}
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
