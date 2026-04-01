"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  User,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Expert {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  experience: string;
  education: string;
  rating: number;
  consultations: number;
  bio: string;
  available: boolean;
}

const specializations = [
  { id: "all", label: "Все" },
  { id: "tax", label: "Налоговое право" },
  { id: "labor", label: "Трудовое право" },
  { id: "corporate", label: "Корпоративное право" },
  { id: "contract", label: "Договорное право" },
  { id: "foreign-trade", label: "ВЭД" },
  { id: "ip", label: "Интеллектуальная собственность" },
  { id: "real-estate", label: "Недвижимость" },
  { id: "antimonopoly", label: "Антимонопольное право" },
  { id: "data-protection", label: "Защита ПД" },
];

const experts: Expert[] = [
  {
    id: "1",
    name: "Ковалёв Андрей Михайлович",
    title: "Партнёр, адвокат",
    specializations: ["tax", "corporate"],
    experience: "22 года",
    education: "БГУ, юридический факультет",
    rating: 4.9,
    consultations: 1240,
    bio: "Ведущий эксперт в области налогового планирования и корпоративных споров. Автор 30+ публикаций в профессиональных изданиях.",
    available: true,
  },
  {
    id: "2",
    name: "Петрова Елена Сергеевна",
    title: "Старший юрист",
    specializations: ["labor", "corporate"],
    experience: "15 лет",
    education: "Академия управления при Президенте РБ",
    rating: 4.8,
    consultations: 890,
    bio: "Специалист по трудовым спорам и кадровому сопровождению бизнеса. Более 500 успешных кейсов в трудовом праве.",
    available: true,
  },
  {
    id: "3",
    name: "Сидоренко Игорь Валерьевич",
    title: "Адвокат, к.ю.н.",
    specializations: ["contract", "foreign-trade"],
    experience: "18 лет",
    education: "БГУ, к.ю.н.",
    rating: 4.9,
    consultations: 1050,
    bio: "Кандидат юридических наук. Эксперт по международным контрактам и внешнеэкономической деятельности. Владеет английским и немецким языками.",
    available: false,
  },
  {
    id: "4",
    name: "Козлова Марина Александровна",
    title: "Юрист-консультант",
    specializations: ["ip", "data-protection"],
    experience: "10 лет",
    education: "БГЭУ",
    rating: 4.7,
    consultations: 620,
    bio: "Специализируется на защите интеллектуальной собственности и персональных данных. Сертифицированный специалист по GDPR.",
    available: true,
  },
  {
    id: "5",
    name: "Васильев Дмитрий Олегович",
    title: "Старший адвокат",
    specializations: ["real-estate", "contract"],
    experience: "20 лет",
    education: "БГУ, юридический факультет",
    rating: 4.8,
    consultations: 970,
    bio: "Эксперт по сделкам с недвижимостью и строительному праву. Опыт работы с крупнейшими девелоперами Беларуси.",
    available: true,
  },
  {
    id: "6",
    name: "Романчук Алексей Игоревич",
    title: "Партнёр, адвокат",
    specializations: ["antimonopoly", "tax"],
    experience: "16 лет",
    education: "ЕГУ, магистр права",
    rating: 4.9,
    consultations: 780,
    bio: "Ведущий специалист по антимонопольному регулированию. Представлял интересы бизнеса в МАРТ более 100 раз.",
    available: true,
  },
  {
    id: "7",
    name: "Громова Наталья Викторовна",
    title: "Юрист, медиатор",
    specializations: ["labor", "contract"],
    experience: "12 лет",
    education: "БГУ, медиатор (ТПП)",
    rating: 4.6,
    consultations: 540,
    bio: "Сертифицированный медиатор. Специализируется на досудебном урегулировании коммерческих и трудовых споров.",
    available: false,
  },
  {
    id: "8",
    name: "Мельников Павел Андреевич",
    title: "Юрист-международник",
    specializations: ["foreign-trade", "ip"],
    experience: "14 лет",
    education: "МГИМО, магистр",
    rating: 4.8,
    consultations: 650,
    bio: "Эксперт по ВЭД и международному частному праву. Опыт работы в международных организациях. Владеет 4 языками.",
    available: true,
  },
];

export default function ExpertsPage() {
  const [search, setSearch] = useState("");
  const [activeSpec, setActiveSpec] = useState("all");

  const filtered = experts.filter((e) => {
    const matchSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.bio.toLowerCase().includes(search.toLowerCase());
    const matchSpec = activeSpec === "all" || e.specializations.includes(activeSpec);
    return matchSearch && matchSpec;
  });

  return (
    <>
      <PageHeader
        title="Эксперты БСПН"
        description="Команда квалифицированных юристов и консультантов — более 150 лет совокупного опыта в защите бизнеса"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по имени или специализации..."
              className="h-11 pl-10"
            />
          </div>
        </div>

        {/* Specializations */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {specializations.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveSpec(id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeSpec === id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/30"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Experts Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((expert) => (
            <Card key={expert.id} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading text-sm font-semibold">{expert.name}</h3>
                        <p className="text-xs text-muted-foreground">{expert.title}</p>
                      </div>
                      <Badge
                        className={cn(
                          "shrink-0 border text-xs",
                          expert.available
                            ? "border-success/20 bg-success/10 text-success"
                            : "border-border bg-muted text-muted-foreground"
                        )}
                      >
                        {expert.available ? "Доступен" : "Занят"}
                      </Badge>
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {expert.bio}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {expert.specializations.map((s) => {
                        const spec = specializations.find((sp) => sp.id === s);
                        return (
                          <Badge key={s} variant="secondary" className="text-xs">
                            {spec?.label}
                          </Badge>
                        );
                      })}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {expert.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {expert.education}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-gold" />
                        {expert.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {expert.consultations} консультаций
                      </span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg">
                        <Calendar className="mr-1 h-3 w-3" />
                        Записаться
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs h-8 rounded-lg">
                        <Mail className="mr-1 h-3 w-3" />
                        Написать
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <User className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-4 text-muted-foreground">Эксперты не найдены</p>
          </div>
        )}

        {/* Become expert CTA */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Award className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-heading text-lg font-bold">
                Нужна консультация?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Члены БСПН получают до 5 бесплатных консультаций в месяц
                с нашими экспертами по любым правовым вопросам.
              </p>
              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "mt-4 bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl"
                )}
              >
                Вступить в БСПН
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
          <Card className="border-gold/20 bg-gold/5">
            <CardContent className="p-6">
              <GraduationCap className="h-8 w-8 text-gold" />
              <h3 className="mt-3 font-heading text-lg font-bold">
                Стать экспертом БСПН
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Приглашаем юристов и консультантов с опытом от 5 лет
                присоединиться к экспертному сообществу БСПН.
              </p>
              <Link
                href="/contacts"
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "mt-4 rounded-xl"
                )}
              >
                Связаться с нами
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
