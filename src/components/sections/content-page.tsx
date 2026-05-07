import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import type { LucideIcon } from "lucide-react";

export interface ContentBlock {
  title: string;
  body: string;
  icon?: LucideIcon;
}

interface ContentPageProps {
  pageTitle: string;
  pageDescription: string;
  intro?: string;
  /**
   * Optional accent above the page title (eyebrow/tag), useful for SEO landing pages.
   */
  tag?: string;
  blocks: ContentBlock[];
  /**
   * Render variant for the page header.
   */
  variant?: "default" | "aurora";
  /**
   * Layout for blocks: "grid" (cards) or "stack" (stacked sections).
   */
  layout?: "grid" | "stack";
  cols?: 2 | 3;
  /**
   * Optional CTA section rendered after the blocks.
   */
  cta?: React.ReactNode;
  /**
   * Optional appended content rendered before the CTA.
   */
  children?: React.ReactNode;
}

export function ContentPage({
  pageTitle,
  pageDescription,
  intro,
  tag,
  blocks,
  variant = "default",
  layout = "grid",
  cols = 3,
  cta,
  children,
}: ContentPageProps) {
  const gridCols = cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <>
      <PageHeader
        title={pageTitle}
        description={pageDescription}
        variant={variant}
      >
        {tag && (
          <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {tag}
          </div>
        )}
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {intro && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {intro}
            </p>
          </div>
        )}

        {layout === "grid" ? (
          <div className={`mt-12 grid gap-5 sm:grid-cols-2 ${gridCols}`}>
            {blocks.map((b, i) => (
              <GlassCard key={i} hoverable className="p-6">
                {b.icon && (
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                    <b.icon className="h-6 w-6" />
                  </div>
                )}
                <h3 className="font-heading text-base font-semibold leading-snug">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-3xl space-y-10">
            {blocks.map((b, i) => (
              <section key={i}>
                <div className="flex items-start gap-4">
                  {b.icon && (
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                      <b.icon className="h-5 w-5" />
                    </span>
                  )}
                  <div>
                    <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                      {b.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {b.body}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {children}
        {cta}
      </div>
    </>
  );
}
