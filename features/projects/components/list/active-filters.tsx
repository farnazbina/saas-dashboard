import { X } from "lucide-react";

import { DEADLINE_OPTIONS, type Filters } from "@/utils/projects-utils";
import { cn } from "@/lib/utils";
import { TONE_SOFT, type Tone } from "@/features/overview/components/Pill";

type Key = keyof Filters;

export function activeFilterCount(f: Filters) {
  return [
    f.query.trim(),
    f.status !== "All",
    f.owner !== "All",
    f.priority !== "All",
    f.deadline !== "any",
  ].filter(Boolean).length;
}

export function ActiveFilters({
  filters,
  onRemove,
  onClear,
}: {
  filters: Filters;
  onRemove: (key: Key) => void;
  onClear: () => void;
}) {
  const chips: { key: Key; label: string; tone: Tone }[] = [];
  if (filters.query.trim())
    chips.push({
      key: "query",
      label: `Search: ${filters.query.trim()}`,
      tone: "neutral",
    });
  if (filters.status !== "All")
    chips.push({
      key: "status",
      label: `Status: ${filters.status}`,
      tone: "brand",
    });
  if (filters.owner !== "All")
    chips.push({
      key: "owner",
      label: `Owner: ${filters.owner}`,
      tone: "brand",
    });
  if (filters.priority !== "All") {
    const hot = filters.priority === "High" || filters.priority === "Urgent";
    chips.push({
      key: "priority",
      label: `Priority: ${filters.priority}`,
      tone: hot ? "danger" : "brand",
    });
  }
  if (filters.deadline !== "any") {
    const label = DEADLINE_OPTIONS.find(
      (o) => o.value === filters.deadline,
    )?.label;
    chips.push({ key: "deadline", label: `Deadline: ${label}`, tone: "brand" });
  }
  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-t px-3 py-3 sm:px-4">
      <span className="text-xs text-muted-foreground">Active Filters:</span>
      {chips.map((c) => (
        <span
          key={c.key}
          className={cn(
            "inline-flex items-center gap-1 rounded-md py-1 pr-1 pl-2 text-xs font-semibold",
            TONE_SOFT[c.tone],
          )}
        >
          {c.label}
          <button
            type="button"
            aria-label={`Remove filter ${c.label}`}
            onClick={() => onRemove(c.key)}
            className="rounded p-0.5 hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none dark:hover:bg-white/10"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="ml-1 text-xs font-semibold text-brand-ink hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
      >
        Clear All
      </button>
    </div>
  );
}
