import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";

const leaders = [
  {
    name: "Александр Калинин",
    role: "Сопредседатель БСПН",
    initials: "АК",
    description:
      "Координирует работу союза по взаимодействию с государственными органами и международными организациями.",
  },
  {
    name: "Жанна Тарасевич",
    role: "Сопредседатель БСПН",
    initials: "ЖТ",
    description:
      "Курирует направления экспертизы, правовой поддержки и работы с членами союза.",
  },
];

const board = [
  { name: "Иванов И.И.", role: "Член Правления", initials: "ИИ" },
  { name: "Петрова М.А.", role: "Член Правления", initials: "ПМ" },
  { name: "Сидоров К.В.", role: "Член Правления", initials: "СК" },
  { name: "Козлова Е.Н.", role: "Член Правления", initials: "КЕ" },
  { name: "Морозов Д.С.", role: "Член Правления", initials: "МД" },
  { name: "Волкова О.П.", role: "Член Правления", initials: "ВО" },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        title="Руководство и структура"
        description="Правление и Сопредседатели БСПН"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Co-Chairs */}
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Сопредседатели
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {leaders.map(({ name, role, initials, description }) => (
            <Card key={name} className="overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-heading">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {name}
                    </h3>
                    <p className="text-sm font-medium text-primary">{role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
                <div className="mt-4 flex gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    info@bspn.by
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    +375 17 210-18-42
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Board */}
        <h2 className="mt-16 font-heading text-2xl font-bold sm:text-3xl">
          Правление БСПН
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {board.map(({ name, role, initials }) => (
            <Card key={name}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm font-heading">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-heading text-sm font-semibold">{name}</h3>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Structure */}
        <div className="mt-16 rounded-2xl bg-muted p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Организационная структура
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Съезд",
                desc: "Высший орган управления. Проводится не реже 1 раза в 3 года.",
              },
              {
                title: "Правление",
                desc: "Коллегиальный исполнительный орган. Координирует текущую деятельность.",
              },
              {
                title: "Аппарат",
                desc: "7 сотрудников: экономисты, юристы, специалисты по международным связям.",
              },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h3 className="font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
