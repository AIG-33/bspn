import { cn } from "@/lib/utils";
import * as React from "react";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "aurora";
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export function GradientText({
  variant = "brand",
  as: Tag = "span",
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        variant === "brand" ? "text-gradient" : "text-gradient-aurora",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
