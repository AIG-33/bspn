import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, Handshake, Heart } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Социальное партнёрство",
    description:
      "Мы выстраиваем конструктивный диалог между бизнесом и государством. БСПН — мост между предпринимателями и органами власти, обеспечивающий учёт интересов бизнеса при формировании экономической политики.",
  },
  {
    icon: Shield,
    title: "Профессионализм",
    description:
      "Наша команда — экономисты, юристы и отраслевые эксперты с многолетним опытом. Мы предоставляем квалифицированную экспертизу по всем вопросам ведения бизнеса в Беларуси.",
  },
  {
    icon: Heart,
    title: "Добровольность",
    description:
      "Членство в БСПН — осознанный выбор компаний, которые понимают ценность коллективного голоса бизнес-сообщества и стремятся к совместному решению общих задач.",
  },
  {
    icon: BookOpen,
    title: "Открытость и прозрачность",
    description:
      "Мы открыто публикуем результаты своей работы, проводим регулярные отчётные мероприятия и обеспечиваем доступ членов к информации о деятельности союза.",
  },
];

export default function MissionPage() {
  return (
    <>
      <PageHeader
        title="Миссия и ценности"
        description="Социальное партнёрство, профессионализм, добровольность"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Mission Statement */}
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-10">
            <blockquote className="text-center">
              <p className="font-heading text-xl font-semibold text-foreground sm:text-2xl leading-relaxed">
                «Содействие развитию предпринимательства и защита законных прав
                и интересов субъектов хозяйствования — основа процветания
                экономики Беларуси»
              </p>
              <footer className="mt-4 text-sm text-muted-foreground">
                — Девиз БСПН, основанный на принципах проф. М.С. Кунявского
              </footer>
            </blockquote>
          </div>

          <div className="mt-10 space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              Белорусский союз предпринимателей и нанимателей — крупнейшая
              бизнес-ассоциация Беларуси, основанная в 1990 году. Наша миссия —
              объединение предпринимателей для защиты их интересов, содействие
              развитию делового климата и укрепление социального партнёрства.
            </p>
            <p>
              БСПН выступает посредником в диалоге бизнеса и власти, участвуя в
              работе более 20 коллегиальных органов при министерствах и ведомствах
              Республики Беларусь. Наш голос слышен при обсуждении ключевых
              законопроектов, затрагивающих интересы бизнеса.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mt-16">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            Наши ценности
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Symbol */}
        <div className="mt-16 mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Символика БСПН
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Символ БСПН — «Вялес» — бог труда и процветания в славянской
            мифологии. Он олицетворяет созидательную силу предпринимательства,
            благополучие и мудрость в ведении дел.
          </p>
        </div>
      </div>
    </>
  );
}
