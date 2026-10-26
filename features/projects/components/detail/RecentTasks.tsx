"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { Pill, type Tone } from "@/features/overview/components/Pill";
import { SectionCard } from "@/features/overview/components/SectionCard";
import { shortName } from "@/features/projects/components/list/CreateProjectModal";
import type { DetailTask, DetailTaskStatus } from "@/data/project-detail-data";
import { formatDate } from "@/utils/projects-utils";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<DetailTaskStatus, Tone> = {
  Done: "success",
  "In Progress": "info",
  "In Review": "violet",
  "To Do": "neutral",
};
const PRIORITY_TONE = {
  High: "danger",
  Medium: "warning",
  Low: "neutral",
} as const;

const th =
  "px-3 py-2.5 text-left text-[11px] font-medium tracking-wide text-muted-foreground uppercase";

export function RecentTasks({
  tasks: initial,
  totalTasks,
  className,
}: {
  tasks: DetailTask[];
  totalTasks: number;
  className?: string;
}) {
  const [tasks, setTasks] = React.useState(initial);

  // Ticking the checkbox marks a task Done (or puts it back to To Do)
  const toggle = (id: string) =>
    setTasks((all) =>
      all.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Done" ? "To Do" : "Done" }
          : t,
      ),
    );

  return (
    <SectionCard
      flush
      title="Recent Tasks"
      subtitle="Active work items tracked in this project workspace."
      className={className}
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(
              buttonVariants({ size: "sm" }),
              "gap-1.5 bg-brand text-white hover:bg-brand/90",
            )}
          >
            <Plus className="size-3.5" aria-hidden /> New Task
          </button>
          <Link
            href="?tab=tasks"
            scroll={false}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5 bg-card",
            )}
          >
            View all tasks ({totalTasks}){" "}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[380px] text-sm">
          <thead>
            <tr className="border-y bg-panel">
              <th className="w-10 py-2.5 pl-4 sm:pl-5">
                <span className="sr-only">Done</span>
              </th>
              <th className={th}>Task name</th>
              <th className={th}>Status</th>
              <th className={cn(th, "hidden md:table-cell")}>Priority</th>
              <th className={cn(th, "hidden sm:table-cell")}>Assignee</th>
              <th className={cn(th, "hidden pr-4 lg:table-cell sm:pr-5")}>
                Due date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map((t) => {
              const done = t.status === "Done";
              return (
                <tr key={t.id} className="transition-colors hover:bg-panel/60">
                  <td className="py-3 pl-4 sm:pl-5">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(t.id)}
                      aria-label={`Mark "${t.title}" as ${done ? "not done" : "done"}`}
                      className="size-4 rounded accent-brand"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <p
                      className={cn(
                        "font-medium",
                        done && "text-muted-foreground line-through",
                      )}
                    >
                      {t.title}
                    </p>
                    {/* Due date moves under the name where its column is hidden */}
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground lg:hidden">
                      {formatDate(t.due)}
                    </p>
                  </td>
                  <td className="px-3 py-3">
                    <Pill tone={STATUS_TONE[t.status]} dot>
                      {t.status}
                    </Pill>
                  </td>
                  <td className="hidden px-3 py-3 md:table-cell">
                    <Pill
                      tone={PRIORITY_TONE[t.priority]}
                      className="rounded-md font-mono"
                    >
                      {t.priority}
                    </Pill>
                  </td>
                  <td className="hidden px-3 py-3 sm:table-cell">
                    <div className="flex items-center gap-2">
                      <PersonAvatar
                        name={t.assignee}
                        round
                        className="size-7"
                      />
                      <span className="text-[13px] whitespace-nowrap">
                        {shortName(t.assignee)}
                      </span>
                    </div>
                  </td>
                  <td
                    className={cn(
                      "hidden px-3 py-3 pr-4 font-mono text-xs whitespace-nowrap lg:table-cell sm:pr-5",
                      t.dueSoon
                        ? "font-medium text-info-ink"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatDate(t.due)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
