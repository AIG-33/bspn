import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CreditCard, TrendingUp, CheckCircle2, Clock, AlertCircle, ArrowUpRight } from "lucide-react";

const summary = [
  { label: "Доход (Q1 2026)", value: "128 400 BYN", change: "+15%", icon: CreditCard },
  { label: "Оплачено", value: "98%", change: "+3%", icon: CheckCircle2 },
  { label: "Ожидает оплаты", value: "12 800 BYN", change: "", icon: Clock },
  { label: "Просрочено", value: "2 400 BYN", change: "", icon: AlertCircle },
];

const recentPayments = [
  { company: "ООО «ТехноСтар»", amount: "1 200 BYN", date: "30.03.2026", type: "Членский взнос Q2", status: "paid" },
  { company: "ЗАО «БелПромСтрой»", amount: "1 800 BYN", date: "28.03.2026", type: "Полное членство Q2", status: "paid" },
  { company: "ООО «Логистик Плюс»", amount: "900 BYN", date: "25.03.2026", type: "Солидарное Q2", status: "paid" },
  { company: "ИП Козловский А.В.", amount: "600 BYN", date: "20.03.2026", type: "Ассоциированное Q2", status: "paid" },
  { company: "ООО «Мега»", amount: "1 200 BYN", date: "15.03.2026", type: "Членский взнос Q1", status: "overdue" },
];

const stConfig: Record<string, { label: string; className: string }> = {
  paid: { label: "Оплачен", className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Ожидает", className: "bg-gold/10 text-gold border-gold/20" },
  overdue: { label: "Просрочен", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function AdminBillingPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Финансы</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map(({ label, value, change, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="mt-2 font-heading text-xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{label}</p>
              {change && <span className="mt-1 inline-flex items-center text-[10px] font-medium text-success"><ArrowUpRight className="h-3 w-3" />{change}</span>}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Последние платежи</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {recentPayments.map((p) => {
            const st = stConfig[p.status];
            return (
              <div key={p.company + p.date} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.company}</p>
                  <p className="text-xs text-muted-foreground">{p.type} · {p.date}</p>
                </div>
                <span className="font-heading text-sm font-bold">{p.amount}</span>
                <Badge className={cn("border text-[10px] shrink-0", st.className)}>{st.label}</Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
