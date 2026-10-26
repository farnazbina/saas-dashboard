import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type Tone =
  | "brand"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "violet"
  | "neutral";

// Full class strings so Tailwind can see them. Colours come from overview-theme.css.
export const TONE_SOFT: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand-ink",
  success: "bg-success-soft text-success-ink",
  info: "bg-info-soft text-info-ink",
  warning: "bg-warning-soft text-warning-ink",
  danger: "bg-danger-soft text-danger-ink",
  violet: "bg-violet-soft text-violet-ink",
  neutral: "bg-muted text-muted-foreground",
};

export const TONE_SOLID: Record<Tone, string> = {
  brand: "bg-brand",
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-danger",
  violet: "bg-violet",
  neutral: "bg-muted-foreground",
};

export function Pill({
  tone = "neutral",
  icon: Icon,
  dot,
  className,
  children,
}: {
  tone?: Tone;
  icon?: LucideIcon;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        TONE_SOFT[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {Icon && <Icon className="size-3" aria-hidden />}
      {children}
    </span>
  );
}
