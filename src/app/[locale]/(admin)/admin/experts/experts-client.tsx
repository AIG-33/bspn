"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Expert } from "@/lib/supabase/types";
import { createExpert, deleteExpert, updateExpert } from "@/lib/actions/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Search, Plus, Edit3, Trash2, UserCheck, X, Save, Star, Check } from "lucide-react";

type Draft = {
  name: string;
  title: string;
  specializations: string;
  experience: string;
  education: string;
  bio: string;
  available: boolean;
};

function emptyDraft(available = true): Draft {
  return {
    name: "",
    title: "",
    specializations: "",
    experience: "",
    education: "",
    bio: "",
    available,
  };
}

function draftFromExpert(e: Expert): Draft {
  return {
    name: e.name,
    title: e.title ?? "",
    specializations: e.specializations.join(", "),
    experience: e.experience != null ? String(e.experience) : "",
    education: e.education ?? "",
    bio: e.bio ?? "",
    available: e.available,
  };
}

function parseSpecs(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseExperience(s: string): number | undefined {
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

export function AdminExpertsClient({ initialData }: { initialData: Expert[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [createDraft, setCreateDraft] = useState<Draft>(() => emptyDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Draft | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const filtered = initialData.filter((e) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      (e.title ?? "").toLowerCase().includes(q) ||
      e.specializations.some((s) => s.toLowerCase().includes(q)) ||
      (e.bio ?? "").toLowerCase().includes(q)
    );
  });

  function closeCreate() {
    setShowCreate(false);
    setCreateDraft(emptyDraft());
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft(null);
  }

  function handleCreate() {
    if (!createDraft.name.trim()) {
      toast.error("Укажите имя");
      return;
    }
    setActionId("__create__");
    startTransition(async () => {
      const result = await createExpert({
        name: createDraft.name.trim(),
        title: createDraft.title.trim() || undefined,
        specializations: parseSpecs(createDraft.specializations),
        experience: parseExperience(createDraft.experience),
        education: createDraft.education.trim() || undefined,
        bio: createDraft.bio.trim() || undefined,
        available: createDraft.available,
      });
      setActionId(null);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось создать");
        return;
      }
      toast.success("Эксперт создан");
      closeCreate();
      router.refresh();
    });
  }

  function handleSaveEdit(id: string) {
    if (!editDraft) return;
    if (!editDraft.name.trim()) {
      toast.error("Укажите имя");
      return;
    }
    setActionId(id);
    startTransition(async () => {
      const result = await updateExpert(id, {
        name: editDraft.name.trim(),
        title: editDraft.title.trim() || null,
        specializations: parseSpecs(editDraft.specializations),
        experience: parseExperience(editDraft.experience) ?? null,
        education: editDraft.education.trim() || null,
        bio: editDraft.bio.trim() || null,
        available: editDraft.available,
      });
      setActionId(null);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось сохранить");
        return;
      }
      toast.success("Сохранено");
      cancelEdit();
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    setActionId(id);
    startTransition(async () => {
      const result = await deleteExpert(id);
      setActionId(null);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось удалить");
        return;
      }
      toast.success("Удалено");
      if (editingId === id) cancelEdit();
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление экспертами</h1>
        <Button
          type="button"
          size="sm"
          className="h-9 w-fit text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg"
          onClick={() => {
            setShowCreate(true);
            setCreateDraft(emptyDraft());
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
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Новый эксперт</p>
              <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={closeCreate}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ExpertFormFields idPrefix="create" draft={createDraft} onChange={setCreateDraft} />
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={closeCreate}>
                Отмена
              </Button>
              <Button
                type="button"
                size="sm"
                className="h-8 text-xs bg-cta text-cta-foreground hover:bg-cta/90"
                disabled={isPending && actionId === "__create__"}
                onClick={handleCreate}
              >
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Сохранить
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {filtered.map((expert) => {
          const isEditing = editingId === expert.id && editDraft != null;

          if (isEditing && editDraft) {
            return (
              <Card key={expert.id} className="border-primary/30">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    Редактирование
                  </div>
                  <ExpertFormFields idPrefix={`edit-${expert.id}`} draft={editDraft} onChange={setEditDraft} />
                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={cancelEdit}>
                      <X className="mr-1.5 h-3.5 w-3.5" />
                      Отмена
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 text-xs bg-cta text-cta-foreground hover:bg-cta/90"
                      disabled={isPending && actionId === expert.id}
                      onClick={() => handleSaveEdit(expert.id)}
                    >
                      <Save className="mr-1.5 h-3.5 w-3.5" />
                      Сохранить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card key={expert.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <div className="flex shrink-0 justify-center sm:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <UserCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-medium">{expert.name}</p>
                        <p className="text-sm text-muted-foreground">{expert.title ?? "—"}</p>
                      </div>
                      <Badge
                        className={cn(
                          "w-fit border text-[10px]",
                          expert.available
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-gold/10 text-gold border-gold/20"
                        )}
                      >
                        {expert.available ? (
                          <>
                            <Check className="mr-0.5 h-3 w-3" />
                            Доступен
                          </>
                        ) : (
                          "Недоступен"
                        )}
                      </Badge>
                    </div>
                    {expert.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {expert.specializations.map((s) => (
                          <Badge key={s} variant="secondary" className="text-[10px] font-normal">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Опыт: {expert.experience != null ? `${expert.experience} лет` : "—"}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-gold" />
                        <span className="font-medium text-foreground">{expert.rating.toFixed(1)}</span>
                      </span>
                      <span>Консультаций: {expert.consultations.toLocaleString("ru-RU")}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 justify-end gap-1 sm:flex-col sm:justify-start">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      disabled={isPending}
                      onClick={() => {
                        setEditingId(expert.id);
                        setEditDraft(draftFromExpert(expert));
                      }}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive"
                      disabled={isPending && actionId === expert.id}
                      onClick={() => handleDelete(expert.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <UserCheck className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Эксперты не найдены</p>
        </div>
      )}
    </div>
  );
}

function ExpertFormFields({
  idPrefix,
  draft,
  onChange,
}: {
  idPrefix: string;
  draft: Draft;
  onChange: (next: Draft) => void;
}) {
  const pid = (s: string) => `${idPrefix}-${s}`;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor={pid("name")}>Имя *</Label>
        <Input
          id={pid("name")}
          value={draft.name}
          onChange={(e) => onChange({ ...draft, name: e.target.value })}
          placeholder="ФИО"
          className="h-9 text-sm"
          required
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor={pid("title")}>Должность</Label>
        <Input
          id={pid("title")}
          value={draft.title}
          onChange={(e) => onChange({ ...draft, title: e.target.value })}
          placeholder="Название должности"
          className="h-9 text-sm"
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor={pid("specs")}>Специализации (через запятую)</Label>
        <Input
          id={pid("specs")}
          value={draft.specializations}
          onChange={(e) => onChange({ ...draft, specializations: e.target.value })}
          placeholder="Налоги, корпоративное право..."
          className="h-9 text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={pid("exp")}>Опыт (лет)</Label>
        <Input
          id={pid("exp")}
          type="number"
          min={0}
          value={draft.experience}
          onChange={(e) => onChange({ ...draft, experience: e.target.value })}
          placeholder="0"
          className="h-9 text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={pid("edu")}>Образование</Label>
        <Input
          id={pid("edu")}
          value={draft.education}
          onChange={(e) => onChange({ ...draft, education: e.target.value })}
          placeholder="ВУЗ, степень..."
          className="h-9 text-sm"
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor={pid("bio")}>Биография</Label>
        <Textarea
          id={pid("bio")}
          value={draft.bio}
          onChange={(e) => onChange({ ...draft, bio: e.target.value })}
          placeholder="Кратко о специалисте"
          className="min-h-[88px] text-sm"
        />
      </div>
      <div className="flex items-center gap-2 sm:col-span-2">
        <input
          id={pid("available")}
          type="checkbox"
          checked={draft.available}
          onChange={(e) => onChange({ ...draft, available: e.target.checked })}
          className="h-4 w-4 rounded border-input accent-primary"
        />
        <Label htmlFor={pid("available")} className="font-normal text-muted-foreground">
          Доступен для консультаций
        </Label>
      </div>
    </div>
  );
}
