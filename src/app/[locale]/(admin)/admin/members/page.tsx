"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  Users,
  Plus,
  MoreHorizontal,
  Building2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Edit3,
  Trash2,
  Download,
  Filter,
} from "lucide-react";

interface Member {
  id: string;
  company: string;
  unp: string;
  contact: string;
  email: string;
  phone: string;
  type: string;
  since: string;
  status: "active" | "suspended" | "expired";
}

const statusConfig = {
  active: { label: "Активен", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  suspended: { label: "Приостановлен", icon: Clock, className: "bg-gold/10 text-gold border-gold/20" },
  expired: { label: "Истёк", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const members: Member[] = [
  { id: "1", company: "ООО «ТехноСтар»", unp: "190456789", contact: "Иванов А.П.", email: "ivanov@technostar.by", phone: "+375 29 123-45-67", type: "Полное", since: "15.03.2024", status: "active" },
  { id: "2", company: "ЗАО «БелПромСтрой»", unp: "100234567", contact: "Сидорчук В.И.", email: "info@bps.by", phone: "+375 17 234-56-78", type: "Полное", since: "01.06.2020", status: "active" },
  { id: "3", company: "ИП Козловский А.В.", unp: "290567890", contact: "Козловский А.В.", email: "kozl@mail.by", phone: "+375 33 456-78-90", type: "Ассоциированное", since: "10.01.2025", status: "active" },
  { id: "4", company: "ООО «Логистик Плюс»", unp: "190678901", contact: "Мельник О.С.", email: "melnik@logplus.by", phone: "+375 29 567-89-01", type: "Солидарное", since: "22.09.2023", status: "active" },
  { id: "5", company: "ЧУП «ЭкоФарм»", unp: "390789012", contact: "Романова Н.В.", email: "romanova@ecofarm.by", phone: "+375 44 678-90-12", type: "Ассоциированное", since: "15.11.2024", status: "active" },
  { id: "6", company: "ОАО «Минский завод»", unp: "100890123", contact: "Петров С.А.", email: "petrov@minzavod.by", phone: "+375 17 789-01-23", type: "Полное", since: "01.03.2018", status: "active" },
  { id: "7", company: "ООО «СтройИнвест»", unp: "190901234", contact: "Григорьев Д.Л.", email: "grigoriev@si.by", phone: "+375 29 890-12-34", type: "Полное", since: "08.07.2022", status: "suspended" },
  { id: "8", company: "ИП Новиков К.Б.", unp: "290012345", contact: "Новиков К.Б.", email: "novikov@mail.by", phone: "+375 33 901-23-45", type: "Ассоциированное", since: "20.05.2024", status: "expired" },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = members.filter((m) => {
    const matchSearch =
      !search ||
      m.company.toLowerCase().includes(search.toLowerCase()) ||
      m.contact.toLowerCase().includes(search.toLowerCase()) ||
      m.unp.includes(search);
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Управление членами</h1>
          <p className="mt-1 text-sm text-muted-foreground">{members.length} организаций</p>
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
          return (
            <div key={m.id} className="grid gap-2 border-t border-border px-4 py-3 lg:grid-cols-7 lg:items-center lg:gap-4">
              <div className="col-span-2">
                <p className="text-sm font-medium">{m.company}</p>
                <p className="text-xs text-muted-foreground">УНП: {m.unp}</p>
              </div>
              <div>
                <p className="text-xs font-medium">{m.contact}</p>
                <p className="text-[10px] text-muted-foreground">{m.email}</p>
              </div>
              <div>
                <Badge variant="secondary" className="text-xs">{m.type}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">{m.since}</div>
              <div>
                <Badge className={cn("border text-[10px]", st.className)}>
                  <StatusIcon className="mr-0.5 h-3 w-3" />
                  {st.label}
                </Badge>
              </div>
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Edit3 className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
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
