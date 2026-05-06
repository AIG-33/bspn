import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  variant?: "aurora" | "mesh" | "soft";
  pattern?: "dots" | "grid" | "none";
  className?: string;
}

export function AmbientBackground({
  variant = "aurora",
  pattern = "dots",
  className,
}: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {variant === "aurora" && (
        <>
          <div className="absolute -top-40 left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-aurora opacity-50 blur-3xl" />
          <div className="absolute -left-40 top-1/3 size-[36rem] rounded-full bg-[var(--aurora-1)] opacity-30 blur-3xl animate-orb-a" />
          <div className="absolute -right-40 bottom-0 size-[40rem] rounded-full bg-[var(--aurora-2)] opacity-25 blur-3xl animate-orb-b" />
        </>
      )}
      {variant === "mesh" && (
        <div className="absolute inset-0 bg-mesh opacity-90" />
      )}
      {variant === "soft" && (
        <>
          <div className="absolute -left-32 top-0 size-[28rem] rounded-full bg-[var(--aurora-1)] opacity-15 blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-[32rem] rounded-full bg-[var(--aurora-3)] opacity-15 blur-3xl" />
        </>
      )}
      {pattern === "dots" && (
        <div className="absolute inset-0 dot-pattern text-foreground/[0.06]" />
      )}
      {pattern === "grid" && (
        <div className="absolute inset-0 grid-pattern text-foreground/[0.05]" />
      )}
    </div>
  );
}
