"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Edit3, Trash2, Calendar, Eye, BookOpen, User } from "lucide-react";

const posts = [
  { id: "1", title: "Налоговая оптимизация 2026", author: "Ковалёв А.М.", date: "25.03.2026", status: "published", views: 1240 },
  { id: "2", title: "Индекс деловой активности Q1 2026", author: "Аналитический центр", date: "20.03.2026", status: "published", views: 890 },
  { id: "3", title: "Дистанционная работа: новые правила", author: "Петрова Е.С.", date: "15.03.2026", status: "published", views: 670 },
  { id: "4", title: "5 ошибок при выходе на рынок ЕАЭС", author: "Мельников П.А.", date: "10.03.2026", status: "published", views: 540 },
  { id: "5", title: "Как подготовиться к проверке НЦЗПД", author: "Козлова М.А.", date: "05.04.2026", status: "draft", views: 0 },
];

const stConfig: Record<string, { label: string; className: string }> = {
  published: { label: "Опубликовано", className: "bg-success/10 text-success border-success/20" },
  draft: { label: "Черновик", className: "bg-gold/10 text-gold border-gold/20" },
};

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление блогом</h1>
        <Button size="sm" className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg">
          <Plus className="mr-1.5 h-3.5 w-3.5" />Новая статья
        </Button>
      </div>
      <div className="space-y-2">
        {posts.map((p) => {
          const st = stConfig[p.status];
          return (
            <Card key={p.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-center gap-3 p-3">
                <BookOpen className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{p.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                    {p.views > 0 && <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{p.views}</span>}
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
