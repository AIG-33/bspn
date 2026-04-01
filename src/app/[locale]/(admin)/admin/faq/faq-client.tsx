"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/supabase/types";
import { createFaqItem, deleteFaqItem, updateFaqItem } from "@/lib/actions/admin";
import { Search, Plus, Edit3, Trash2, HelpCircle, X, Save, Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const FAQ_CATEGORIES = [
  "Регистрация и лицензирование",
  "Налогообложение",
  "Трудовое право",
  "Членство в БСПН",
  "other",
] as const;

const publishedBadge = {
  true: {
    label: "Опубликовано",
    className: "bg-success/10 text-success border-success/20",
    icon: Check,
  },
  false: {
    label: "Не опубликовано",
    className: "bg-gold/10 text-gold border-gold/20",
    icon: null,
  },
} as const;

function emptyForm() {
  return {
    question: "",
    answer: "",
    category: FAQ_CATEGORIES[0] as string,
  };
}

function isPresetCategory(c: string): c is (typeof FAQ_CATEGORIES)[number] {
  return (FAQ_CATEGORIES as readonly string[]).includes(c);
}

function categoryOptionsForEdit(current: string) {
  if (isPresetCategory(current)) return [...FAQ_CATEGORIES];
  return [...FAQ_CATEGORIES, current];
}

function categoryBadgeLabel(category: string) {
  if (category === "other") return "Другое";
  return category;
}

export function AdminFaqClient({ initialData }: { initialData: FaqItem[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);

  const filtered = initialData.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  function openCreate() {
    setEditingId(null);
    setCreateForm(emptyForm());
    setShowCreate(true);
  }

  function closeCreate() {
    setShowCreate(false);
    setCreateForm(emptyForm());
  }

  function startEdit(item: FaqItem) {
    setShowCreate(false);
    setEditingId(item.id);
    setEditForm({
      question: item.question,
      answer: item.answer,
      category: item.category,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyForm());
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteFaqItem(id);
      setDeletingId(null);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось удалить");
        return;
      }
      toast.success("Вопрос удалён");
      router.refresh();
    });
  }

  function handleCreate() {
    const q = createForm.question.trim();
    const a = createForm.answer.trim();
    if (!q || !a) {
      toast.error("Заполните вопрос и ответ");
      return;
    }
    setCreating(true);
    startTransition(async () => {
      const result = await createFaqItem({
        question: q,
        answer: a,
        category: createForm.category,
      });
      setCreating(false);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось создать");
        return;
      }
      toast.success("Вопрос создан");
      closeCreate();
      router.refresh();
    });
  }

  function handleSaveEdit(id: string) {
    const q = editForm.question.trim();
    const a = editForm.answer.trim();
    if (!q || !a) {
      toast.error("Заполните вопрос и ответ");
      return;
    }
    setSavingId(id);
    startTransition(async () => {
      const result = await updateFaqItem(id, {
        question: q,
        answer: a,
        category: editForm.category,
      });
      setSavingId(null);
      if (!result.success) {
        toast.error(result.error ?? "Не удалось сохранить");
        return;
      }
      toast.success("Изменения сохранены");
      cancelEdit();
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление FAQ</h1>
        <Button
          type="button"
          size="sm"
          className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg"
          onClick={openCreate}
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
        <Card className="border-primary/30 shadow-sm">
          <CardContent className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm font-semibold">Новый вопрос</h2>
              <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={closeCreate}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="faq-new-question">Вопрос</Label>
              <Input
                id="faq-new-question"
                value={createForm.question}
                onChange={(e) => setCreateForm((f) => ({ ...f, question: e.target.value }))}
                placeholder="Текст вопроса"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faq-new-answer">Ответ</Label>
              <Textarea
                id="faq-new-answer"
                value={createForm.answer}
                onChange={(e) => setCreateForm((f) => ({ ...f, answer: e.target.value }))}
                placeholder="Текст ответа"
                rows={4}
                className="text-sm resize-y min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Категория</Label>
              <Select
                value={createForm.category}
                onValueChange={(v) =>
                  setCreateForm((f) => ({ ...f, category: v ?? f.category }))
                }
              >
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  {FAQ_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "other" ? "Другое" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                className="h-9 text-xs"
                disabled={isPending && creating}
                onClick={handleCreate}
              >
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Сохранить
              </Button>
              <Button type="button" size="sm" variant="outline" className="h-9 text-xs" onClick={closeCreate}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {filtered.map((item) => {
          const isEditing = editingId === item.id;
          const pub = publishedBadge[item.published ? "true" : "false"];
          const PubIcon = pub.icon;

          if (isEditing) {
            return (
              <Card key={item.id} className="border-primary/30 shadow-sm">
                <CardContent className="space-y-4 p-4">
                  <div className="space-y-2">
                    <Label htmlFor={`faq-edit-q-${item.id}`}>Вопрос</Label>
                    <Input
                      id={`faq-edit-q-${item.id}`}
                      value={editForm.question}
                      onChange={(e) => setEditForm((f) => ({ ...f, question: e.target.value }))}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`faq-edit-a-${item.id}`}>Ответ</Label>
                    <Textarea
                      id={`faq-edit-a-${item.id}`}
                      value={editForm.answer}
                      onChange={(e) => setEditForm((f) => ({ ...f, answer: e.target.value }))}
                      rows={4}
                      className="text-sm resize-y min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select
                      value={editForm.category}
                      onValueChange={(v) =>
                        setEditForm((f) => ({ ...f, category: v ?? f.category }))
                      }
                    >
                      <SelectTrigger className="w-full max-w-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptionsForEdit(editForm.category).map((c) => (
                          <SelectItem key={c} value={c}>
                            {categoryBadgeLabel(c)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      className="h-9 text-xs"
                      disabled={isPending && savingId === item.id}
                      onClick={() => handleSaveEdit(item.id)}
                    >
                      <Save className="mr-1.5 h-3.5 w-3.5" />
                      Сохранить
                    </Button>
                    <Button type="button" size="sm" variant="outline" className="h-9 text-xs" onClick={cancelEdit}>
                      <X className="mr-1.5 h-3.5 w-3.5" />
                      Отмена
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card key={item.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-center gap-3 p-3">
                <HelpCircle className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.question}</p>
                </div>
                <Badge variant="outline" className="border text-[10px] shrink-0 max-w-[140px] truncate">
                  {categoryBadgeLabel(item.category)}
                </Badge>
                <Badge
                  className={cn(
                    "border text-[10px] shrink-0 flex items-center gap-1",
                    pub.className
                  )}
                >
                  {PubIcon ? <PubIcon className="h-3 w-3" /> : null}
                  {pub.label}
                </Badge>
                <div className="flex gap-1 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => startEdit(item)}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-destructive"
                    disabled={isPending && deletingId === item.id}
                    onClick={() => handleDelete(item.id)}
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
