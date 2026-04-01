import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Scale,
  Clock,
  DollarSign,
  Lock,
  Users,
  CheckCircle2,
  FileText,
  Shield,
  Award,
  TrendingDown,
  Building2,
  Briefcase,
  Globe,
  BarChart3,
  Zap,
  Target,
  ArrowDownRight,
} from "lucide-react";

const advantages = [
  {
    icon: Clock,
    title: "Скорость",
    value: "1–3 месяца",
    description: "Средний срок рассмотрения дела, против 6–18 месяцев в государственных судах",
    comparison: "В 3–6 раз быстрее",
  },
  {
    icon: DollarSign,
    title: "Экономия",
    value: "до 60%",
    description: "Снижение расходов на разрешение спора по сравнению с судебным разбирательством",
    comparison: "Меньше затрат",
  },
  {
    icon: Lock,
    title: "Конфиденциальность",
    value: "100%",
    description: "Все материалы дела и решение арбитража не публикуются и не передаются третьим лицам",
    comparison: "Полная приватность",
  },
  {
    icon: Users,
    title: "Выбор арбитра",
    value: "30+",
    description: "Стороны самостоятельно выбирают арбитра из списка квалифицированных специалистов",
    comparison: "Арбитров в реестре",
  },
];

const categories = [
  { icon: Briefcase, label: "Коммерческие споры", percentage: "35%" },
  { icon: Building2, label: "Строительные споры", percentage: "20%" },
  { icon: Globe, label: "Споры в сфере ВЭД", percentage: "18%" },
  { icon: FileText, label: "Договорные споры", percentage: "15%" },
  { icon: Shield, label: "Корпоративные споры", percentage: "8%" },
  { icon: Scale, label: "Иные споры", percentage: "4%" },
];

const processSteps = [
  {
    step: "01",
    title: "Подача заявления",
    description: "Истец подаёт исковое заявление с приложением арбитражного соглашения и документов",
    duration: "1 день",
  },
  {
    step: "02",
    title: "Формирование состава",
    description: "Стороны выбирают арбитра (или арбитров), утверждение состава третейского суда",
    duration: "7–14 дней",
  },
  {
    step: "03",
    title: "Обмен документами",
    description: "Стороны представляют позиции, доказательства, возражения в установленные сроки",
    duration: "14–30 дней",
  },
  {
    step: "04",
    title: "Слушание дела",
    description: "Устное разбирательство с участием сторон, представителей, экспертов и свидетелей",
    duration: "1–3 дня",
  },
  {
    step: "05",
    title: "Вынесение решения",
    description: "Арбитр(ы) выносят мотивированное решение, обязательное для исполнения сторонами",
    duration: "14–30 дней",
  },
  {
    step: "06",
    title: "Исполнение",
    description: "Решение подлежит добровольному исполнению или принудительному через суд",
    duration: "Сразу",
  },
];

const arbitrators = [
  { name: "Ковалёв А.М.", specialization: "Коммерческое право", experience: "22 года" },
  { name: "Сидоренко И.В.", specialization: "Международное право", experience: "18 лет" },
  { name: "Романчук А.И.", specialization: "Антимонопольное право", experience: "16 лет" },
  { name: "Васильев Д.О.", specialization: "Строительное право", experience: "20 лет" },
  { name: "Мельников П.А.", specialization: "ВЭД, инвестиции", experience: "14 лет" },
  { name: "Громова Н.В.", specialization: "Медиация, трудовое право", experience: "12 лет" },
];

const fees = [
  { amount: "до 10 000 BYN", fee: "5% от суммы иска, мин. 150 BYN" },
  { amount: "10 001–50 000 BYN", fee: "500 + 3% от суммы свыше 10 000" },
  { amount: "50 001–200 000 BYN", fee: "1 700 + 2% от суммы свыше 50 000" },
  { amount: "200 001–1 000 000 BYN", fee: "4 700 + 1% от суммы свыше 200 000" },
  { amount: "свыше 1 000 000 BYN", fee: "12 700 + 0,5% от суммы свыше 1 000 000" },
];

const stats = [
  { value: "500+", label: "дел рассмотрено" },
  { value: "94%", label: "решений исполнено добровольно" },
  { value: "2,5 мес.", label: "средний срок рассмотрения" },
  { value: "30+", label: "квалифицированных арбитров" },
];

export default function ArbitrationPage() {
  return (
    <>
      <PageHeader
        title="Третейский суд БСПН"
        description="Альтернативное разрешение коммерческих споров — быстро, конфиденциально, профессионально"
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
        {/* Advantages */}
        <h2 className="font-heading text-2xl font-bold">
          Преимущества третейского суда
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ icon: Icon, title, value, description, comparison }) => (
            <Card key={title} className="group text-center transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-3 font-heading text-2xl font-bold text-primary">{value}</div>
                <h3 className="mt-1 font-heading text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  <ArrowDownRight className="mr-1 h-3 w-3 text-success" />
                  {comparison}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Categories */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Категории рассматриваемых споров
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, label, percentage }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
              </div>
              <div className="font-heading text-lg font-bold text-primary">{percentage}</div>
            </div>
          ))}
        </div>

        {/* Process */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Порядок рассмотрения спора
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map(({ step, title, description, duration }) => (
            <Card key={step}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step}
                  </div>
                  <h3 className="font-heading text-sm font-semibold">{title}</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                  <Clock className="h-3 w-3" />
                  {duration}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Arbitrators */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Арбитры
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Квалифицированные юристы с опытом от 10 лет
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {arbitrators.map((arb) => (
            <div
              key={arb.name}
              className="flex items-center gap-3 rounded-xl border border-border p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">{arb.name}</p>
                <p className="text-xs text-muted-foreground">{arb.specialization}</p>
                <p className="text-[10px] text-muted-foreground">Опыт: {arb.experience}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fees */}
        <h2 className="mt-16 font-heading text-2xl font-bold">
          Арбитражный сбор
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Для членов БСПН — скидка 30% на арбитражный сбор
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <div className="hidden sm:grid sm:grid-cols-2 bg-muted/50 px-5 py-3 text-xs font-semibold">
            <span>Цена иска</span>
            <span>Арбитражный сбор</span>
          </div>
          {fees.map((f) => (
            <div
              key={f.amount}
              className="grid gap-1 border-t border-border px-5 py-3 sm:grid-cols-2 sm:gap-4"
            >
              <div className="text-sm font-medium">{f.amount}</div>
              <div className="text-sm text-muted-foreground">{f.fee}</div>
            </div>
          ))}
        </div>

        {/* Arbitration Clause */}
        <Card className="mt-16 border-border">
          <CardContent className="p-6">
            <h3 className="font-heading text-base font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Рекомендуемая арбитражная оговорка
            </h3>
            <div className="mt-4 rounded-lg bg-muted/50 p-4 font-mono text-xs leading-relaxed">
              &laquo;Все споры, разногласия или требования, возникающие из настоящего договора
              или в связи с ним, в том числе касающиеся его заключения, изменения,
              исполнения, нарушения, прекращения или действительности, подлежат
              разрешению в Третейском суде при Бизнес Союзе Предпринимателей и
              Нанимателей имени профессора М.С. Кунявского в соответствии с его
              Регламентом.&raquo;
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Включите эту оговорку в ваши договоры для обеспечения быстрого и
              профессионального разрешения споров.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="mt-16 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
            <Scale className="h-8 w-8 text-primary" />
            <h3 className="font-heading text-xl font-bold">
              Подать иск в Третейский суд
            </h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              Заполните заявление онлайн или свяжитесь с секретариатом для получения
              консультации по процедуре
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacts"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl"
                )}
              >
                Подать заявление
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contacts"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-xl"
                )}
              >
                Консультация
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
