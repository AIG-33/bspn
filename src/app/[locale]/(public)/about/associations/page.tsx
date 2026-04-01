import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Factory,
  Truck,
  Building2,
  Cpu,
  ShoppingBag,
  Wheat,
  Wrench,
} from "lucide-react";

const associations = [
  {
    icon: Factory,
    name: "Ассоциация промышленных предприятий",
    description:
      "Объединяет предприятия обрабатывающей промышленности. Представляет интересы в сфере промышленной политики, ценообразования и технического регулирования.",
    members: 18,
  },
  {
    icon: Truck,
    name: "Ассоциация транспорта и логистики",
    description:
      "Компании грузовых и пассажирских перевозок, логистические операторы. Работа с Минтрансом по тарифной политике и условиям перевозок.",
    members: 12,
  },
  {
    icon: Building2,
    name: "Ассоциация строительных организаций",
    description:
      "Строительные компании, проектные организации, производители стройматериалов. Участие в формировании строительных норм и стандартов.",
    members: 15,
  },
  {
    icon: Cpu,
    name: "Ассоциация IT и цифровых технологий",
    description:
      "Компании сферы информационных технологий, разработки ПО и цифровых сервисов. Продвижение интересов IT-отрасли.",
    members: 10,
  },
  {
    icon: ShoppingBag,
    name: "Ассоциация торговли и услуг",
    description:
      "Торговые предприятия, сети, предприятия сферы услуг. Защита прав в сфере торгового законодательства и ценообразования.",
    members: 20,
  },
  {
    icon: Wheat,
    name: "Ассоциация агропромышленного комплекса",
    description:
      "Предприятия сельского хозяйства и переработки. Работа с Минсельхозом по вопросам поддержки и развития АПК.",
    members: 11,
  },
  {
    icon: Wrench,
    name: "Ассоциация малого и среднего бизнеса",
    description:
      "Индивидуальные предприниматели и компании малого формата. Защита прав МСБ, упрощение регулирования, снижение барьеров.",
    members: 8,
  },
];

export default function AssociationsPage() {
  return (
    <>
      <PageHeader
        title="Отраслевые ассоциации"
        description="7 ассоциаций по ключевым отраслям экономики Беларуси"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {associations.map(
            ({ icon: Icon, name, description, members }) => (
              <Card
                key={name}
                className="transition-all hover:border-primary/30 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold leading-snug">
                    {name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm">
                    <span className="font-mono font-bold text-primary">
                      {members}
                    </span>
                    <span className="text-muted-foreground">
                      организаций-членов
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </>
  );
}
