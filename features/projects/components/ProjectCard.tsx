"use client";

import Link from "next/link";
import {
  Archive,
  CalendarDays,
  CircleCheck,
  Clock,
  MoreHorizontal,
  TriangleAlert,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pill } from "@/components/dashboard/overview/Pill";
import { ProgressBar } from "@/components/dashboard/overview/ProgressBar";
import type { Project } from "@/data/projects-data";
import { formatDate } from "@/utils/projects-utils";
import { cn } from "@/lib/utils";
import { PriorityTag, StatusPill } from "@/components/ui/Badges";
import { ProjectIcon } from "./ProjectIcon";
import { TeamAvatars } from "@/components/ui/TeamAvatar";

function DueChip({ project }: { project: Project }) {
  const date = formatDate(project.due);
  const base = "px-2.5 py-1 font-mono text-xs rounded-md";
  if (project.status === "Completed")
    return (
      <Pill tone="success" icon={CircleCheck} className={base}>
        {date}
      </Pill>
    );
  if (project.status === "At Risk")
    return (
      <Pill tone="danger" icon={TriangleAlert} className={base}>
        {date}
      </Pill>
    );
  if (project.dueSoon)
    return (
      <Pill tone="info" icon={Clock} className={base}>
        {date}
      </Pill>
    );
  return (
    <Pill
      tone="neutral"
      icon={CalendarDays}
      className={cn(base, "bg-transparent")}
    >
      {date}
    </Pill>
  );
}

export function ProjectCard({
  project: p,
  onArchive,
}: {
  project: Project;
  onArchive: (id: string) => void;
}) {
  const tone =
    p.status === "At Risk"
      ? "danger"
      : p.status === "Completed"
        ? "success"
        : "brand";
  const pctText =
    p.status === "At Risk"
      ? "text-danger-ink"
      : p.status === "Completed"
        ? "text-success-ink"
        : "text-brand-ink";

  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-2xl border bg-card p-4 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <ProjectIcon icon={p.icon} status={p.status} className="size-10" />
        <StatusPill status={p.status} />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label={`Actions for ${p.name}`}
                className="ml-auto rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card">
            <DropdownMenuItem
              render={<Link href={`/projects/${p.id}`} />}
            >
              Open project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchive(p.id)}>
              <Archive className="size-4" /> Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">
            <Link
              href={`/projects/${p.id}`}
              className="hover:text-brand-ink hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
            >
              {p.name}
            </Link>
          </h3>
          <PriorityTag
            priority={p.priority}
            variant="card"
            className="shrink-0"
          />
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {p.description}
        </p>
      </div>

      <div className="rounded-xl bg-panel p-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold">Project Progress</span>
          <span className={cn("font-mono font-semibold", pctText)}>
            {p.progress}%
          </span>
        </div>
        <ProgressBar
          value={p.progress}
          tone={tone}
          label={`${p.name} progress`}
          className="h-2"
        />
        <p
          className={cn(
            "mt-2 flex items-center gap-1 text-xs",
            p.status === "Completed"
              ? "text-success-ink"
              : "text-muted-foreground",
          )}
        >
          {p.status === "Completed" && (
            <CircleCheck className="size-3.5" aria-hidden />
          )}
          {p.tasksDone} of {p.tasksTotal} tasks completed
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <TeamAvatars names={p.team} />
        <DueChip project={p} />
      </div>
    </article>
  );
}
