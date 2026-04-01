"use client";

import { useState } from "react";
import type { ElementType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Document } from "@/lib/supabase/types";
import {
  Search,
  FileText,
  Download,
  Eye,
  FolderOpen,
  File,
  FileSpreadsheet,
  FilePenLine,
} from "lucide-react";

const docCategories = [
  { id: "all", label: "Все" },
  { id: "templates", label: "Шаблоны договоров" },
  { id: "legal", label: "Нормативные акты" },
  { id: "analytics", label: "Аналитика" },
  { id: "membership", label: "Документы членства" },
  { id: "guides", label: "Руководства" },
];

const typeIcons: Record<string, ElementType> = {
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

type DocumentsClientProps = {
  initialData: Document[];
};

export function DocumentsClient({ initialData }: DocumentsClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = initialData.filter((doc) => {
    const matchSearch =
      !search || doc.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || doc.category === activeCategory;
    return matchSearch && matchCategory;
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
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {docCategories.map(({ id, label }) => (
          <button
            key={id}
            type="button"
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
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted",
                    typeColor
                  )}
                >
                  <TypeIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{doc.name}</p>
                    {doc.is_new && (
                      <Badge className="h-4 shrink-0 bg-cta px-1.5 text-[10px] text-cta-foreground">
                        Новое
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{doc.type.toUpperCase()}</span>
                    <span>{doc.size ?? "—"}</span>
                    <span className="hidden sm:inline">
                      {new Date(doc.created_at).toLocaleDateString("ru-RU")}
                    </span>
                    <span className="hidden items-center gap-1 sm:flex">
                      <Download className="h-3 w-3" />
                      {doc.downloads}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
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
