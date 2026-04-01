"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  FileText,
  Download,
  Eye,
  Calendar,
  FolderOpen,
  File,
  FileSpreadsheet,
  FilePenLine,
  Star,
  Clock,
  Filter,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  category: string;
  type: "pdf" | "docx" | "xlsx" | "template";
  size: string;
  date: string;
  downloads: number;
  isNew: boolean;
  isFavorite: boolean;
}

const docCategories = [
  { id: "all", label: "Все" },
  { id: "templates", label: "Шаблоны договоров" },
  { id: "legal", label: "Нормативные акты" },
  { id: "analytics", label: "Аналитика" },
  { id: "membership", label: "Документы членства" },
  { id: "guides", label: "Руководства" },
];

const documents: Document[] = [
  {
    id: "1",
    name: "Шаблон договора поставки (2026)",
    category: "templates",
    type: "docx",
    size: "124 КБ",
    date: "2026-03-20",
    downloads: 342,
    isNew: true,
    isFavorite: true,
  },
  {
    id: "2",
    name: "Шаблон трудового контракта",
    category: "templates",
    type: "docx",
    size: "98 КБ",
    date: "2026-03-15",
    downloads: 567,
    isNew: true,
    isFavorite: false,
  },
  {
    id: "3",
    name: "Обзор изменений НК — 2026",
    category: "analytics",
    type: "pdf",
    size: "2.3 МБ",
    date: "2026-03-10",
    downloads: 890,
    isNew: true,
    isFavorite: true,
  },
  {
    id: "4",
    name: "Свидетельство о членстве БСПН",
    category: "membership",
    type: "pdf",
    size: "156 КБ",
    date: "2024-03-15",
    downloads: 3,
    isNew: false,
    isFavorite: false,
  },
  {
    id: "5",
    name: "Политика обработки персональных данных (шаблон)",
    category: "templates",
    type: "docx",
    size: "87 КБ",
    date: "2026-02-28",
    downloads: 423,
    isNew: false,
    isFavorite: false,
  },
  {
    id: "6",
    name: "Руководство по применению УСН",
    category: "guides",
    type: "pdf",
    size: "1.8 МБ",
    date: "2026-02-20",
    downloads: 678,
    isNew: false,
    isFavorite: true,
  },
  {
    id: "7",
    name: "Таблица сравнения систем налогообложения",
    category: "analytics",
    type: "xlsx",
    size: "45 КБ",
    date: "2026-02-15",
    downloads: 234,
    isNew: false,
    isFavorite: false,
  },
  {
    id: "8",
    name: "Закон о защите ПД — краткий гид",
    category: "guides",
    type: "pdf",
    size: "950 КБ",
    date: "2026-02-10",
    downloads: 512,
    isNew: false,
    isFavorite: false,
  },
  {
    id: "9",
    name: "Шаблон акта приёмки работ",
    category: "templates",
    type: "docx",
    size: "67 КБ",
    date: "2026-01-25",
    downloads: 198,
    isNew: false,
    isFavorite: false,
  },
  {
    id: "10",
    name: "Устав БСПН (действующая редакция)",
    category: "legal",
    type: "pdf",
    size: "340 КБ",
    date: "2025-12-01",
    downloads: 89,
    isNew: false,
    isFavorite: false,
  },
  {
    id: "11",
    name: "Счёт на членский взнос Q2 2026",
    category: "membership",
    type: "pdf",
    size: "78 КБ",
    date: "2026-04-01",
    downloads: 1,
    isNew: true,
    isFavorite: false,
  },
  {
    id: "12",
    name: "Индекс деловой активности Q1 2026",
    category: "analytics",
    type: "pdf",
    size: "4.2 МБ",
    date: "2026-03-28",
    downloads: 156,
    isNew: true,
    isFavorite: false,
  },
];

const typeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  docx: FilePenLine,
  xlsx: FileSpreadsheet,
  template: File,
};

const typeColors: Record<string, string> = {
  pdf: "text-cta",
  docx: "text-primary",
  xlsx: "text-success",
  template: "text-gold",
};

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);

  const filtered = documents.filter((doc) => {
    const matchSearch =
      !search || doc.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || doc.category === activeCategory;
    const matchFavorite = !showFavorites || doc.isFavorite;
    return matchSearch && matchCategory && matchFavorite;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Документы</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Библиотека шаблонов, аналитики и документов членства
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск документов..."
            className="h-10 pl-9 text-sm"
          />
        </div>
        <Button
          variant={showFavorites ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFavorites(!showFavorites)}
          className="h-10 rounded-xl"
        >
          <Star className={cn("mr-1.5 h-4 w-4", showFavorites && "fill-current")} />
          Избранное
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {docCategories.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              activeCategory === id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/30"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "документ" : "документов"}
      </p>

      {/* Documents List */}
      <div className="space-y-2">
        {filtered.map((doc) => {
          const TypeIcon = typeIcons[doc.type] || File;
          const typeColor = typeColors[doc.type] || "text-muted-foreground";

          return (
            <Card key={doc.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-center gap-3 p-3">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted", typeColor)}>
                  <TypeIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    {doc.isNew && (
                      <Badge className="bg-cta text-cta-foreground text-[10px] h-4 px-1.5 shrink-0">
                        Новое
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{doc.type.toUpperCase()}</span>
                    <span>{doc.size}</span>
                    <span className="hidden sm:inline">
                      {new Date(doc.date).toLocaleDateString("ru-RU")}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {doc.downloads}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Star className={cn("h-4 w-4", doc.isFavorite && "fill-gold text-gold")} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Документы не найдены</p>
        </div>
      )}
    </div>
  );
}
