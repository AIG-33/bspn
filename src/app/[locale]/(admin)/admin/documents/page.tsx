"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Edit3, Trash2, FileText, Download, Upload, FolderOpen } from "lucide-react";

const docs = [
  { id: "1", name: "Шаблон договора поставки (2026)", category: "Шаблоны", type: "DOCX", size: "124 КБ", downloads: 342 },
  { id: "2", name: "Шаблон трудового контракта", category: "Шаблоны", type: "DOCX", size: "98 КБ", downloads: 567 },
  { id: "3", name: "Обзор изменений НК — 2026", category: "Аналитика", type: "PDF", size: "2.3 МБ", downloads: 890 },
  { id: "4", name: "Руководство по УСН", category: "Руководства", type: "PDF", size: "1.8 МБ", downloads: 678 },
  { id: "5", name: "Устав БСПН", category: "Нормативные", type: "PDF", size: "340 КБ", downloads: 89 },
  { id: "6", name: "Индекс деловой активности Q1 2026", category: "Аналитика", type: "PDF", size: "4.2 МБ", downloads: 156 },
];

export default function AdminDocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление документами</h1>
        <Button size="sm" className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg">
          <Upload className="mr-1.5 h-3.5 w-3.5" />Загрузить
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {["Все (12)", "Шаблоны (5)", "Аналитика (3)", "Руководства (2)"].map((l) => (
          <Card key={l}><CardContent className="p-3 text-center"><p className="text-xs font-medium">{l}</p></CardContent></Card>
        ))}
      </div>
      <div className="space-y-2">
        {docs.map((d) => (
          <Card key={d.id} className="transition-shadow hover:shadow-sm">
            <CardContent className="flex items-center gap-3 p-3">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <Badge variant="secondary" className="text-[10px]">{d.category}</Badge>
                  <span>{d.type} · {d.size}</span>
                  <span className="flex items-center gap-1"><Download className="h-3 w-3" />{d.downloads}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Edit3 className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
