"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

type InvoiceStatus = "paid" | "pending" | "overdue";

interface Invoice {
  id: string;
  number: string;
  description: string;
  amount: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
}

const statusConfig: Record<InvoiceStatus, { label: string; icon: React.ElementType; className: string }> = {
  paid: { label: "Оплачен", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Ожидает", icon: Clock, className: "bg-gold/10 text-gold border-gold/20" },
  overdue: { label: "Просрочен", icon: AlertCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const invoices: Invoice[] = [
  {
    id: "1",
    number: "БСПН-2026-Q2-0145",
    description: "Членский взнос Q2 2026",
    amount: "1 200 BYN",
    date: "01.04.2026",
    dueDate: "15.04.2026",
    status: "pending",
  },
  {
    id: "2",
    number: "БСПН-2026-Q1-0145",
    description: "Членский взнос Q1 2026",
    amount: "1 200 BYN",
    date: "05.01.2026",
    dueDate: "15.01.2026",
    status: "paid",
  },
  {
    id: "3",
    number: "БСПН-2025-Q4-0145",
    description: "Членский взнос Q4 2025",
    amount: "1 100 BYN",
    date: "01.10.2025",
    dueDate: "15.10.2025",
    status: "paid",
  },
  {
    id: "4",
    number: "БСПН-2025-Q3-0145",
    description: "Членский взнос Q3 2025",
    amount: "1 100 BYN",
    date: "01.07.2025",
    dueDate: "15.07.2025",
    status: "paid",
  },
  {
    id: "5",
    number: "БСПН-2025-SEM-0089",
    description: "Тренинг «Переговоры в бизнесе» (февраль 2025)",
    amount: "150 BYN",
    date: "10.02.2025",
    dueDate: "15.02.2025",
    status: "paid",
  },
];

export default function BillingPage() {
  const pendingTotal = invoices
    .filter((i) => i.status === "pending" || i.status === "overdue")
    .reduce((acc, i) => acc + parseInt(i.amount.replace(/\D/g, "")), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Оплата и счета</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          История платежей и текущие счета
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <div className="mt-2 font-heading text-2xl font-bold">
              {pendingTotal > 0 ? `${pendingTotal.toLocaleString("ru-RU")} BYN` : "0 BYN"}
            </div>
            <p className="text-xs text-muted-foreground">К оплате</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div className="mt-2 font-heading text-2xl font-bold">4 550 BYN</div>
            <p className="text-xs text-muted-foreground">Оплачено за год</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <TrendingUp className="h-5 w-5 text-gold" />
            <div className="mt-2 font-heading text-2xl font-bold">~8 500 BYN</div>
            <p className="text-xs text-muted-foreground">Экономия за год (ROI)</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Счета</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {invoices.map((inv) => {
            const st = statusConfig[inv.status];
            const StatusIcon = st.icon;

            return (
              <div
                key={inv.id}
                className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{inv.description}</p>
                    <Badge className={cn("shrink-0 border text-[10px]", st.className)}>
                      <StatusIcon className="mr-0.5 h-3 w-3" />
                      {st.label}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span>№ {inv.number}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {inv.date}
                    </span>
                    <span>Срок: {inv.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-heading text-sm font-bold">{inv.amount}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                    {inv.status === "pending" && (
                      <Button size="sm" className="h-8 text-xs bg-cta text-cta-foreground hover:bg-cta/90 rounded-lg">
                        Оплатить
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
