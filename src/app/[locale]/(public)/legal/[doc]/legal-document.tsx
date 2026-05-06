"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Mail, MapPin, Calendar, FileText } from "lucide-react";

type LegalDoc = "privacy" | "terms";

interface Section {
  id: string;
  title: string;
  paragraphs: string[];
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const t = useTranslations(`legal.${doc}`);
  const tLegal = useTranslations("legal");

  const sections = t.raw("sections") as Section[];

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        variant="aurora"
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/60 px-3 py-1">
            <Calendar className="h-3.5 w-3.5" />
            {tLegal("lastUpdated")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/60 px-3 py-1">
            <FileText className="h-3.5 w-3.5" />
            {t("title")}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px,1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <GlassCard className="p-4">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tLegal("tableOfContents")}
              </h2>
              <nav className="space-y-0.5">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-2.5 py-1.5 text-sm text-foreground/75 transition-all hover:bg-foreground/5 hover:text-foreground"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </GlassCard>
          </aside>

          <article className="min-w-0">
            <GlassCard className="p-6 sm:p-8 lg:p-10">
              <p className="text-base leading-relaxed text-foreground/90">
                {t("intro")}
              </p>

              <div className="mt-8 space-y-10">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <h2 className="font-heading text-xl font-bold leading-tight sm:text-2xl">
                      {section.title}
                    </h2>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
                      {section.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </GlassCard>

            <GlassCard variant="strong" className="mt-8 p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold sm:text-xl">
                {tLegal("contactBlock.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tLegal("contactBlock.description")}
              </p>
              <div className="mt-4 space-y-2.5 text-sm">
                <a
                  href={`mailto:${tLegal("contactBlock.email")}`}
                  className="flex items-center gap-2 font-medium text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {tLegal("contactBlock.email")}
                </a>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <span className="font-medium text-foreground/85">
                      {tLegal("contactBlock.addressLabel")}
                    </span>{" "}
                    {tLegal("contactBlock.address")}
                  </span>
                </div>
              </div>
            </GlassCard>
          </article>
        </div>
      </div>
    </>
  );
}
