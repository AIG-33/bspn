"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { UserPlus, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError(tCommon("error"));
      return;
    }

    if (password.length < 8) {
      setError(tCommon("error"));
      return;
    }

    if (!consent) {
      setError(tCommon("error"));
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <GlassCard variant="strong" className="p-7 sm:p-9 text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/15 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-5 font-heading text-2xl font-bold">
          {t("registerSuccess")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("checkEmail")} <strong className="text-foreground">{email}</strong>
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
        >
          {t("backToLogin")}
        </Link>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="strong" className="p-7 sm:p-9">
      <h1 className="font-heading text-2xl font-bold">
        {t("registerTitle")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("registerSubtitle")}
      </p>

      {error && (
        <div className="mt-4 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            placeholder={t("namePlaceholder")}
            className="mt-1.5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className="mt-1.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            className="mt-1.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <div>
          <Label htmlFor="password-confirm">{t("confirmPassword")}</Label>
          <Input
            id="password-confirm"
            type="password"
            placeholder={t("passwordPlaceholder")}
            className="mt-1.5"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-foreground/20 accent-primary"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span className="text-xs leading-relaxed text-muted-foreground">
            {t("agreementPrefix")}{" "}
            <Link
              href="/about"
              className="font-medium text-primary hover:underline"
            >
              {t("agreement")}
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-primary to-[var(--cta)] text-primary-foreground hover:opacity-95 glow-primary"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          {loading ? t("loading") : t("signUp")}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          {t("signIn")}
        </Link>
      </div>
    </GlassCard>
  );
}
