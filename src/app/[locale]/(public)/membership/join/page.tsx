"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  Building2,
  Heart,
  Send,
  Loader2,
} from "lucide-react";
import { submitApplication } from "@/lib/actions/applications";

const industries = [
  "Промышленность",
  "Транспорт и логистика",
  "Строительство",
  "IT и цифровые технологии",
  "Торговля и услуги",
  "Агропромышленный комплекс",
  "Финансы и страхование",
  "Образование",
  "Здравоохранение",
  "Энергетика",
  "Консалтинг",
  "Другое",
];

const interests = [
  { id: "advocacy", label: "Защита интересов в госорганах" },
  { id: "legal", label: "Юридические консультации" },
  { id: "tax", label: "Налоговые вопросы" },
  { id: "networking", label: "Нетворкинг и мероприятия" },
  { id: "international", label: "Международные связи" },
  { id: "templates", label: "Шаблоны документов" },
  { id: "data-protection", label: "Защита персональных данных" },
];

const steps = [
  { icon: User, label: "Контакт" },
  { icon: Building2, label: "Компания" },
  { icon: Heart, label: "Интересы" },
  { icon: Send, label: "Отправка" },
];

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    unp: "",
    industry: "",
    interests: [] as string[],
    message: "",
    consent: false,
  });

  const updateForm = (field: string, value: string | boolean | string[] | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (id: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return form.name && form.email && form.phone;
      case 1:
        return form.company && form.industry;
      case 2:
        return form.interests.length > 0;
      case 3:
        return form.consent;
      default:
        return false;
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const result = await submitApplication({
      companyName: form.company,
      companyUnp: form.unp,
      companyAddress: "",
      companyActivity: form.industry,
      companyEmployees: "",
      companyYear: "",
      contactName: form.name,
      contactPosition: "",
      contactEmail: form.email,
      contactPhone: form.phone,
      membershipType: "standard",
      goals: form.interests,
      additionalInfo: form.message,
      documentsConsent: form.consent,
    });

    if (!result.success) {
      setError(result.error ?? "Произошла ошибка при отправке заявки");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <>
        <PageHeader title="Заявка отправлена!" />
        <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h2 className="mt-6 font-heading text-2xl font-bold">
            Спасибо за вашу заявку!
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Мы получили вашу заявку на вступление в БСПН. Наш представитель
            свяжется с вами в течение 24 часов для уточнения деталей.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Подтверждение отправлено на <strong>{form.email}</strong>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Вступить в БСПН"
        description="Заполните заявку за 2 минуты — мы свяжемся с вами в течение 24 часов"
      />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center gap-1.5",
                  i <= step ? "text-primary" : "text-muted-foreground/40"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    i < step
                      ? "border-success bg-success text-success-foreground"
                      : i === step
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                  )}
                >
                  {i < step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <s.icon className="h-5 w-5" />
                  )}
                </div>
                <span className="hidden text-xs font-medium sm:block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6 sm:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-heading text-xl font-bold">
                  Контактная информация
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">ФИО руководителя *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      placeholder="Иванов Иван Иванович"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      placeholder="director@company.by"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      placeholder="+375 29 123-45-67"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-heading text-xl font-bold">
                  О компании
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company">Название компании *</Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => updateForm("company", e.target.value)}
                      placeholder="ООО «Компания»"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unp">УНП</Label>
                    <Input
                      id="unp"
                      value={form.unp}
                      onChange={(e) => updateForm("unp", e.target.value)}
                      placeholder="123456789"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Сфера деятельности *</Label>
                    <Select
                      value={form.industry}
                      onValueChange={(v) => updateForm("industry", v)}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Выберите отрасль" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-heading text-xl font-bold">
                  Что вас интересует?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Выберите направления, которые важны для вашего бизнеса
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {interests.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleInterest(id)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all",
                        form.interests.includes(id)
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                          form.interests.includes(id)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border"
                        )}
                      >
                        {form.interests.includes(id) && (
                          <CheckCircle className="h-3.5 w-3.5" />
                        )}
                      </div>
                      {label}
                    </button>
                  ))}
                </div>
                <div>
                  <Label htmlFor="message">Дополнительный комментарий</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    placeholder="Расскажите подробнее о ваших ожиданиях..."
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-heading text-xl font-bold">
                  Подтверждение заявки
                </h2>
                <div className="space-y-4 rounded-xl bg-muted p-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ФИО</span>
                    <span className="font-medium">{form.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{form.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Телефон</span>
                    <span className="font-medium">{form.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Компания</span>
                    <span className="font-medium">{form.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Отрасль</span>
                    <span className="font-medium">{form.industry}</span>
                  </div>
                  {form.unp && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">УНП</span>
                      <span className="font-medium">{form.unp}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Интересы:</span>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {form.interests.map((id) => {
                        const interest = interests.find((i) => i.id === id);
                        return (
                          <span
                            key={id}
                            className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                          >
                            {interest?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => updateForm("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Я даю согласие на обработку персональных данных в
                    соответствии с Политикой конфиденциальности БСПН и
                    подтверждаю достоверность указанных сведений.
                  </span>
                </label>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 0 || loading}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад
              </Button>

              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Далее
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="gap-1 bg-cta text-cta-foreground hover:bg-cta/90"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {loading ? "Отправляем..." : "Отправить заявку"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Trust */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Заявка обрабатывается в течение 24 часов. Мы не передаём ваши данные третьим лицам.
        </p>
      </div>
    </>
  );
}
