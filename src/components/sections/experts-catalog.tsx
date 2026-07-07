"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  INDUSTRIES,
  COMPETENCIES,
  EXPERTS,
  matchesFilters,
  type IndustryId,
  type CompetencyId,
  type ExpertMeta,
} from "@/lib/experts-data";
import {
  Award,
  BadgeCheck,
  Building2,
  ChevronDown,
  ExternalLink,
  Factory,
  Landmark,
  Mail,
  RotateCcw,
  ScrollText,
  SearchCheck,
  Tags,
  UserSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ---------- Подбор эксперта (фильтры-шаги) ---------- */

function FilterChips<T extends string>({
  options,
  selected,
  onSelect,
  label,
  labelPrefix,
  icon: Icon,
}: {
  options: readonly T[];
  selected: T | null;
  onSelect: (v: T | null) => void;
  label: string;
  labelPrefix: string;
  icon: LucideIcon;
}) {
  const t = useTranslations("experts");
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(active ? null : opt)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/70 bg-background/60 text-foreground/80 hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {t(`${labelPrefix}${opt}` as never)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Карточка эксперта ---------- */

function ExpertCard({ expert }: { expert: ExpertMeta }) {
  const t = useTranslations("experts");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const name = t(`${expert.id}.name` as never);
  const initials = name
    .split(" ")
    .map((s: string) => s[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--aurora-1)] via-primary via-[var(--cta)] to-[var(--gold)]"
      />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start gap-4 sm:gap-5">
          {expert.photo ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60 sm:h-24 sm:w-24">
              <Image
                src={expert.photo}
                alt={name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ) : (
            <Avatar className="h-20 w-20 shrink-0 rounded-2xl sm:h-24 sm:w-24">
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-[var(--aurora-1)] font-heading text-2xl text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-lg font-bold leading-tight sm:text-xl">
              {name}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary">
              {t(`${expert.id}.role` as never)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.05] px-2.5 py-1 font-mono">
                {t(`${expert.id}.specialty` as never)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1">
                {t(`${expert.id}.since` as never)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {t(`${expert.id}.bio` as never)}
        </p>

        {/* Теги: отрасли + компетенции */}
        <div className="mt-5 space-y-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <Factory className="h-3 w-3" />
              {t("industryLabel")}
            </span>
            {expert.industries.map((ind) => (
              <span
                key={ind}
                className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {t(ind as never)}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <Tags className="h-3 w-3" />
              {t("topicsLabel")}
            </span>
            {expert.competencies.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[var(--cta)]/8 px-2.5 py-1 text-xs font-medium text-cta"
              >
                {t(c as never)}
              </span>
            ))}
          </div>
        </div>

        {/* Расширенное досье (для экспертов с деталями) */}
        {expert.hasDetails && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              {t("detailsBtn")}
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", detailsOpen && "rotate-180")}
              />
            </button>
            {detailsOpen && (
              <div className="mt-4 space-y-4">
                <figure className="rounded-2xl border-l-4 border-l-[var(--gold)] bg-gradient-to-r from-amber-50/50 to-transparent p-4 dark:from-amber-950/15">
                  <blockquote className="font-heading text-sm italic leading-relaxed text-foreground/85">
                    {t(`${expert.id}.philosophy` as never)}
                  </blockquote>
                  <figcaption className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    {t("philosophyTitle")}
                  </figcaption>
                </figure>

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/70">
                    <Award className="h-3.5 w-3.5 text-primary" />
                    {t("rolesTitle")}
                  </div>
                  <ul className="mt-2 space-y-2">
                    {(["role1", "role2", "role3", "role4", "role5", "role6"] as const).map(
                      (rk) => (
                        <li
                          key={rk}
                          className="flex gap-2.5 rounded-xl border border-border/40 bg-background/60 p-3 text-sm leading-relaxed text-foreground/85"
                        >
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{t(`${expert.id}.${rk}` as never)}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/70">
                    <Landmark className="h-3.5 w-3.5 text-[var(--cta)]" />
                    {t("topicsTitle")}
                  </div>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {(
                      [
                        "topic1", "topic2", "topic3", "topic4", "topic5",
                        "topic6", "topic7", "topic8", "topic9", "topic10",
                      ] as const
                    ).map((tk) => (
                      <li
                        key={tk}
                        className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-sm leading-snug text-foreground/85"
                      >
                        <ScrollText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cta)]" />
                        <span>{t(`${expert.id}.${tk}` as never)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="rounded-2xl bg-gradient-to-br from-primary/8 via-[var(--cta)]/6 to-[var(--gold)]/8 p-5 text-sm leading-relaxed text-foreground/85">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("trackTitle")}
                  </span>
                  {t(`${expert.id}.track` as never)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Действия */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            href="/contacts"
            className={cn(
              buttonVariants({ size: "default" }),
              "rounded-xl bg-cta text-cta-foreground hover:bg-cta/90"
            )}
          >
            <Mail className="mr-1 h-4 w-4" />
            {t("askBtn")}
          </Link>
          {expert.id === "g1" && (
            <a
              href={t("g1.siteUrl" as never)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "default" }), "rounded-xl")}
            >
              <Building2 className="mr-1 h-4 w-4" />
              viena.by
              <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- Компетенции союза (агрегат по экспертам) ---------- */

export function UnionSkills() {
  const t = useTranslations("experts");

  const counts = useMemo(() => {
    const map = new Map<CompetencyId, number>();
    for (const c of COMPETENCIES) {
      map.set(c, EXPERTS.filter((e) => e.competencies.includes(c)).length);
    }
    return map;
  }, []);

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2.5">
        <SearchCheck className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          {t("skillsTitle")}
        </h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {t("skillsSubtitle")}
      </p>
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {COMPETENCIES.map((c) => (
          <div
            key={c}
            className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/60 px-4 py-3"
          >
            <span className="text-sm font-medium leading-snug">{t(c as never)}</span>
            <span className="shrink-0 rounded-full bg-primary/8 px-2 py-0.5 font-mono text-[11px] font-semibold text-primary">
              {t("skillsCount", { count: counts.get(c) ?? 0 })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Каталог с подбором ---------- */

export function ExpertsCatalog() {
  const t = useTranslations("experts");
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [competency, setCompetency] = useState<CompetencyId | null>(null);

  const filtered = useMemo(
    () => EXPERTS.filter((e) => matchesFilters(e, industry, competency)),
    [industry, competency]
  );
  const hasFilters = industry !== null || competency !== null;

  return (
    <div>
      {/* Подбор эксперта */}
      <GlassCard variant="strong" className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-bold sm:text-2xl">
              {t("matchTitle")}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t("matchSubtitle")}
            </p>
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setIndustry(null);
                setCompetency(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              {t("resetBtn")}
            </button>
          )}
        </div>

        <div className="mt-6 space-y-5">
          <FilterChips
            options={INDUSTRIES}
            selected={industry}
            onSelect={setIndustry}
            label={t("stepIndustry")}
            labelPrefix=""
            icon={Factory}
          />
          <FilterChips
            options={COMPETENCIES}
            selected={competency}
            onSelect={setCompetency}
            label={t("stepTopic")}
            labelPrefix=""
            icon={Tags}
          />
        </div>

        <div className="mt-6 border-t border-border/50 pt-4 text-sm font-semibold text-primary">
          {t("foundLabel", { count: filtered.length })}
        </div>
      </GlassCard>

      {/* Результаты */}
      <div className="mt-8 space-y-6">
        {filtered.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}

        {filtered.length === 0 && (
          <GlassCard className="p-8 text-center sm:p-10">
            <UserSearch className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 font-heading text-lg font-bold">
              {t("emptyTitle")}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t("emptyBody")}
            </p>
            <Link
              href="/contacts"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 rounded-xl bg-cta text-cta-foreground hover:bg-cta/90"
              )}
            >
              {t("emptyCta")}
            </Link>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
