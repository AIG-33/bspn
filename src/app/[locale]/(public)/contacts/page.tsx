import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contacts = [
  {
    icon: Phone,
    title: "Телефон",
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: "ул. Фабричная 22, 220007, г. Минск, Республика Беларусь",
    href: null,
  },
  {
    icon: Clock,
    title: "Время работы",
    value: "Пн–Пт: 9:00–18:00",
    href: null,
  },
];

const departments = [
  {
    name: "Правовой отдел",
    email: "legal@bspn.by",
    desc: "Юридические консультации, судебная практика",
  },
  {
    name: "Отдел экономики",
    email: "economy@bspn.by",
    desc: "Налоги, ценообразование, аналитика",
  },
  {
    name: "Международный отдел",
    email: "international@bspn.by",
    desc: "Бизнес-послы, международное сотрудничество",
  },
  {
    name: "Членство и мероприятия",
    email: "membership@bspn.by",
    desc: "Вступление, мероприятия, Клуб Директоров",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        title="Контакты"
        description="Свяжитесь с БСПН — мы всегда на связи"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map(({ icon: Icon, title, value, href }) => (
                <Card key={title}>
                  <CardContent className="p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold">
                      {title}
                    </h3>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {value}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Departments */}
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold">
                Контакты по направлениям
              </h2>
              <div className="mt-4 space-y-3">
                {departments.map(({ name, email, desc }) => (
                  <div
                    key={name}
                    className="flex items-start justify-between gap-4 rounded-xl border border-border p-4"
                  >
                    <div>
                      <h3 className="text-sm font-semibold">{name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {desc}
                      </p>
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="shrink-0 text-sm text-primary hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Requisites */}
            <div className="mt-8 rounded-xl bg-muted p-6">
              <h2 className="font-heading text-base font-bold">Реквизиты</h2>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>Общественное объединение «БСПН им. проф. М.С. Кунявского»</p>
                <p>УНП: 100125472</p>
                <p>р/с BY20AKBB30150600000291700000 в ОАО «АСБ Беларусбанк»</p>
                <p>БИК: AKBBBY2X</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold">
                  Напишите нам
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Заполните форму — мы ответим в течение рабочего дня
                </p>
                <form className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя *</Label>
                    <Input
                      id="contact-name"
                      placeholder="Иван Иванов"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="ivan@company.by"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject">Тема</Label>
                    <Input
                      id="contact-subject"
                      placeholder="Вопрос о членстве"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Сообщение *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Опишите ваш вопрос..."
                      rows={5}
                      className="mt-1.5"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted">
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-5 w-5" />
                Карта: ул. Фабричная 22, Минск
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
