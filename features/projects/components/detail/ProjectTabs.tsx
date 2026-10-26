import Link from "next/link";
import {
  CalendarDays,
  FolderOpen,
  History,
  LayoutGrid,
  ListChecks,
  Settings,
  SquareKanban,
  type LucideIcon,
} from "lucide-react";

import type { ProjectDetail } from "@/data/project-detail-data";
import { cn } from "@/lib/utils";
import { SyncStatus } from "./SyncStatus";

export type TabId =
  | "overview"
  | "tasks"
  | "board"
  | "calendar"
  | "files"
  | "activity"
  | "settings";

export const TABS: {
  id: TabId;
  label: string;
  icon: LucideIcon;
  count?: "tasks" | "board" | "files";
}[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "tasks", label: "Tasks", icon: ListChecks, count: "tasks" },
  { id: "board", label: "Board", icon: SquareKanban, count: "board" },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "files", label: "Files", icon: FolderOpen, count: "files" },
  { id: "activity", label: "Activity", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

export const isTabId = (v: string | undefined): v is TabId =>
  TABS.some((t) => t.id === v);

/** Link-based tabs: the active tab lives in ?tab=, so it is shareable and works without client state */
export function ProjectTabs({
  active,
  detail,
}: {
  active: TabId;
  detail: ProjectDetail;
}) {
  return (
    <nav
      aria-label="Project sections"
      className="flex items-center justify-between gap-4 border-t px-2 sm:px-4"
    >
      <div className="-mb-px flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map(({ id, label, icon: Icon, count }) => {
          const isActive = id === active;
          return (
            <Link
              key={id}
              href={`?tab=${id}`}
              scroll={false}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-3 py-3.5 text-sm font-medium whitespace-nowrap transition-colors",
                "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
                isActive
                  ? "border-brand text-brand-ink"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
              {count && (
                <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {detail.counts[count]}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      <SyncStatus
        initialLabel={detail.lastSynced}
        className="hidden shrink-0 md:flex"
      />
    </nav>
  );
}
