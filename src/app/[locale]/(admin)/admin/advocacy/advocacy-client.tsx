"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { AdvocacyDirection, AdvocacyInitiative } from "@/lib/supabase/types";
import {
  createAdvocacyDirection,
  updateAdvocacyDirection,
  deleteAdvocacyDirection,
  createAdvocacyInitiative,
  updateAdvocacyInitiative,
  deleteAdvocacyInitiative,
} from "@/lib/actions/admin";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Megaphone,
  Target,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

type Tab = "directions" | "initiatives";

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Активно", className: "bg-success/10 text-success border-success/20" },
  discussion: { label: "Обсуждение", className: "bg-gold/10 text-gold border-gold/20" },
  completed: { label: "Реализовано", className: "bg-primary/10 text-primary border-primary/20" },
};

export function AdminAdvocacyClient({
  initialDirections,
  initialInitiatives,
}: {
  initialDirections: AdvocacyDirection[];
  initialInitiatives: AdvocacyInitiative[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("directions");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const [dirForm, setDirForm] = useState({ icon_name: "FileText", title: "", description: "", results: "", sort_order: "0" });
  const [initForm, setInitForm] = useState({ title: "", status: "active", deadline: "", description: "", sort_order: "0" });

  const [editDirForm, setEditDirForm] = useState({ icon_name: "", title: "", description: "", results: "", sort_order: "" });
  const [editInitForm, setEditInitForm] = useState({ title: "", status: "", deadline: "", description: "", sort_order: "" });

  const filteredDirs = initialDirections.filter(
    (d) => !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase())
  );
  const filteredInits = initialInitiatives.filter(
    (i) => !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreateDirection() {
    startTransition(async () => {
      const result = await createAdvocacyDirection({
        icon_name: dirForm.icon_name,
        title: dirForm.title,
        description: dirForm.description,
        results: dirForm.results.split("\n").filter(Boolean),
        sort_order: parseInt(dirForm.sort_order) || 0,
      });
      if (!result.success) { toast.error(result.error ?? "Ошибка"); return; }
      toast.success("Направление создано");
      setCreating(false);
      setDirForm({ icon_name: "FileText", title: "", description: "", results: "", sort_order: "0" });
      router.refresh();
    });
  }

  function handleCreateInitiative() {
    startTransition(async () => {
      const result = await createAdvocacyInitiative({
        title: initForm.title,
        status: initForm.status,
        deadline: initForm.deadline || undefined,
        description: initForm.description,
        sort_order: parseInt(initForm.sort_order) || 0,
      });
      if (!result.success) { toast.error(result.error ?? "Ошибка"); return; }
      toast.success("Инициатива создана");
      setCreating(false);
      setInitForm({ title: "", status: "active", deadline: "", description: "", sort_order: "0" });
      router.refresh();
    });
  }

  function startEditDir(d: AdvocacyDirection) {
    setEditingId(d.id);
    setEditDirForm({
      icon_name: d.icon_name,
      title: d.title,
      description: d.description,
      results: d.results.join("\n"),
      sort_order: String(d.sort_order),
    });
  }

  function startEditInit(i: AdvocacyInitiative) {
    setEditingId(i.id);
    setEditInitForm({
      title: i.title,
      status: i.status,
      deadline: i.deadline ?? "",
      description: i.description,
      sort_order: String(i.sort_order),
    });
  }

  function handleSaveDir(id: string) {
    startTransition(async () => {
      const result = await updateAdvocacyDirection(id, {
        icon_name: editDirForm.icon_name,
        title: editDirForm.title,
        description: editDirForm.description,
        results: editDirForm.results.split("\n").filter(Boolean),
        sort_order: parseInt(editDirForm.sort_order) || 0,
      });
      if (!result.success) { toast.error(result.error ?? "Ошибка"); return; }
      toast.success("Сохранено");
      setEditingId(null);
      router.refresh();
    });
  }

  function handleSaveInit(id: string) {
    startTransition(async () => {
      const result = await updateAdvocacyInitiative(id, {
        title: editInitForm.title,
        status: editInitForm.status,
        deadline: editInitForm.deadline || null,
        description: editInitForm.description,
        sort_order: parseInt(editInitForm.sort_order) || 0,
      });
      if (!result.success) { toast.error(result.error ?? "Ошибка"); return; }
      toast.success("Сохранено");
      setEditingId(null);
      router.refresh();
    });
  }

  function handleDeleteDir(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteAdvocacyDirection(id);
      setDeletingId(null);
      if (!result.success) { toast.error(result.error ?? "Ошибка"); return; }
      toast.success("Удалено");
      router.refresh();
    });
  }

  function handleDeleteInit(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteAdvocacyInitiative(id);
      setDeletingId(null);
      if (!result.success) { toast.error(result.error ?? "Ошибка"); return; }
      toast.success("Удалено");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Управление адвокацией</h1>
        <Button
          size="sm"
          className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg"
          onClick={() => { setCreating(!creating); setEditingId(null); }}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />Создать
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        <button
          className={cn("flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", tab === "directions" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
          onClick={() => { setTab("directions"); setCreating(false); setEditingId(null); setSearch(""); }}
        >
          Направления ({initialDirections.length})
        </button>
        <button
          className={cn("flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", tab === "initiatives" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")}
          onClick={() => { setTab("initiatives"); setCreating(false); setEditingId(null); setSearch(""); }}
        >
          Инициативы ({initialInitiatives.length})
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск..." className="h-10 pl-9 text-sm" />
      </div>

      {/* Create Form */}
      {creating && tab === "directions" && (
        <Card className="border-cta/30">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Новое направление</p>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setCreating(false)}><X className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label htmlFor="cr-icon" className="text-xs">Иконка</Label><Input id="cr-icon" value={dirForm.icon_name} onChange={(e) => setDirForm({ ...dirForm, icon_name: e.target.value })} className="h-8 text-xs" placeholder="FileText" /></div>
              <div><Label htmlFor="cr-order" className="text-xs">Порядок</Label><Input id="cr-order" value={dirForm.sort_order} onChange={(e) => setDirForm({ ...dirForm, sort_order: e.target.value })} className="h-8 text-xs" type="number" /></div>
            </div>
            <div><Label htmlFor="cr-title" className="text-xs">Заголовок</Label><Input id="cr-title" value={dirForm.title} onChange={(e) => setDirForm({ ...dirForm, title: e.target.value })} className="h-8 text-xs" /></div>
            <div><Label htmlFor="cr-desc" className="text-xs">Описание</Label><Textarea id="cr-desc" value={dirForm.description} onChange={(e) => setDirForm({ ...dirForm, description: e.target.value })} className="text-xs min-h-16" /></div>
            <div><Label htmlFor="cr-results" className="text-xs">Результаты (по одному на строку)</Label><Textarea id="cr-results" value={dirForm.results} onChange={(e) => setDirForm({ ...dirForm, results: e.target.value })} className="text-xs min-h-16" /></div>
            <Button size="sm" className="h-8 text-xs" onClick={handleCreateDirection} disabled={isPending || !dirForm.title}>
              <Save className="mr-1.5 h-3.5 w-3.5" />Сохранить
            </Button>
          </CardContent>
        </Card>
      )}

      {creating && tab === "initiatives" && (
        <Card className="border-cta/30">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Новая инициатива</p>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setCreating(false)}><X className="h-4 w-4" /></Button>
            </div>
            <div><Label htmlFor="ci-title" className="text-xs">Заголовок</Label><Input id="ci-title" value={initForm.title} onChange={(e) => setInitForm({ ...initForm, title: e.target.value })} className="h-8 text-xs" /></div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <Label htmlFor="ci-status" className="text-xs">Статус</Label>
                <select id="ci-status" value={initForm.status} onChange={(e) => setInitForm({ ...initForm, status: e.target.value })} className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs">
                  <option value="active">Активно</option>
                  <option value="discussion">Обсуждение</option>
                  <option value="completed">Реализовано</option>
                </select>
              </div>
              <div><Label htmlFor="ci-deadline" className="text-xs">Срок</Label><Input id="ci-deadline" value={initForm.deadline} onChange={(e) => setInitForm({ ...initForm, deadline: e.target.value })} className="h-8 text-xs" placeholder="Q2 2026" /></div>
              <div><Label htmlFor="ci-order" className="text-xs">Порядок</Label><Input id="ci-order" value={initForm.sort_order} onChange={(e) => setInitForm({ ...initForm, sort_order: e.target.value })} className="h-8 text-xs" type="number" /></div>
            </div>
            <div><Label htmlFor="ci-desc" className="text-xs">Описание</Label><Textarea id="ci-desc" value={initForm.description} onChange={(e) => setInitForm({ ...initForm, description: e.target.value })} className="text-xs min-h-16" /></div>
            <Button size="sm" className="h-8 text-xs" onClick={handleCreateInitiative} disabled={isPending || !initForm.title}>
              <Save className="mr-1.5 h-3.5 w-3.5" />Сохранить
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Directions List */}
      {tab === "directions" && (
        <div className="space-y-2">
          {filteredDirs.map((d) =>
            editingId === d.id ? (
              <Card key={d.id} className="border-primary/30">
                <CardContent className="space-y-3 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div><Label className="text-xs">Иконка</Label><Input value={editDirForm.icon_name} onChange={(e) => setEditDirForm({ ...editDirForm, icon_name: e.target.value })} className="h-8 text-xs" /></div>
                    <div><Label className="text-xs">Порядок</Label><Input value={editDirForm.sort_order} onChange={(e) => setEditDirForm({ ...editDirForm, sort_order: e.target.value })} className="h-8 text-xs" type="number" /></div>
                  </div>
                  <div><Label className="text-xs">Заголовок</Label><Input value={editDirForm.title} onChange={(e) => setEditDirForm({ ...editDirForm, title: e.target.value })} className="h-8 text-xs" /></div>
                  <div><Label className="text-xs">Описание</Label><Textarea value={editDirForm.description} onChange={(e) => setEditDirForm({ ...editDirForm, description: e.target.value })} className="text-xs min-h-16" /></div>
                  <div><Label className="text-xs">Результаты (по строкам)</Label><Textarea value={editDirForm.results} onChange={(e) => setEditDirForm({ ...editDirForm, results: e.target.value })} className="text-xs min-h-16" /></div>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveDir(d.id)} disabled={isPending}><Save className="mr-1 h-3 w-3" />Сохранить</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}><X className="mr-1 h-3 w-3" />Отмена</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card key={d.id} className="transition-shadow hover:shadow-sm">
                <CardContent className="flex items-center gap-3 p-3">
                  <Megaphone className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{d.title}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{d.icon_name} · {d.results.length} результат(ов)</p>
                  </div>
                  <Badge className={cn("border text-[10px] shrink-0", d.published ? "bg-success/10 text-success border-success/20" : "bg-gold/10 text-gold border-gold/20")}>
                    {d.published ? "Опубл." : "Скрыто"}
                  </Badge>
                  <div className="flex gap-1 shrink-0">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => startEditDir(d)}><Edit3 className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" disabled={isPending && deletingId === d.id} onClick={() => handleDeleteDir(d.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            )
          )}
          {filteredDirs.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">Нет направлений</p>}
        </div>
      )}

      {/* Initiatives List */}
      {tab === "initiatives" && (
        <div className="space-y-2">
          {filteredInits.map((i) =>
            editingId === i.id ? (
              <Card key={i.id} className="border-primary/30">
                <CardContent className="space-y-3 p-4">
                  <div><Label className="text-xs">Заголовок</Label><Input value={editInitForm.title} onChange={(e) => setEditInitForm({ ...editInitForm, title: e.target.value })} className="h-8 text-xs" /></div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <Label className="text-xs">Статус</Label>
                      <select value={editInitForm.status} onChange={(e) => setEditInitForm({ ...editInitForm, status: e.target.value })} className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs">
                        <option value="active">Активно</option>
                        <option value="discussion">Обсуждение</option>
                        <option value="completed">Реализовано</option>
                      </select>
                    </div>
                    <div><Label className="text-xs">Срок</Label><Input value={editInitForm.deadline} onChange={(e) => setEditInitForm({ ...editInitForm, deadline: e.target.value })} className="h-8 text-xs" /></div>
                    <div><Label className="text-xs">Порядок</Label><Input value={editInitForm.sort_order} onChange={(e) => setEditInitForm({ ...editInitForm, sort_order: e.target.value })} className="h-8 text-xs" type="number" /></div>
                  </div>
                  <div><Label className="text-xs">Описание</Label><Textarea value={editInitForm.description} onChange={(e) => setEditInitForm({ ...editInitForm, description: e.target.value })} className="text-xs min-h-16" /></div>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveInit(i.id)} disabled={isPending}><Save className="mr-1 h-3 w-3" />Сохранить</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}><X className="mr-1 h-3 w-3" />Отмена</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card key={i.id} className="transition-shadow hover:shadow-sm">
                <CardContent className="flex items-center gap-3 p-3">
                  <Target className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{i.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{i.deadline ?? "—"}</p>
                  </div>
                  {statusConfig[i.status] && (
                    <Badge className={cn("border text-[10px] shrink-0", statusConfig[i.status].className)}>
                      {statusConfig[i.status].label}
                    </Badge>
                  )}
                  <Badge className={cn("border text-[10px] shrink-0", i.published ? "bg-success/10 text-success border-success/20" : "bg-gold/10 text-gold border-gold/20")}>
                    {i.published ? "Опубл." : "Скрыто"}
                  </Badge>
                  <div className="flex gap-1 shrink-0">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => startEditInit(i)}><Edit3 className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" disabled={isPending && deletingId === i.id} onClick={() => handleDeleteInit(i.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            )
          )}
          {filteredInits.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">Нет инициатив</p>}
        </div>
      )}
    </div>
  );
}
