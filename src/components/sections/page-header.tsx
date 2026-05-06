"use client";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  variant?: "default" | "aurora";
  align?: "left" | "center";
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  variant = "default",
  align = "left",
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        variant === "aurora"
          ? "bg-aurora text-white py-20 sm:py-28"
          : "border-b border-foreground/5 py-16 sm:py-20"
      )}
    >
      {variant === "aurora" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-32 top-0 size-[28rem] rounded-full bg-[var(--aurora-1)] opacity-40 blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-[32rem] rounded-full bg-[var(--aurora-2)] opacity-35 blur-3xl" />
          <div className="absolute inset-0 dot-pattern text-white/[0.06]" />
        </div>
      )}
      {variant === "default" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-32 top-0 size-[26rem] rounded-full bg-[var(--aurora-1)] opacity-10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-[28rem] rounded-full bg-[var(--aurora-3)] opacity-10 blur-3xl" />
        </div>
      )}

      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          align === "center" && "text-center"
        )}
      >
        <h1
          className={cn(
            "font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl",
            align === "center" && "mx-auto max-w-3xl"
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
              variant === "aurora" ? "text-white/80" : "text-muted-foreground",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
