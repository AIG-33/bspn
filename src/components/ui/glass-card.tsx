import { cn } from "@/lib/utils";
import * as React from "react";

type Variant = "default" | "strong" | "dark";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  hoverable?: boolean;
}

const variantClass: Record<Variant, string> = {
  default: "glass",
  strong: "glass-strong",
  dark: "glass-dark",
};

export function GlassCard({
  variant = "default",
  hoverable = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variantClass[variant],
        hoverable &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
