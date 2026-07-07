"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { subscribeDigest } from "@/lib/actions/digest";
import { SITE } from "@/lib/constants";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export function DigestSignup() {
  const t = useTranslations("digest");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await subscribeDigest(email);
      setStatus(result.success ? "success" : "error");
    });
  };

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <GlassCard variant="strong" className="relative overflow-hidden p-8 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--gold)] opacity-15 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                <Mail className="h-3.5 w-3.5" />
                {t("tag")}
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold leading-tight sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("subtitle")}
              </p>
            </div>

            <div>
              {status === "success" ? (
                <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-5 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  {t("success")}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="h-11 rounded-xl"
                  />
                  <Button
                    type="submit"
                    disabled={pending}
                    className="h-11 rounded-xl bg-cta text-cta-foreground hover:bg-cta/90"
                  >
                    {t("button")}
                  </Button>
                  {status === "error" && (
                    <p className="text-xs leading-snug text-destructive">
                      {t("error")}
                    </p>
                  )}
                  <p className="text-[11px] leading-snug text-muted-foreground">
                    {t("privacy")}
                  </p>
                </form>
              )}

              <div className="mt-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t("or")}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <a
                href={SITE.socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#229ED9]/40 bg-[#229ED9]/10 px-4 py-3 text-sm font-semibold text-[#229ED9] transition-colors hover:bg-[#229ED9]/20"
              >
                <Send className="h-4 w-4" />
                {t("telegram")}
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
