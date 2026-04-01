import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MessageSquare, User, Calendar, Clock, CheckCircle2, Star } from "lucide-react";

const consultations = [
  { id: "1", client: "ООО «ТехноСтар»", expert: "Ковалёв А.М.", topic: "НДС при экспорте", date: "02.04.2026", status: "scheduled" },
  { id: "2", client: "ООО «ТехноСтар»", expert: "Петрова Е.С.", topic: "Увольнение по контракту", date: "05.04.2026", status: "scheduled" },
  { id: "3", client: "ЗАО «БелПромСтрой»", expert: "Васильев Д.О.", topic: "Договор подряда", date: "28.03.2026", status: "completed" },
  { id: "4", client: "ИП Козловский А.В.", expert: "Романчук А.И.", topic: "Штраф МАРТ", date: "25.03.2026", status: "completed" },
  { id: "5", client: "ООО «Логистик Плюс»", expert: "Мельников П.А.", topic: "ВЭД документы", date: "20.03.2026", status: "completed" },
];

const stConfig: Record<string, { label: string; className: string }> = {
  scheduled: { label: "Запланировано", className: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "Завершено", className: "bg-success/10 text-success border-success/20" },
};

const expertStats = [
  { name: "Ковалёв А.М.", consultations: 24, rating: 4.9, specialization: "Налоговое право" },
  { name: "Петрова Е.С.", consultations: 19, rating: 4.8, specialization: "Трудовое право" },
  { name: "Романчук А.И.", consultations: 16, rating: 4.9, specialization: "Антимонопольное" },
  { name: "Козлова М.А.", consultations: 14, rating: 4.7, specialization: "Защита ПД" },
  { name: "Васильев Д.О.", consultations: 12, rating: 4.8, specialization: "Недвижимость" },
];

export default function AdminConsultationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Консультации</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 text-center"><div className="font-heading text-2xl font-bold text-primary">89</div><p className="text-xs text-muted-foreground">За март</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="font-heading text-2xl font-bold text-success">4.8</div><p className="text-xs text-muted-foreground">Средний рейтинг</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="font-heading text-2xl font-bold text-gold">2</div><p className="text-xs text-muted-foreground">Запланировано</p></CardContent></Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Последние консультации</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {consultations.map((c) => {
              const st = stConfig[c.status];
              return (
                <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.topic}</p>
                    <div className="flex gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{c.client}</span>
                      <span>→</span>
                      <span>{c.expert}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{c.date}</span>
                    </div>
                  </div>
                  <Badge className={cn("border text-[10px] shrink-0", st.className)}>{st.label}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Эксперты (март)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {expertStats.map((e) => (
              <div key={e.name} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"><User className="h-4 w-4 text-primary" /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.specialization}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">{e.consultations} конс.</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 justify-end"><Star className="h-3 w-3 fill-gold text-gold" />{e.rating}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
