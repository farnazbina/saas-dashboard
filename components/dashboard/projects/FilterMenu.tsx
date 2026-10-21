"use client";

import { Check, ChevronDown, type LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type Option<T extends string> = { value: T; label: string };

/** Chip-style dropdown used for every filter and for sorting */
export function FilterMenu<T extends string>({
  label,
  icon: Icon,
  value,
  options,
  onChange,
  defaultValue,
  activeClass = "text-brand-ink",
  align = "start",
}: {
  label: string;
  icon?: LucideIcon;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  /** When value differs from this, the chip is shown as "active" */
  defaultValue?: T;
  activeClass?: string;
  align?: "start" | "end";
}) {
  const current = options.find((o) => o.value === value);
  const active = defaultValue !== undefined && value !== defaultValue;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-panel px-3 text-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none data-[popup-open]:bg-muted"
          />
        }
      >
        {Icon && (
          <Icon className="size-3.5 text-muted-foreground" aria-hidden />
        )}
        <span className="text-muted-foreground">{label}:</span>
        <span
          className={cn(
            "font-semibold",
            active ? activeClass : "text-foreground",
          )}
        >
          {current?.label}
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-44">
        {options.map((o) => (
          <DropdownMenuItem
            key={o.value}
            onClick={() => onChange(o.value)}
            className="justify-between gap-4"
          >
            {o.label}
            {o.value === value && (
              <Check className="size-4 text-brand" aria-hidden />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
