"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Building2,
  Hash,
  Calendar,
  UserRound,
  MapPin,
  Copy,
  Check,
  Train,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Row {
  icon: LucideIcon;
  labelKey: string;
  valueKey: string;
  copyable?: boolean;
  mono?: boolean;
}

const ROWS: Row[] = [
  { icon: Building2, labelKey: "orgFullNameLabel", valueKey: "orgFullName" },
  { icon: Briefcase, labelKey: "orgFormLabel", valueKey: "orgForm" },
  {
    icon: Hash,
    labelKey: "orgUnpLabel",
    valueKey: "orgUnp",
    copyable: true,
    mono: true,
  },
  { icon: Calendar, labelKey: "orgFoundedLabel", valueKey: "orgFounded" },
  { icon: UserRound, labelKey: "orgDirectorLabel", valueKey: "orgDirector" },
  {
    icon: MapPin,
    labelKey: "orgAddressLabel",
    valueKey: "orgAddress",
    copyable: true,
  },
  { icon: Train, labelKey: "metroLabel", valueKey: "orgNearestMetro" },
];

export function OrganizationCard() {
  const t = useTranslations("page.contacts");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <GlassCard variant="strong" className="p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--cta)] text-white shadow-lg">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold sm:text-xl">
            {t("orgCardTitle")}
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("orgCardSubtitle")}
          </p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-foreground/6 rounded-2xl border border-foreground/8 bg-background/40">
        {ROWS.map(({ icon: Icon, labelKey, valueKey, copyable, mono }) => {
          const value = t(valueKey);
          const isCopied = copied === valueKey;

          return (
            <div
              key={valueKey}
              className="grid gap-1 px-4 py-3.5 sm:grid-cols-[200px,1fr] sm:items-center sm:gap-4 sm:px-5"
            >
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" />
                {t(labelKey)}
              </dt>
              <dd className="flex items-center justify-between gap-3">
                <span
                  className={
                    mono
                      ? "font-mono text-sm font-semibold text-foreground"
                      : "text-sm font-medium text-foreground/90 sm:text-base"
                  }
                >
                  {value}
                </span>
                {copyable && (
                  <button
                    type="button"
                    onClick={() => handleCopy(valueKey, value)}
                    className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border border-foreground/10 bg-background/60 px-2.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    aria-label={t("orgCopyAddress")}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-success" />
                        <span className="text-success">{t("orgCopied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span className="hidden sm:inline">
                          {t("orgCopyAddress")}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </GlassCard>
  );
}
