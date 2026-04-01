import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Users,
  Calendar,
  Clock,
  MapPin,
  Crown,
  Star,
  CheckCircle2,
  Quote,
  Building2,
  TrendingUp,
  Award,
  Mic2,
  Wine,
  Lock,
  Target,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Закрытый нетворкинг",
    description: "Общение с руководителями ведущих предприятий Беларуси в неформальной обстановке",
  },
  {
    icon: Mic2,
    title: "Эксклюзивные спикеры",
    description: "Приглашённые эксперты, представители госорганов, международные спикеры",
  },
  {
    icon: TrendingUp,
    title: "Стратегические сессии",
    description: "Разбор реальных бизнес-кейсов, совместный поиск решений, обмен практиками",
  },
  {
    icon: Lock,
    title: "Конфиденциальность",
    description: "Правило Chatham House — обсуждения остаются в клубе, что позволяет открыто делиться опытом",
  },
  {
    icon: Award,
    title: "Приоритетный доступ",
    description: "Ранний доступ к аналитике БСПН, законодательным инициативам и бизнес-возможностям",
  },
  {
    icon: Wine,
    title: "Деловые ужины",
    description: "Ежемесячные встречи в лучших площадках Минска с деловой программой и нетворкингом",
  },
];

const upcomingMeetings = [
  {
    date: "18 апреля 2026",
    time: "18:00–21:00",
    title: "«Стратегии роста в условиях неопределённости»",
    speaker: "Алексей Романчук, партнёр БСПН",
    location: "Ресторан «Усадьба», Минск",
    seatsLeft: 8,
  },
  {
    date: "16 мая 2026",
    time: "18:00–21:00",
    title: "«Цифровая трансформация: практические кейсы»",
    speaker: "Приглашённый спикер (ПВТ)",
    location: "Отель «Президент», Минск",
    seatsLeft: 15,
  },
  {
    date: "20 июня 2026",
    time: "18:00–21:00",
    title: "«Международная экспансия: уроки и возможности»",
    speaker: "Павел Мельников, юрист-международник",
    location: "Гольф-клуб «Минск»",
    seatsLeft: 20,
  },
];

const pastTopics = [
  "Налоговая реформа 2026: влияние на бизнес",
  "Привлечение инвестиций: стратегии и инструменты",
  "Управление командой в условиях удалённой работы",
  "Антикризисное управление: опыт 2025 года",
  "Как белорусскому бизнесу выйти в ОАЭ",
  "ESG-повестка: необходимость или мода?",
  "Роль ИИ в бизнес-процессах",
  "Конкуренция за кадры: лучшие практики HR",
];

const testimonials = [
  {
    quote:
      "Клуб Директоров — это единственная площадка, где я могу откровенно обсудить вызовы бизнеса с коллегами того же уровня. За 3 года членства я нашёл здесь и партнёров, и друзей.",
    author: "Генеральный директор",
    company: "производственная компания, 200+ сотрудников",
  },
  {
    quote:
      "Каждое заседание — это концентрированная доза полезных знаний и контактов. Формат деловых ужинов идеально подходит для установления доверительных отношений.",
    author: "Управляющий директор",
    company: "IT-компания, резидент ПВТ",
  },
  {
    quote:
      "Благодаря Клубу я узнал о планируемых изменениях в законодательстве за 6 месяцев до их вступления в силу и успел адаптировать бизнес.",
    author: "Владелец",
    company: "сеть розничных магазинов",
  },
];

const stats = [
  { value: "40+", label: "действующих членов" },
  { value: "10", label: "заседаний в год" },
  { value: "150+", label: "тем обсуждено" },
  { value: "2011", label: "год основания" },
];

export default function DirectorsClubPage() {
  return (
    <>
      <PageHeader
        title="Республиканский Клуб Директоров"
        description="Закрытое бизнес-сообщество руководителей крупнейших предприятий Беларуси — стратегические дискуссии, нетворкинг, эксклюзивная экспертиза"
      />

      {/* Stats */}
      <section className="border-b border-border bg-gradient-to-r from-primary/5 to-gold/5">
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
        {/* Benefits */}
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-gold" />
          <h2 className="font-heading text-2xl font-bold">Привилегии членства</h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-heading text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Meetings */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Ближайшие заседания
        </h2>
        <div className="mt-8 space-y-4">
          {upcomingMeetings.map((meeting) => (
            <Card key={meeting.title} className="transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h3 className="font-heading text-base font-semibold">
                    {meeting.title}
                  </h3>
                  <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {meeting.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {meeting.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mic2 className="h-3.5 w-3.5 text-primary" />
                      {meeting.speaker}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {meeting.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="border border-gold/20 bg-gold/10 text-gold text-xs whitespace-nowrap">
                    {meeting.seatsLeft} мест
                  </Badge>
                  <Button size="sm" className="bg-primary text-primary-foreground rounded-xl whitespace-nowrap">
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Past Topics */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Темы прошлых заседаний
        </h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {pastTopics.map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs px-3 py-1.5">
              {topic}
            </Badge>
          ))}
        </div>

        {/* Testimonials */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Отзывы участников
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-5">
                <Quote className="h-6 w-6 text-gold/40" />
                <p className="mt-3 flex-1 text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-xs font-semibold">{t.author}</p>
                  <p className="text-[10px] text-muted-foreground">{t.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Membership Requirements */}
        <Card className="mt-16 border-gold/20 bg-gradient-to-br from-gold/5 to-primary/5">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                <Crown className="h-8 w-8 text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold">
                  Как стать членом Клуба Директоров
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2 lg:items-center">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success lg:mt-0" />
                    Быть руководителем предприятия (CEO, директор, управляющий партнёр)
                  </li>
                  <li className="flex items-start gap-2 lg:items-center">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success lg:mt-0" />
                    Компания — действующий член БСПН
                  </li>
                  <li className="flex items-start gap-2 lg:items-center">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success lg:mt-0" />
                    Получить рекомендацию от 2 действующих членов клуба
                  </li>
                </ul>
              </div>
              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-gold text-gold-foreground hover:bg-gold/90 rounded-xl shrink-0"
                )}
              >
                Подать заявку
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
