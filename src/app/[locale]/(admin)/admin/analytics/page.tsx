import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  Eye,
  CreditCard,
  BarChart3,
  ArrowUpRight,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

const metrics = [
  { label: "Посещения сайта", value: "24 500", change: "+22%", icon: Eye },
  { label: "Новые члены (Q1)", value: "45", change: "+18%", icon: Users },
  { label: "Консультации (Q1)", value: "267", change: "+12%", icon: MessageSquare },
  { label: "Мероприятий (Q1)", value: "32", change: "+8%", icon: CalendarDays },
  { label: "Доход (Q1)", value: "128K BYN", change: "+15%", icon: CreditCard },
  { label: "Retention", value: "94%", change: "+2%", icon: TrendingUp },
];

const topPages = [
  { page: "/membership/benefits", views: 4200, label: "Преимущества членства" },
  { page: "/faq", views: 3800, label: "FAQ" },
  { page: "/court-practice", views: 3100, label: "Судебная практика" },
  { page: "/experts", views: 2700, label: "Эксперты" },
  { page: "/news", views: 2400, label: "Новости" },
];

const membershipGrowth = [
  { month: "Окт 2025", total: 310, new: 8 },
  { month: "Ноя 2025", total: 318, new: 10 },
  { month: "Дек 2025", total: 325, new: 9 },
  { month: "Янв 2026", total: 330, new: 12 },
  { month: "Фев 2026", total: 335, new: 15 },
  { month: "Мар 2026", total: 347, new: 18 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Аналитика</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ключевые метрики за Q1 2026</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {metrics.map(({ label, value, change, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="mt-2 font-heading text-xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <span className="mt-1 inline-flex items-center text-[10px] font-medium text-success">
                <ArrowUpRight className="h-3 w-3" />{change}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Рост членства</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {membershipGrowth.map((m) => (
                <div key={m.month} className="flex items-center gap-3">
                  <span className="w-20 text-xs text-muted-foreground">{m.month}</span>
                  <div className="flex-1 h-6 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(m.total / 360) * 100}%` }} />
                  </div>
                  <span className="w-10 text-xs font-medium text-right">{m.total}</span>
                  <Badge variant="secondary" className="text-[10px] w-12 justify-center">+{m.new}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Популярные страницы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPages.map((p, i) => (
                <div key={p.page} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.label}</p>
                    <p className="text-[10px] text-muted-foreground">{p.page}</p>
                  </div>
                  <span className="text-xs font-medium flex items-center gap-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    {p.views.toLocaleString("ru-RU")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
