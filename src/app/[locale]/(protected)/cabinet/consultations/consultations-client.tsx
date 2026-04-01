"use client";

import { useMemo, useState } from "react";
import type { ElementType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Consultation, Expert } from "@/lib/supabase/types";
import {
  MessageSquare,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Video,
  Phone,
  Building2,
  Star,
  Plus,
  FileText,
  Send,
} from "lucide-react";

type ConsultationStatus = Consultation["status"];

const statusConfig: Record<
  ConsultationStatus,
  { label: string; icon: ElementType; className: string }
> = {
  scheduled: {
    label: "Запланировано",
    icon: Clock,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  completed: {
    label: "Завершено",
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/20",
  },
  cancelled: {
    label: "Отменено",
    icon: AlertCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  in_progress: {
    label: "Идёт сейчас",
    icon: MessageSquare,
    className: "bg-gold/10 text-gold border-gold/20",
  },
};

const typeIcons = {
  online: Video,
  phone: Phone,
  office: Building2,
};

const typeLabels = {
  online: "Видеозвонок",
  phone: "Телефон",
  office: "В офисе",
};

const MONTHLY_QUOTA = 5;

export function ConsultationsClient({
  initialData,
  experts,
}: {
  initialData: Consultation[];
  experts: Expert[];
}) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "book">("upcoming");
  const [question, setQuestion] = useState("");

  const upcoming = useMemo(
    () =>
      initialData.filter(
        (c) => c.status === "scheduled" || c.status === "in_progress"
      ),
    [initialData]
  );

  const past = useMemo(
    () =>
      initialData.filter(
        (c) => c.status === "completed" || c.status === "cancelled"
      ),
    [initialData]
  );

  const monthCount = useMemo(() => {
    const n = new Date();
    return initialData.filter((c) => {
      const d = new Date(c.date);
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    }).length;
  }, [initialData]);

  const availableExperts = useMemo(
    () => experts.filter((e) => e.available),
    [experts]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Консультации</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Запись к экспертам и история консультаций
          </p>
        </div>
        <Badge className="border border-primary/20 bg-primary/10 text-primary text-xs">
          {monthCount}/{MONTHLY_QUOTA} в этом месяце
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "upcoming" as const, label: "Предстоящие", count: upcoming.length },
          { id: "past" as const, label: "История", count: past.length },
          { id: "book" as const, label: "Записаться", count: 0 },
        ].map(({ id, label, count }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              activeTab === id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/30"
            )}
          >
            {label}
            {count > 0 && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[10px]",
                  activeTab === id ? "bg-white/20" : "bg-muted"
                )}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Upcoming */}
      {activeTab === "upcoming" && (
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">Нет запланированных консультаций</p>
                <Button
                  className="mt-4 bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl"
                  size="sm"
                  onClick={() => setActiveTab("book")}
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Записаться
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcoming.map((c) => {
              const st = statusConfig[c.status];
              const StatusIcon = st.icon;
              const TypeIcon = typeIcons[c.type];

              return (
                <Card key={c.id} className="transition-shadow hover:shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className={cn("border text-[10px]", st.className)}>
                            <StatusIcon className="mr-0.5 h-3 w-3" />
                            {st.label}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            <TypeIcon className="mr-0.5 h-3 w-3" />
                            {typeLabels[c.type]}
                          </Badge>
                        </div>
                        <h3 className="mt-2 text-sm font-semibold">{c.topic}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">
                              {c.expert_name ?? "Эксперт"}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {c.expert_title ?? ""}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(c.date).toLocaleDateString("ru-RU", {
                              day: "numeric",
                              month: "long",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {c.time ?? "—"}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs rounded-lg text-destructive border-destructive/20"
                      >
                        Отменить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Past */}
      {activeTab === "past" && (
        <div className="space-y-3">
          {past.map((c) => {
            const st = statusConfig[c.status];
            const StatusIcon = st.icon;

            return (
              <Card key={c.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Badge className={cn("border text-[10px]", st.className)}>
                      <StatusIcon className="mr-0.5 h-3 w-3" />
                      {st.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.date).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">{c.topic}</h3>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    {c.expert_name ?? "Эксперт"}
                  </div>
                  {c.notes && (
                    <div className="mt-3 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs font-medium flex items-center gap-1 mb-1">
                        <FileText className="h-3 w-3 text-primary" />
                        Заметки эксперта
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {c.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Book */}
      {activeTab === "book" && (
        <div className="space-y-6">
          {/* Quick Question */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Быстрый вопрос</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                Опишите ваш вопрос — мы подберём подходящего эксперта
              </p>
              <div className="flex gap-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ваш вопрос..."
                  className="h-10 text-sm"
                />
                <Button
                  className="h-10 bg-cta text-cta-foreground hover:bg-cta/90 rounded-xl shrink-0"
                  disabled={!question}
                >
                  <Send className="mr-1.5 h-4 w-4" />
                  Отправить
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Experts */}
          <div>
            <h3 className="font-heading text-base font-semibold">Доступные эксперты</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Выберите эксперта и запишитесь на ближайший свободный слот
            </p>
          </div>
          <div className="space-y-2">
            {availableExperts.map((expert) => {
              const specialization =
                expert.specializations?.length > 0
                  ? expert.specializations.join(", ")
                  : "—";
              return (
                <Card key={expert.id} className="transition-shadow hover:shadow-sm">
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{expert.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{specialization}</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-gold text-gold" />
                          {expert.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted-foreground">Ближайший слот</p>
                      <p className="text-xs font-medium text-primary">По записи</p>
                    </div>
                    <Button
                      size="sm"
                      className="h-8 text-xs bg-primary text-primary-foreground rounded-lg shrink-0"
                    >
                      Записаться
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
