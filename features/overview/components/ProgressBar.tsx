import { cn } from "@/lib/utils";
import { TONE_SOLID, type Tone } from "./Pill";

export function ProgressBar({
  value,
  tone = "brand",
  label,
  className,
}: {
  value: number;
  tone?: Tone;
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-border",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full", TONE_SOLID[tone])}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
