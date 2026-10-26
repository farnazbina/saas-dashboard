"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ACCENTS } from "@/features/projects/components/list/create-project-options";

export function AccentPicker({
  value,
  onChange,
  labelledBy,
}: {
  value: string;
  onChange: (hex: string) => void;
  labelledBy: string;
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between swatches, like a native radio group
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + ACCENTS.length) % ACCENTS.length;
    onChange(ACCENTS[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="flex h-10 items-center justify-between gap-1 rounded-lg bg-panel px-3"
    >
      {ACCENTS.map((a, i) => {
        const checked = a.value === value;
        return (
          <button
            key={a.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={a.label}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(a.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            style={{ background: a.value, color: a.fg }}
            className={cn(
              "flex size-6 items-center justify-center rounded-full transition-transform hover:scale-110",
              "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-panel focus-visible:outline-none",
              checked && "ring-2 ring-brand ring-offset-2 ring-offset-panel",
            )}
          >
            {checked && (
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
            )}
          </button>
        );
      })}
    </div>
  );
}
