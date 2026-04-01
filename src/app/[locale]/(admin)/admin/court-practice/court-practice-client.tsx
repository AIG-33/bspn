"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { CourtCase } from "@/lib/supabase/types";
import { createCourtCase, deleteCourtCase, updateCourtCase } from "@/lib/actions/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search, Plus, Edit3, Trash2, Scale, X, Save, Calendar, Check } from "lucide-react";

type CaseStatus = CourtCase["status"];

const statusLabels: Record<CaseStatus, string> = {
  won: "Выиграно",
  lost: "Проиграно",
  partial: "Частично",
  pending: "На рассмотрении",
};

const statusBadgeClass: Record<CaseStatus, string> = {
  won: "bg-success/10 text-success border-success/20",
  lost: "bg-destructive/10 text-destructive border-destructive/20",
  partial: "bg-gold/10 text-gold border-gold/20",
  pending: "bg-muted text-muted-foreground border-border",
};

function formatCaseDate(value: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function emptyForm() {
  return {
    title: "",
    category: "",
    court: "",
    status: "pending" as CaseStatus,
    amount: "",
    description: "",
    tags: "",
  };
}

type FormState = ReturnType<typeof emptyForm>;

function formFromCase(c: CourtCase): FormState {
  return {
    title: c.title,
    category: c.category,
    court: c.court ?? "",
    status: c.status,
    amount: c.amount ?? "",
    description: c.description ?? "",
    tags: c.tags.join(", "),
  };
}

export function AdminCourtPracticeClient({ initialData }: { initialData: CourtCase[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = initialData.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const desc = c.description ?? "";
    return (
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.court ?? "").toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  function startEdit(c: CourtCase) {
    setEditingId(c.id);
    setEditForm(formFromCase(c));
    setShowCreate(false);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteCourtCase(id);
      setDeletingId(null);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось удалить");
        return;
      }
      toast.success("Дело удалено");
      if (editingId === id) setEditingId(null);
      router.refresh();
    });
  }

  function handleCreateSubmit(e: FormEvent) {
    e.preventDefault();
    const title = createForm.title.trim();
    if (!title) {
      toast.error("Укажите название дела");
      return;
    }
    startTransition(async () => {
      const result = await createCourtCase({
        title,
        category: createForm.category.trim() || "other",
        court: createForm.court.trim() || undefined,
        status: createForm.status,
        amount: createForm.amount.trim() || undefined,
        description: createForm.description.trim() || undefined,
        tags: parseTags(createForm.tags),
      });
      if (!result.success) {
        toast.error(result.error ?? "Не удалось создать");
        return;
      }
      toast.success("Дело создано");
      setCreateForm(emptyForm());
      setShowCreate(false);
      router.refresh();
    });
  }

  function handleEditSubmit(e: FormEvent, id: string) {
    e.preventDefault();
    const title = editForm.title.trim();
    if (!title) {
      toast.error("Укажите название дела");
      return;
    }
    startTransition(async () => {
      const result = await updateCourtCase(id, {
        title,
        category: editForm.category.trim() || "other",
        court: editForm.court.trim() || null,
        status: editForm.status,
        amount: editForm.amount.trim() || null,
        description: editForm.description.trim() || null,
        tags: parseTags(editForm.tags),
      });
      if (!result.success) {
        toast.error(result.error ?? "Не удалось сохранить");
        return;
      }
      toast.success("Изменения сохранены");
      setEditingId(null);
      router.refresh();
    });
  }

  const busy = isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление судебной практикой</h1>
        <Button
          type="button"
          size="sm"
          className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg"
          onClick={() => {
            setShowCreate((v) => !v);
            setEditingId(null);
            if (!showCreate) setCreateForm(emptyForm());
          }}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Создать
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск..."
          className="h-10 pl-9 text-sm"
        />
      </div>

      {showCreate && (
        <Card className="border-primary/30">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Новое дело</p>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setShowCreate(false)}
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Название *</label>
                  <Input
                    value={createForm.title}
                    onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                    className="mt-1 h-9 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Категория</label>
                  <Input
                    value={createForm.category}
                    onChange={(e) => setCreateForm((f) => ({ ...f, category: e.target.value }))}
                    className="mt-1 h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Суд</label>
                  <Input
                    value={createForm.court}
                    onChange={(e) => setCreateForm((f) => ({ ...f, court: e.target.value }))}
                    className="mt-1 h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Статус</label>
                  <Select
                    value={createForm.status}
                    onValueChange={(v) =>
                      setCreateForm((f) => ({ ...f, status: v as CaseStatus }))
                    }
                  >
                    <SelectTrigger className="mt-1 h-9 w-full text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(statusLabels) as CaseStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>
                          {statusLabels[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Сумма</label>
                  <Input
                    value={createForm.amount}
                    onChange={(e) => setCreateForm((f) => ({ ...f, amount: e.target.value }))}
                    className="mt-1 h-9 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Описание</label>
                  <Textarea
                    value={createForm.description}
                    onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                    className="mt-1 min-h-[80px] text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Теги (через запятую)</label>
                  <Input
                    value={createForm.tags}
                    onChange={(e) => setCreateForm((f) => ({ ...f, tags: e.target.value }))}
                    className="mt-1 h-9 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={() => setShowCreate(false)}>
                  Отмена
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 text-xs bg-cta text-cta-foreground hover:bg-cta/90"
                  disabled={busy}
                >
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Сохранить
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {filtered.map((c) => {
          const isEditing = editingId === c.id;
          const statusClass = statusBadgeClass[c.status];

          if (isEditing) {
            return (
              <Card key={c.id} className="border-primary/30">
                <CardContent className="p-4">
                  <form onSubmit={(e) => handleEditSubmit(e, c.id)} className="space-y-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-medium">Редактирование</p>
                      <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={cancelEdit} aria-label="Отмена">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">Название *</label>
                        <Input
                          value={editForm.title}
                          onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                          className="mt-1 h-9 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Категория</label>
                        <Input
                          value={editForm.category}
                          onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                          className="mt-1 h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Суд</label>
                        <Input
                          value={editForm.court}
                          onChange={(e) => setEditForm((f) => ({ ...f, court: e.target.value }))}
                          className="mt-1 h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Статус</label>
                        <Select
                          value={editForm.status}
                          onValueChange={(v) => setEditForm((f) => ({ ...f, status: v as CaseStatus }))}
                        >
                          <SelectTrigger className="mt-1 h-9 w-full text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(Object.keys(statusLabels) as CaseStatus[]).map((s) => (
                              <SelectItem key={s} value={s}>
                                {statusLabels[s]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Сумма</label>
                        <Input
                          value={editForm.amount}
                          onChange={(e) => setEditForm((f) => ({ ...f, amount: e.target.value }))}
                          className="mt-1 h-9 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">Описание</label>
                        <Textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                          className="mt-1 min-h-[80px] text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">Теги (через запятую)</label>
                        <Input
                          value={editForm.tags}
                          onChange={(e) => setEditForm((f) => ({ ...f, tags: e.target.value }))}
                          className="mt-1 h-9 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={cancelEdit}>
                        Отмена
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        className="h-8 text-xs bg-cta text-cta-foreground hover:bg-cta/90"
                        disabled={busy}
                      >
                        <Save className="mr-1.5 h-3.5 w-3.5" />
                        Сохранить
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card key={c.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex flex-col gap-3 p-3 sm:flex-row sm:items-start">
                <Scale className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {c.category}
                    </Badge>
                    <Badge className={cn("border text-[10px]", statusClass)}>{statusLabels[c.status]}</Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px]",
                        c.published
                          ? "border-success/30 bg-success/5 text-success"
                          : "text-muted-foreground"
                      )}
                    >
                      {c.published ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Опубликовано
                        </span>
                      ) : (
                        "Скрыто"
                      )}
                    </Badge>
                  </div>
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                    {c.court ? <span>{c.court}</span> : null}
                    {c.court ? <span aria-hidden>·</span> : null}
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3 shrink-0" />
                      {formatCaseDate(c.date)}
                    </span>
                  </p>
                  {c.amount ? <p className="text-xs font-medium text-foreground">{c.amount}</p> : null}
                </div>
                <div className="flex shrink-0 gap-1 self-end sm:self-start">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => startEdit(c)}
                    disabled={busy}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-destructive"
                    disabled={busy && deletingId === c.id}
                    onClick={() => handleDelete(c.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">Ничего не найдено</div>
      )}
    </div>
  );
}
