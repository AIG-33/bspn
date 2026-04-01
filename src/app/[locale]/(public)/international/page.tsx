import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Globe,
  Users,
  Building2,
  Handshake,
  Plane,
  MapPin,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Award,
  FileText,
  ExternalLink,
  Flag,
} from "lucide-react";

const partnerships = [
  {
    country: "Россия",
    organization: "РСПП — Российский союз промышленников и предпринимателей",
    type: "Стратегическое партнёрство",
    since: "2005",
    activities: ["Совместные бизнес-миссии", "Обмен опытом", "Решение торговых споров в рамках ЕАЭС"],
  },
  {
    country: "Казахстан",
    organization: "НПП «Атамекен»",
    type: "Партнёрство",
    since: "2012",
    activities: ["Координация позиций в ЕАЭС", "Совместные проекты развития МСП"],
  },
  {
    country: "Германия",
    organization: "BDI — Федеральный союз немецкой промышленности",
    type: "Меморандум о взаимодействии",
    since: "2008",
    activities: ["Бизнес-форумы", "Трансфер технологий", "Стажировки для предпринимателей"],
  },
  {
    country: "Китай",
    organization: "CCPIT — Совет содействия международной торговле",
    type: "Соглашение о сотрудничестве",
    since: "2015",
    activities: ["Организация выставок", "Поиск партнёров", "Содействие инвестициям"],
  },
  {
    country: "Турция",
    organization: "TOBB — Союз торговых палат и бирж Турции",
    type: "Партнёрство",
    since: "2017",
    activities: ["Торговые миссии", "B2B-встречи", "Логистические коридоры"],
  },
  {
    country: "ОАЭ",
    organization: "Торговая палата Дубая",
    type: "Меморандум",
    since: "2019",
    activities: ["Инвестиционные форумы", "Экспортное содействие", "Выставки"],
  },
  {
    country: "Узбекистан",
    organization: "ТПП Узбекистана",
    type: "Партнёрство",
    since: "2016",
    activities: ["Совместные проекты", "Обмен делегациями", "Кооперация"],
  },
  {
    country: "Польша",
    organization: "Конфедерация Левиатан",
    type: "Соглашение",
    since: "2010",
    activities: ["Приграничное сотрудничество", "Логистика", "Совместные мероприятия"],
  },
];

const internationalOrgs = [
  {
    name: "МОТ (Международная организация труда)",
    role: "Консультативный статус",
    description: "Участие в разработке стандартов трудовых отношений, представительство интересов работодателей Беларуси",
  },
  {
    name: "МОР (Международная организация работодателей)",
    role: "Полноправный член",
    description: "Координация позиций работодателей на международном уровне, обмен лучшими практиками",
  },
  {
    name: "BIAC (Консультативный комитет бизнеса при ОЭСР)",
    role: "Наблюдатель",
    description: "Доступ к аналитике ОЭСР, участие в формировании экономической политики",
  },
  {
    name: "Деловой совет ЕАЭС",
    role: "Сопредседатель",
    description: "Формирование единого экономического пространства, снятие барьеров во взаимной торговле",
  },
];

const upcomingEvents = [
  {
    title: "Белорусско-турецкий бизнес-форум",
    date: "15-17 мая 2026",
    location: "Стамбул, Турция",
    type: "Форум",
  },
  {
    title: "Деловая миссия в ОАЭ",
    date: "3-7 июня 2026",
    location: "Дубай, ОАЭ",
    type: "Миссия",
  },
  {
    title: "Форум ЕАЭС «Единое пространство»",
    date: "20-21 сентября 2026",
    location: "Минск, Беларусь",
    type: "Форум",
  },
  {
    title: "Торговая миссия в Узбекистан",
    date: "10-14 октября 2026",
    location: "Ташкент, Узбекистан",
    type: "Миссия",
  },
];

const exportServices = [
  {
    icon: Globe,
    title: "Поиск зарубежных партнёров",
    description: "Подбор контрагентов в 30+ странах через сеть партнёрских организаций",
  },
  {
    icon: FileText,
    title: "Подготовка документов",
    description: "Помощь в оформлении экспортных контрактов, сертификатов, разрешений",
  },
  {
    icon: Plane,
    title: "Организация бизнес-миссий",
    description: "B2B-встречи, посещение предприятий, переговоры с потенциальными партнёрами",
  },
  {
    icon: Building2,
    title: "Выставочная деятельность",
    description: "Организация стендов на международных выставках, коллективные экспозиции",
  },
  {
    icon: Handshake,
    title: "Содействие инвестициям",
    description: "Привлечение иностранных инвестиций, сопровождение инвестиционных проектов",
  },
  {
    icon: Award,
    title: "Сертификация и стандарты",
    description: "Помощь в получении международных сертификатов качества (ISO, CE и др.)",
  },
];

const stats = [
  { value: "30+", label: "стран-партнёров" },
  { value: "50+", label: "международных соглашений" },
  { value: "200+", label: "бизнес-миссий проведено" },
  { value: "3 000+", label: "B2B-встреч организовано" },
];

export default function InternationalPage() {
  return (
    <>
      <PageHeader
        title="Международные связи"
        description="Развитие международного сотрудничества — от поиска партнёров до организации бизнес-миссий в 30+ странах мира"
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
        {/* Partnerships */}
        <h2 className="font-heading text-2xl font-bold">
          Ключевые партнёрства
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Двусторонние соглашения с ведущими бизнес-объединениями мира
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {partnerships.map((p) => (
            <Card key={p.organization} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Flag className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading text-sm font-semibold">{p.country}</h3>
                        <p className="text-xs text-muted-foreground">{p.organization}</p>
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        c {p.since}
                      </Badge>
                    </div>
                    <Badge className="mt-2 border border-primary/20 bg-primary/10 text-primary text-xs">
                      {p.type}
                    </Badge>
                    <ul className="mt-2 space-y-1">
                      {p.activities.map((a) => (
                        <li key={a} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* International Organizations */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Членство в международных организациях
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {internationalOrgs.map((org) => (
            <Card key={org.name}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <h3 className="font-heading text-sm font-semibold">{org.name}</h3>
                </div>
                <Badge className="mt-2 border border-gold/20 bg-gold/10 text-gold text-xs">
                  {org.role}
                </Badge>
                <p className="mt-2 text-xs text-muted-foreground">{org.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Export Services */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Услуги для экспортёров
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exportServices.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-heading text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Events */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Ближайшие международные мероприятия
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {upcomingEvents.map((ev) => (
            <Card key={ev.title} className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-cta/10 text-cta">
                  <Plane className="h-5 w-5" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1.5 text-xs">
                    {ev.type}
                  </Badge>
                  <h3 className="font-heading text-sm font-semibold">{ev.title}</h3>
                  <div className="mt-1.5 flex flex-col gap-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {ev.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ev.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="mt-16 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <Globe className="h-8 w-8 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              Выходите на новые рынки вместе с БСПН
            </h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              Члены БСПН получают приоритетный доступ к бизнес-миссиям,
              B2B-встречам и поддержке при выходе на зарубежные рынки
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
                Запросить каталог партнёров
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
