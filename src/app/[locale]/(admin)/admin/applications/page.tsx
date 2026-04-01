"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

const applications = [
  { id: "1", company: "ООО «ИнноТех»", unp: "190111222", contact: "Савченко И.М.", email: "savchenko@innotech.by", phone: "+375 29 111-22-33", type: "Полное членство", date: "31.03.2026", industry: "IT", employees: "45", status: "new" as const },
  { id: "2", company: "ИП Козловский А.В.", unp: "290333444", contact: "Козловский А.В.", email: "kozl@mail.by", phone: "+375 33 333-44-55", type: "Ассоциированное", date: "30.03.2026", industry: "Торговля", employees: "3", status: "new" as const },
  { id: "3", company: "ЗАО «БелПромСтрой»", unp: "100555666", contact: "Сидорчук В.И.", email: "info@bps.by", phone: "+375 17 555-66-77", type: "Полное членство", date: "29.03.2026", industry: "Строительство", employees: "120", status: "review" as const },
  { id: "4", company: "ООО «Логистик Плюс»", unp: "190777888", contact: "Мельник О.С.", email: "melnik@logplus.by", phone: "+375 29 777-88-99", type: "Солидарное", date: "28.03.2026", industry: "Логистика", employees: "67", status: "new" as const },
  { id: "5", company: "ЧУП «ЭкоФарм»", unp: "390999000", contact: "Романова Н.В.", email: "romanova@ecofarm.by", phone: "+375 44 999-00-11", type: "Ассоциированное", date: "27.03.2026", industry: "Фармацевтика", employees: "28", status: "approved" as const },
];

const statusConfig = {
  new: { label: "Новая", icon: Shield, className: "bg-cta/10 text-cta border-cta/20" },
  review: { label: "На рассмотрении", icon: Clock, className: "bg-gold/10 text-gold border-gold/20" },
  approved: { label: "Одобрена", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Отклонена", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Заявки на вступление</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {applications.filter((a) => a.status === "new").length} новых заявок
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map((app) => {
          const st = statusConfig[app.status];
          const StatusIcon = st.icon;
          return (
            <Card key={app.id}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-base font-semibold">{app.company}</h3>
                      <Badge className={cn("border text-[10px]", st.className)}>
                        <StatusIcon className="mr-0.5 h-3 w-3" />
                        {st.label}
                      </Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />УНП: {app.unp}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{app.contact}</span>
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{app.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{app.phone}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">{app.type}</Badge>
                      <span>Отрасль: {app.industry}</span>
                      <span>Сотрудников: {app.employees}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{app.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                      <Eye className="mr-1 h-3 w-3" />
                      Подробнее
                    </Button>
                    {app.status !== "approved" && (
                      <>
                        <Button size="sm" className="h-8 text-xs bg-success text-success-foreground hover:bg-success/90 rounded-lg">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Одобрить
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg border-destructive/20 text-destructive hover:bg-destructive/10">
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
