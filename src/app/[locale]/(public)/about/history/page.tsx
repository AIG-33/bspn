import { PageHeader } from "@/components/sections/page-header";

const timeline = [
  {
    year: "1990",
    title: "Основание союза",
    description:
      "Белорусский союз предпринимателей и нанимателей основан как одна из первых бизнес-ассоциаций в постсоветском пространстве.",
  },
  {
    year: "1992",
    title: "Первые отраслевые ассоциации",
    description:
      "Созданы первые отраслевые ассоциации, объединившие предприятия по секторам экономики.",
  },
  {
    year: "1998",
    title: "Международное признание",
    description:
      "БСПН стал членом международных деловых организаций и установил партнёрские связи с бизнес-ассоциациями Европы.",
  },
  {
    year: "2000",
    title: "Республиканский Клуб Директоров",
    description:
      "Создан Республиканский Клуб Директоров — площадка для обсуждения стратегических вопросов развития бизнеса.",
  },
  {
    year: "2005",
    title: "Третейский суд",
    description:
      "При БСПН создан Третейский суд для альтернативного разрешения хозяйственных споров.",
  },
  {
    year: "2010",
    title: "20 лет БСПН",
    description:
      "Юбилей союза. К этому времени БСПН представлен более чем в 15 коллегиальных органах при государственных органах.",
  },
  {
    year: "2015",
    title: "Расширение экспертизы",
    description:
      "Запуск новых направлений: защита персональных данных, цифровая трансформация, поддержка стартапов.",
  },
  {
    year: "2020",
    title: "30 лет — новые вызовы",
    description:
      "Адаптация к новым условиям: онлайн-консультации, дистанционные мероприятия, цифровые сервисы для членов.",
  },
  {
    year: "2025",
    title: "XXVII съезд БСПН",
    description:
      "Утверждена Стратегия развития на 2026–2028 годы. Курс на цифровую трансформацию и международное сотрудничество.",
  },
  {
    year: "2026",
    title: "Новый сайт и стратегия",
    description:
      "Запуск нового сайта как сервисного хаба. Реализация стратегии привлечения новых членов и расширения цифровых услуг.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        title="История БСПН"
        description="Путь от основания в 1990 году до ведущей бизнес-ассоциации Беларуси"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Memorial */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-10">
          <h2 className="font-heading text-xl font-bold sm:text-2xl">
            Проф. М.С. Кунявский
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Союз носит имя профессора Михаила Сергеевича Кунявского — выдающегося
            учёного-экономиста, одного из основателей и первого руководителя БСПН.
            Его идеи социального партнёрства и конструктивного диалога между
            бизнесом и государством остаются фундаментом деятельности союза.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col sm:flex-row ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 top-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary sm:left-1/2">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                </div>

                {/* Content */}
                <div
                  className={`ml-10 sm:ml-0 sm:w-1/2 ${
                    i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                  }`}
                >
                  <span className="font-mono text-sm font-bold text-primary">
                    {item.year}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
