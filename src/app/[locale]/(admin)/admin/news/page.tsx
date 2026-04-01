"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Plus, Edit3, Trash2, Eye, Calendar, Newspaper, CheckCircle2, Clock } from "lucide-react";

const articles = [
  { id: "1", title: "БСПН добился снижения административной нагрузки", date: "28.03.2026", status: "published", views: 3420 },
  { id: "2", title: "Итоги Белорусско-китайского бизнес-форума", date: "22.03.2026", status: "published", views: 2180 },
  { id: "3", title: "Новые критерии для УСН: что изменится", date: "18.03.2026", status: "published", views: 5640 },
  { id: "4", title: "45 новых членов в I квартале 2026", date: "15.03.2026", status: "published", views: 1230 },
  { id: "5", title: "Анонс конференции «Бизнес-среда 2027»", date: "01.04.2026", status: "draft", views: 0 },
  { id: "6", title: "Обзор изменений в Налоговый кодекс", date: "02.04.2026", status: "draft", views: 0 },
];

const stConfig: Record<string, { label: string; className: string }> = {
  published: { label: "Опубликовано", className: "bg-success/10 text-success border-success/20" },
  draft: { label: "Черновик", className: "bg-gold/10 text-gold border-gold/20" },
};

export default function AdminNewsPage() {
  const [search, setSearch] = useState("");
  const filtered = articles.filter((a) => !search || a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление новостями</h1>
        <Button size="sm" className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg">
          <Plus className="mr-1.5 h-3.5 w-3.5" />Создать
        </Button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск..." className="h-10 pl-9 text-sm" />
      </div>
      <div className="space-y-2">
        {filtered.map((a) => {
          const st = stConfig[a.status];
          return (
            <Card key={a.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-center gap-3 p-3">
                <Newspaper className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{a.date}</span>
                    {a.views > 0 && <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{a.views.toLocaleString("ru-RU")}</span>}
                  </div>
                </div>
                <Badge className={cn("border text-[10px] shrink-0", st.className)}>{st.label}</Badge>
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
