import {
  Circle,
  Flag,
  Flame,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { MY_TASKS, type Priority, type TaskStatus } from "@/data/overview-data";
import { cn } from "@/lib/utils";
import { Pill, type Tone } from "./Pill";
import { SectionCard, ViewAllLink } from "./SectionCard";

const PRIORITY: Record<
  Priority,
  { tone: Tone; icon: LucideIcon; className?: string }
> = {
  Urgent: { tone: "danger", icon: Flame, className: "ring-1 ring-danger/40" },
  High: { tone: "danger", icon: Flag },
  Medium: { tone: "warning", icon: Flag },
  Low: { tone: "info", icon: Flag },
};

const STATUS: Record<TaskStatus, Tone> = {
  "To Do": "neutral",
  "In Progress": "brand",
  "In Review": "info",
  Done: "success",
};

const th = "px-3 py-2.5 font-medium";

export function MyTasksTable({ className }: { className?: string }) {
  return (
    <SectionCard
      flush
      title="My Tasks"
      badge={<Pill tone="brand">{MY_TASKS.length} assigned</Pill>}
      action={<ViewAllLink>View all tasks</ViewAllLink>}
      className={className}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-sm">
          <thead>
            <tr className="border-y bg-panel text-left text-[11px] tracking-wide text-muted-foreground uppercase">
              <th className="w-10 py-2.5 pl-4 sm:pl-5">
                <input
                  type="checkbox"
                  aria-label="Select all tasks"
                  className="size-4 rounded accent-brand"
                />
              </th>
              <th className={th}>Task name</th>
              <th className={cn(th, "hidden md:table-cell")}>Project</th>
              <th className={th}>Priority</th>
              <th className={cn(th, "hidden sm:table-cell")}>Due date</th>
              <th className={th}>Status</th>
              <th className={cn(th, "pr-4 text-right sm:pr-5")}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {MY_TASKS.map((t) => {
              const p = PRIORITY[t.priority];
              return (
                <tr key={t.id} className="transition-colors hover:bg-panel/60">
                  <td className="py-3 pl-4 sm:pl-5">
                    <input
                      type="checkbox"
                      aria-label={`Select ${t.title}`}
                      className="size-4 rounded accent-brand"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Circle
                        className="size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden
                      />
                      <span className="font-medium">{t.title}</span>
                    </div>
                  </td>
                  <td className="hidden px-3 py-3 text-xs text-muted-foreground md:table-cell">
                    {t.project}
                  </td>
                  <td className="px-3 py-3">
                    <Pill tone={p.tone} icon={p.icon} className={p.className}>
                      {t.priority}
                    </Pill>
                  </td>
                  <td
                    className={cn(
                      "hidden px-3 py-3 text-xs whitespace-nowrap sm:table-cell",
                      t.dueUrgent
                        ? "font-semibold text-danger-ink"
                        : "text-muted-foreground",
                    )}
                  >
                    {t.due}
                  </td>
                  <td className="px-3 py-3">
                    <Pill tone={STATUS[t.status]}>{t.status}</Pill>
                  </td>
                  <td className="py-3 pr-4 text-right sm:pr-5">
                    <button
                      type="button"
                      aria-label={`Actions for ${t.title}`}
                      className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
        <span>
          Showing {MY_TASKS.length} of {MY_TASKS.length} active tasks
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
            Next
          </Button>
        </div>
      </footer>
    </SectionCard>
  );
}
