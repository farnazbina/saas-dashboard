"use client";

import * as React from "react";
import {
  ArrowUpDown,
  CalendarDays,
  LayoutGrid,
  List,
  Search,
} from "lucide-react";

import {
  PRIORITIES,
  STATUSES,
  type ProjectPriority,
  type ProjectStatus,
} from "@/data/projects-data";
import {
  DEADLINE_OPTIONS,
  SORT_OPTIONS,
  type DeadlineFilter,
  type Filters,
  type SortKey,
} from "@/utils/projects-utils";
import { cn } from "@/lib/utils";
import { FilterMenu, type Option } from "./filter-menu";

export type ViewMode = "list" | "grid";

type Props = {
  filters: Filters;
  onFilters: (patch: Partial<Filters>) => void;
  owners: string[];
  sort: SortKey;
  onSort: (s: SortKey) => void;
  view: ViewMode;
  onView: (v: ViewMode) => void;
  /** Active-filter chips render under a divider */
  children?: React.ReactNode;
};

const withAll = <T extends string>(items: T[]): Option<T | "All">[] => [
  { value: "All", label: "All" },
  ...items.map((i) => ({ value: i, label: i })),
];

export function ProjectsToolbar({
  filters,
  onFilters,
  owners,
  sort,
  onSort,
  view,
  onView,
  children,
}: Props) {
  const searchRef = React.useRef<HTMLInputElement>(null);

  // Cmd/Ctrl+F focuses project search (this overrides the browser's find on this page)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hot = filters.priority === "High" || filters.priority === "Urgent";

  return (
    <div className="rounded-2xl border bg-card shadow-xs">
      <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4">
        <label className="flex h-9 w-full items-center gap-2 rounded-lg bg-panel px-3 text-sm focus-within:ring-2 focus-within:ring-brand sm:w-64">
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <input
            ref={searchRef}
            type="search"
            value={filters.query}
            onChange={(e) => onFilters({ query: e.target.value })}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd className="hidden rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
            ⌘F
          </kbd>
        </label>

        <FilterMenu
          label="Status"
          value={filters.status}
          options={withAll<ProjectStatus>(STATUSES)}
          defaultValue="All"
          onChange={(status) => onFilters({ status })}
        />
        <FilterMenu
          label="Owner"
          value={filters.owner}
          options={[
            { value: "All", label: "All" },
            ...owners.map((o) => ({ value: o, label: o })),
          ]}
          defaultValue="All"
          onChange={(owner) => onFilters({ owner })}
        />
        <FilterMenu
          label="Priority"
          value={filters.priority}
          options={withAll<ProjectPriority>(PRIORITIES)}
          defaultValue="All"
          activeClass={hot ? "text-danger-ink" : "text-brand-ink"}
          onChange={(priority) => onFilters({ priority })}
        />
        <FilterMenu<DeadlineFilter>
          label="Deadline"
          icon={CalendarDays}
          value={filters.deadline}
          options={DEADLINE_OPTIONS}
          defaultValue="any"
          onChange={(deadline) => onFilters({ deadline })}
        />

        <div className="flex w-full items-center justify-between gap-2 sm:ml-auto sm:w-auto">
          <FilterMenu<SortKey>
            label="Sort"
            icon={ArrowUpDown}
            value={sort}
            options={SORT_OPTIONS}
            onChange={onSort}
            align="end"
          />
          <div
            role="group"
            aria-label="View mode"
            className="flex rounded-lg border bg-panel p-0.5"
          >
            {(
              [
                ["grid", LayoutGrid, "Grid view"],
                ["list", List, "List view"],
              ] as const
            ).map(([mode, Icon, label]) => (
              <button
                key={mode}
                type="button"
                aria-pressed={view === mode}
                aria-label={label}
                onClick={() => onView(mode)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
                  view === mode
                    ? "bg-card text-brand shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
