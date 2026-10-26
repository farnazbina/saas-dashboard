"use client";

import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { controlClass } from "./FormField";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
};

function OptionContent<T extends string>({ o }: { o: SelectOption<T> }) {
  return (
    <>
      {o.icon}
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-medium">{o.label}</span>
        {o.description && (
          <span className="text-[11px] text-muted-foreground">
            {o.description}
          </span>
        )}
      </span>
      {o.badge && (
        <span className="rounded bg-brand-soft px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-ink">
          {o.badge}
        </span>
      )}
    </>
  );
}

/** Dropdown "select" built on the dropdown menu (keeps rich option content easy) */
export function SelectMenu<T extends string>({
  id,
  value,
  options,
  onChange,
  invalid,
  describedBy,
  chevron = "down",
  placeholder = "Select…",
}: {
  id: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  invalid?: boolean;
  describedBy?: string;
  chevron?: "down" | "updown";
  placeholder?: string;
}) {
  const current = options.find((o) => o.value === value);
  const Chevron = chevron === "updown" ? ChevronsUpDown : ChevronDown;
  const twoLine = !!current?.description;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            id={id}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(
              controlClass,
              "flex items-center gap-2 text-left hover:bg-muted data-[popup-open]:bg-muted",
              twoLine && "h-auto min-h-10 py-1.5",
            )}
          />
        }
      >
        {current ? (
          <OptionContent o={current} />
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <Chevron
          className="ml-auto size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-72 min-w-(--anchor-width) bg-card"
      >
        {options.map((o) => (
          <DropdownMenuItem
            key={o.value}
            onClick={() => onChange(o.value)}
            className="gap-2"
          >
            <OptionContent o={o} />
            {o.value === value && (
              <Check className="ml-auto size-4 text-brand" aria-hidden />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
