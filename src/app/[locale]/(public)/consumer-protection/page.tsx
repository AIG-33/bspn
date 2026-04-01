import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Users,
  Scale,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  Shield,
  Target,
  Lightbulb,
  Megaphone,
  BadgeAlert,
  FileCheck,
  HandshakeIcon,
} from "lucide-react";

const threats = [
  {
    icon: BadgeAlert,
    title: "Необоснованные претензии",
    description:
      "Потребители предъявляют требования, не предусмотренные договором или законом, рассчитывая на юридическую неосведомлённость продавца.",
    frequency: "35% обращений",
  },
  {
    icon: FileText,
    title: "Злоупотребление правом на возврат",
    description:
      "Возврат товара после длительного использования, подмена товара при возврате, возврат повреждённого по вине покупателя товара.",
    frequency: "25% обращений",
  },
  {
    icon: Megaphone,
    title: "Угрозы репутации",
    description:
      "Шантаж негативными отзывами, публикации в социальных сетях с целью давления, обращения в СМИ без попытки досудебного урегулирования.",
    frequency: "20% обращений",
  },
  {
    icon: Scale,
    title: "Сутяжничество",
    description:
      "Систематическая подача исков к различным предприятиям с целью получения компенсаций, которые существенно превышают стоимость товара.",
    frequency: "15% обращений",
  },
  {
    icon: AlertTriangle,
    title: "Провокации при покупке",
    description:
      "Умышленное создание ситуаций для предъявления претензий: повреждение товара в магазине, ложные заявления о ненадлежащем качестве.",
    frequency: "5% обращений",
  },
];

const services = [
  {
    icon: Shield,
    title: "Превентивная защита",
    items: [
      "Аудит договоров купли-продажи и оказания услуг",
      "Разработка правил возврата и обмена",
      "Шаблоны актов приёмки и гарантийных обязательств",
      "Обучение персонала работе с претензиями",
    ],
  },
  {
    icon: FileCheck,
    title: "Реагирование на претензии",
    items: [
      "Правовая экспертиза претензий потребителей",
      "Подготовка мотивированных ответов",
      "Организация независимой экспертизы товара",
      "Представительство в контролирующих органах",
    ],
  },
  {
    icon: Scale,
    title: "Судебная защита",
    items: [
      "Подготовка позиции по делу",
      "Представительство в судах всех инстанций",
      "Подготовка встречных исков",
      "Взыскание судебных расходов",
    ],
  },
  {
    icon: BookOpen,
    title: "Образовательные программы",
    items: [
      'Семинары "Потребительское право для бизнеса"',
      "Вебинары по актуальным изменениям в законодательстве",
      "Практикумы для юристов предприятий",
      "Ежеквартальные обзоры судебной практики",
    ],
  },
];

const caseStudies = [
  {
    title: "Сеть магазинов электроники",
    problem: "Массовые возвраты гаджетов после кратковременного использования",
    solution:
      "Разработали типовой договор с чётким описанием условий возврата, внедрили систему фиксации состояния товара при продаже, обучили персонал",
    result: "Необоснованные возвраты сократились на 70%",
    saved: "~180 000 BYN/год",
  },
  {
    title: "Ресторанный холдинг",
    problem: "Систематические жалобы профессионального «потребительского террориста»",
    solution:
      "Провели анализ всех обращений, выявили закономерность, подготовили доказательную базу злоупотребления правом",
    result: "Суд отказал истцу, взыскана госпошлина",
    saved: "320 000 BYN (сумма исков)",
  },
  {
    title: "Строительная компания",
    problem: "Претензии дольщиков по качеству отделки, завышенные требования",
    solution:
      "Организовали независимую экспертизу, разработали регламент приёмки квартир, урегулировали 90% претензий досудебно",
    result: "Судебные расходы снизились на 85%",
    saved: "~500 000 BYN",
  },
];

const stats = [
  { value: "500+", label: "предприятий защищено" },
  { value: "92%", label: "споров решено в пользу бизнеса" },
  { value: "2 млн+", label: "BYN сэкономлено клиентам" },
  { value: "15", label: "экспертов в команде" },
];

export default function ConsumerProtectionPage() {
  return (
    <>
      <PageHeader
        title="Защита от потребительского экстремизма"
        description="Комплексная защита бизнеса от злоупотреблений правами потребителей — превентивные меры, экспертиза и судебное сопровождение"
      />

      {/* Stats */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-heading text-3xl font-bold text-primary">{value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Threats */}
        <h2 className="font-heading text-2xl font-bold">Типичные угрозы</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Основные виды злоупотреблений, с которыми сталкивается бизнес
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {threats.map(({ icon: Icon, title, description, frequency }) => (
            <Card key={title} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cta/10 text-cta">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {frequency}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services */}
        <h2 className="mt-16 font-heading text-2xl font-bold">Наши услуги</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, title, items }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-semibold">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <h2 className="mt-16 font-heading text-2xl font-bold">Кейсы</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Реальные примеры защиты бизнеса от потребительского экстремизма
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Card key={cs.title} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-5">
                <Badge variant="secondary" className="mb-3 w-fit text-xs">
                  {cs.title}
                </Badge>
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-xs font-medium text-cta">Проблема</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{cs.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">Решение</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{cs.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-success">Результат</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{cs.result}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm font-semibold text-success">{cs.saved}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="mt-16 border-cta/20 bg-cta/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <ShieldCheck className="h-8 w-8 text-cta" />
            <h3 className="font-heading text-xl font-bold">
              Защитите свой бизнес уже сегодня
            </h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              Члены БСПН получают приоритетный доступ к услугам по защите
              от потребительского экстремизма и бесплатный аудит документов
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
