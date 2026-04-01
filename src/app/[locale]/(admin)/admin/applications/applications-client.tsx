"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MemberApplication } from "@/lib/supabase/types";
import { approveApplication, rejectApplication } from "@/lib/actions/applications";
import {
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Calendar,
  Building2,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statusConfig = {
  pending: { label: "Новая", icon: Shield, className: "bg-cta/10 text-cta border-cta/20" },
  reviewing: { label: "На рассмотрении", icon: Clock, className: "bg-gold/10 text-gold border-gold/20" },
  approved: { label: "Одобрена", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Отклонена", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

function formatCreatedAt(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function ApplicationsClient({ initialData }: { initialData: MemberApplication[] }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Заявки на вступление</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {initialData.filter((a) => a.status === "pending").length} новых заявок
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {initialData.map((app) => {
          const st = statusConfig[app.status];
          const StatusIcon = st.icon;
          return (
            <Card key={app.id}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-base font-semibold">{app.company_name}</h3>
                      <Badge className={cn("border text-[10px]", st.className)}>
                        <StatusIcon className="mr-0.5 h-3 w-3" />
                        {st.label}
                      </Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        УНП: {app.company_unp ?? "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {app.contact_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {app.contact_email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {app.contact_phone ?? "—"}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {app.membership_type}
                      </Badge>
                      <span>Отрасль: {app.company_activity ?? "—"}</span>
                      <span>Сотрудников: {app.company_employees ?? "—"}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatCreatedAt(app.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                      <Eye className="mr-1 h-3 w-3" />
                      Подробнее
                    </Button>
                    {app.status !== "approved" && (
                      <>
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-success text-success-foreground hover:bg-success/90 rounded-lg"
                          disabled={processingId === app.id}
                          onClick={async () => {
                            setProcessingId(app.id);
                            try {
                              const r = await approveApplication(app.id);
                              if (r.success) router.refresh();
                            } finally {
                              setProcessingId(null);
                            }
                          }}
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Одобрить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs rounded-lg border-destructive/20 text-destructive hover:bg-destructive/10"
                          disabled={processingId === app.id}
                          onClick={async () => {
                            setProcessingId(app.id);
                            try {
                              const r = await rejectApplication(app.id);
                              if (r.success) router.refresh();
                            } finally {
                              setProcessingId(null);
                            }
                          }}
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Отклонить
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
