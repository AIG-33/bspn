import Image from "next/image";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

interface SiteLogoProps {
  size?: Size;
  /**
   * `mark` — gradient pill with the white «Вялес» glyph, suited for any background.
   * `plain` — bare glyph (no pill), used inside dark surfaces (footer, hero) where extra chrome is unwanted.
   */
  variant?: "mark" | "plain";
  className?: string;
  alt?: string;
  priority?: boolean;
}

const sizeMap: Record<Size, { box: string; img: number }> = {
  sm: { box: "h-9 w-9", img: 36 },
  md: { box: "h-10 w-10", img: 40 },
  lg: { box: "h-11 w-11", img: 44 },
};

export function SiteLogo({
  size = "sm",
  variant = "mark",
  className,
  alt = "БСПН — Вялес",
  priority = false,
}: SiteLogoProps) {
  const { box, img } = sizeMap[size];

  if (variant === "plain") {
    return (
      <Image
        src="/images/bspn-logo-mark@2x.png"
        alt={alt}
        width={img}
        height={img}
        priority={priority}
        className={cn("object-contain drop-shadow", className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl",
        "bg-gradient-to-br from-[var(--aurora-1)] via-primary to-[var(--cta)] shadow-lg",
        box,
        className
      )}
    >
      <Image
        src="/images/bspn-logo-mark@2x.png"
        alt=""
        width={img}
        height={img}
        priority={priority}
        className="h-[78%] w-[78%] object-contain"
      />
      <span className="sr-only">{alt}</span>
    </span>
  );
}
