"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Member } from "@/lib/supabase/types";
import {
  Search,
  Users,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Edit3,
  Trash2,
  Download,
} from "lucide-react";

const statusConfig = {
  active: { label: "Активен", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  suspended: { label: "Приостановлен", icon: Clock, className: "bg-gold/10 text-gold border-gold/20" },
  expired: { label: "Истёк", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const membershipTypeLabels: Record<Member["membership_type"], string> = {
  standard: "Стандарт",
  premium: "Премиум",
  partner: "Партнёр",
};

function formatMemberSince(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function MembersClient({ initialData }: { initialData: Member[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = initialData.filter((m) => {
    const contact = m.contact_person ?? "";
    const unp = m.unp ?? "";
    const matchSearch =
      !search ||
      m.company.toLowerCase().includes(search.toLowerCase()) ||
      contact.toLowerCase().includes(search.toLowerCase()) ||
      unp.includes(search);
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Управление членами</h1>
          <p className="mt-1 text-sm text-muted-foreground">{initialData.length} организаций</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-9 text-xs rounded-lg">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Экспорт
          </Button>
          <Button size="sm" className="h-9 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Добавить
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по названию, УНП, контакту..." className="h-10 pl-9 text-sm" />
        </div>
        <div className="flex gap-1.5">
          {["all", "active", "suspended", "expired"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/30"
              )}
            >
              {s === "all" ? "Все" : statusConfig[s as keyof typeof statusConfig].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="hidden lg:grid lg:grid-cols-7 bg-muted/50 px-4 py-2.5 text-xs font-semibold">
          <span className="col-span-2">Организация</span>
          <span>Контакт</span>
          <span>Тип</span>
          <span>Член с</span>
          <span>Статус</span>
          <span className="text-right">Действия</span>
        </div>
        {filtered.map((m) => {
          const st = statusConfig[m.status];
          const StatusIcon = st.icon;
          const typeLabel = membershipTypeLabels[m.membership_type];
          return (
            <div key={m.id} className="grid gap-2 border-t border-border px-4 py-3 lg:grid-cols-7 lg:items-center lg:gap-4">
              <div className="col-span-2">
                <p className="text-sm font-medium">{m.company}</p>
                <p className="text-xs text-muted-foreground">УНП: {m.unp ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium">{m.contact_person ?? "—"}</p>
                <p className="text-[10px] text-muted-foreground">{m.contact_email ?? "—"}</p>
              </div>
              <div>
                <Badge variant="secondary" className="text-xs">
                  {typeLabel}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">{formatMemberSince(m.member_since)}</div>
              <div>
                <Badge className={cn("border text-[10px]", st.className)}>
                  <StatusIcon className="mr-0.5 h-3 w-3" />
                  {st.label}
                </Badge>
              </div>
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" type="button">
                  <Edit3 className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" type="button">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <Users className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Члены не найдены</p>
        </div>
      )}
    </div>
  );
}
