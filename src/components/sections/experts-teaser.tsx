"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { EXPERTS, COMPETENCIES } from "@/lib/experts-data";
import { ArrowRight, MessagesSquare, Users2, Clock3 } from "lucide-react";

/**
 * Блок «Экспертное мнение» на главной: именные эксперты как доказательство
 * компетентности союза + переход на страницу подбора эксперта.
 */
export function ExpertsTeaser() {
  const t = useTranslations("expertsTeaser");
  const tExperts = useTranslations("experts");

  return (
    <section className="relative overflow-hidden border-y border-foreground/[0.06] bg-background/40 py-16 backdrop-blur-sm sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            {t("tag")}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {EXPERTS.map((expert) => {
            const name = tExperts(`${expert.id}.name`);
            const initials = name
              .split(" ")
              .map((s) => s[0])
              .join("")
              .slice(0, 2);
            return (
              <Link key={expert.id} href="/experts" className="group">
                <GlassCard hoverable className="flex h-full flex-col p-6">
                  <div className="flex items-center gap-4">
                    {expert.photo ? (
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                        <Image
                          src={expert.photo}
                          alt={name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <Avatar className="h-14 w-14 shrink-0 rounded-2xl">
                        <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-[var(--aurora-1)] font-heading text-lg text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <h3 className="font-heading text-base font-semibold leading-snug">
                        {name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-primary">
                        {tExperts(`${expert.id}.role`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {expert.competencies.slice(0, 3).map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] leading-none text-muted-foreground"
                      >
                        {tExperts(c)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                    {t("cardCta")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Users2, value: String(EXPERTS.length), labelKey: "statExperts" },
            { icon: MessagesSquare, value: String(COMPETENCIES.length), labelKey: "statCompetencies" },
            { icon: Clock3, value: "24", labelKey: "statResponse" },
          ].map(({ icon: Icon, value, labelKey }) => (
            <div
              key={labelKey}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/60 px-5 py-4"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <span className="font-mono text-xl font-bold">{value}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {t(labelKey)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/experts"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-xl bg-cta px-8 text-cta-foreground hover:bg-cta/90 glow-cta"
            )}
          >
            {t("ctaMatch")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/contacts"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-xl px-8"
            )}
          >
            {t("ctaAsk")}
          </Link>
        </div>
      </div>
    </section>
  );
}
