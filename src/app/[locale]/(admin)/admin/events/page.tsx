"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Edit3, Trash2, Calendar, Clock, MapPin, Users, CalendarDays } from "lucide-react";

const events = [
  { id: "1", title: "Конференция «Бизнес-среда 2026»", date: "25.04.2026", location: "Минск", registered: 413, capacity: 500, status: "active" },
  { id: "2", title: "Семинар «Изменения в ТК 2026»", date: "15.04.2026", location: "Минск", registered: 46, capacity: 80, status: "active" },
  { id: "3", title: "Вебинар «Защита ПД»", date: "10.04.2026", location: "Онлайн", registered: 57, capacity: 200, status: "active" },
  { id: "4", title: "Бизнес-миссия в Стамбул", date: "15.05.2026", location: "Турция", registered: 18, capacity: 30, status: "active" },
  { id: "5", title: "Тренинг «Переговоры»", date: "22.04.2026", location: "Минск", registered: 19, capacity: 25, status: "active" },
  { id: "6", title: "Летний бизнес-форум", date: "15.07.2026", location: "Минск", registered: 0, capacity: 300, status: "draft" },
];

const stConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Активно", className: "bg-success/10 text-success border-success/20" },
  draft: { label: "Черновик", className: "bg-gold/10 text-gold border-gold/20" },
};

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление мероприятиями</h1>
        <Button size="sm" className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg">
          <Plus className="mr-1.5 h-3.5 w-3.5" />Создать
        </Button>
      </div>
      <div className="space-y-2">
        {events.map((ev) => {
          const st = stConfig[ev.status];
          const pct = Math.round((ev.registered / ev.capacity) * 100);
          return (
            <Card key={ev.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate">{ev.title}</p>
                    <Badge className={cn("border text-[10px] shrink-0", st.className)}>{st.label}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{ev.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.registered}/{ev.capacity} ({pct}%)</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full max-w-xs rounded-full bg-muted overflow-hidden">
                    <div className={cn("h-full rounded-full", pct > 80 ? "bg-cta" : "bg-primary")} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Edit3 className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
