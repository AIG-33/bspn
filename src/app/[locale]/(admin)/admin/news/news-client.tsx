"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/supabase/types";
import { deleteNews } from "@/lib/actions/admin";
import { Search, Plus, Edit3, Trash2, Eye, Calendar, Newspaper } from "lucide-react";
import { toast } from "sonner";

const stConfig: Record<string, { label: string; className: string }> = {
  published: { label: "Опубликовано", className: "bg-success/10 text-success border-success/20" },
  draft: { label: "Черновик", className: "bg-gold/10 text-gold border-gold/20" },
};

function formatNewsDate(value: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function rowFromItem(item: NewsItem) {
  const status = item.published ? "published" : "draft";
  return {
    id: item.id,
    title: item.title,
    date: formatNewsDate(item.date),
    status,
    views: item.views,
  };
}

export function AdminNewsClient({ initialData }: { initialData: NewsItem[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const rows = initialData.map(rowFromItem);
  const filtered = rows.filter((a) => !search || a.title.toLowerCase().includes(search.toLowerCase()));

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteNews(id);
      setDeletingId(null);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось удалить");
        return;
      }
      router.refresh();
    });
  }

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
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {a.date}
                    </span>
                    {a.views > 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {a.views.toLocaleString("ru-RU")}
                      </span>
                    )}
                  </div>
                </div>
                <Badge className={cn("border text-[10px] shrink-0", st.className)}>{st.label}</Badge>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-destructive"
                    disabled={isPending && deletingId === a.id}
                    onClick={() => handleDelete(a.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
