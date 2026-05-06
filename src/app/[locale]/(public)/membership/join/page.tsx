"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
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
  CheckCircle2,
  User,
  Building2,
  Heart,
  Send,
  Loader2,
} from "lucide-react";
import { submitApplication } from "@/lib/actions/applications";

const INDUSTRY_KEYS = [
  "industry1",
  "industry2",
  "industry3",
  "industry4",
  "industry5",
  "industry6",
  "industry7",
  "industry8",
  "industry9",
  "industry10",
  "industry11",
  "industry12",
] as const;

const INTEREST_KEYS = [
  "interest1",
  "interest2",
  "interest3",
  "interest4",
  "interest5",
  "interest6",
  "interest7",
] as const;

export default function JoinPage() {
  const t = useTranslations("join");
  const tCommon = useTranslations("common");

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const updateForm = (
    field: string,
    value: string | boolean | string[] | null
  ) => {
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

  const STEPS = [
    { icon: User, label: t("stepContact") },
    { icon: Building2, label: t("stepCompany") },
    { icon: Heart, label: t("stepInterests") },
    { icon: Send, label: t("stepConfirm") },
  ];

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
      setError(result.error ?? t("errorGeneric"));
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <>
        <PageHeader
          title={t("successTitle")}
          align="center"
          variant="aurora"
        />
        <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 glow-primary">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h2 className="mt-6 font-heading text-2xl font-bold">
            {t("successHeader")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t("successText")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("successEmail")}{" "}
            <strong className="text-foreground">{form.email}</strong>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
        align="center"
      />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center gap-1.5",
                  i <= step ? "text-primary" : "text-muted-foreground/40"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    i < step
                      ? "border-success bg-success text-success-foreground"
                      : i === step
                        ? "border-primary bg-primary text-primary-foreground glow-primary"
                        : "border-foreground/15"
                  )}
                >
                  {i < step ? (
                    <CheckCircle2 className="h-5 w-5" />
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
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-[var(--cta)] transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <GlassCard className="p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold">
                {t("step1Title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("labelName")}</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder={t("placeholderName")}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t("labelEmail")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder={t("placeholderEmail")}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t("labelPhone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder={t("placeholderPhone")}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold">
                {t("step2Title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">{t("labelCompany")}</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => updateForm("company", e.target.value)}
                    placeholder={t("placeholderCompany")}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="unp">{t("labelUnp")}</Label>
                  <Input
                    id="unp"
                    value={form.unp}
                    onChange={(e) => updateForm("unp", e.target.value)}
                    placeholder={t("placeholderUnp")}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>{t("labelIndustry")}</Label>
                  <Select
                    value={form.industry}
                    onValueChange={(v) => updateForm("industry", v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder={t("placeholderIndustry")} />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_KEYS.map((key) => (
                        <SelectItem key={key} value={t(key)}>
                          {t(key)}
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
                {t("step3Title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("step3Subtitle")}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {INTEREST_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleInterest(key)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border p-4 text-left text-sm transition-all",
                      form.interests.includes(key)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-foreground/10 hover:border-primary/30 hover:bg-foreground/5"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                        form.interests.includes(key)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-foreground/15"
                      )}
                    >
                      {form.interests.includes(key) && (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      )}
                    </div>
                    {t(key)}
                  </button>
                ))}
              </div>
              <div>
                <Label htmlFor="message">{t("labelMessage")}</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => updateForm("message", e.target.value)}
                  placeholder={t("placeholderMessage")}
                  className="mt-1.5"
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold">
                {t("step4Title")}
              </h2>
              <div className="space-y-3 rounded-2xl bg-muted/50 p-5 text-sm">
                <Row label={t("summaryName")} value={form.name} />
                <Row label={t("labelEmail").replace(" *", "")} value={form.email} />
                <Row label={t("labelPhone").replace(" *", "")} value={form.phone} />
                <Row label={t("summaryCompany")} value={form.company} />
                <Row label={t("summaryIndustry")} value={form.industry} />
                {form.unp && <Row label={t("summaryUnp")} value={form.unp} />}
                <div>
                  <span className="text-muted-foreground">
                    {t("summaryInterests")}:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {form.interests.map((key) => (
                      <span
                        key={key}
                        className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {t(key as (typeof INTEREST_KEYS)[number])}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => updateForm("consent", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-foreground/20 accent-primary"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {t("consent")}
                </span>
              </label>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 0 || loading}
              className="gap-1 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              {tCommon("back")}
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {tCommon("next")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="gap-1 rounded-xl bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {loading ? t("sending") : t("send")}
              </Button>
            )}
          </div>
        </GlassCard>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("trust")}
        </p>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
