import { Flag, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pill } from "@/components/dashboard/overview/Pill";
import { StatusPill } from "@/components/common/Badges";
import { PROJECT_ICONS } from "@/components/dashboard/projects/ProjectIcon";
import { TeamAvatars } from "@/components/common/TeamAvatar";
import type { ProjectDetail } from "@/data/project-detail-data";
import type { Project } from "@/data/projects-data";
import { FavoriteButton } from "./FavoriteButton";
import { ProjectActions } from "./ProjectActions";

const PRIORITY_LABEL = {
  Urgent: "Urgent",
  High: "High Priority",
  Medium: "Medium Priority",
  Low: "Low Priority",
} as const;

export function ProjectHeader({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail;
}) {
  const Icon = PROJECT_ICONS[project.icon];
  const hot = project.priority === "High" || project.priority === "Urgent";

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm sm:size-14">
          <Icon className="size-6 sm:size-7" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {project.name}
            </h1>
            <FavoriteButton initial={detail.favorite} />
            <StatusPill status={project.status} />
            <Pill
              tone={
                hot
                  ? "danger"
                  : project.priority === "Medium"
                    ? "warning"
                    : "info"
              }
              icon={Flag}
            >
              {PRIORITY_LABEL[project.priority]}
            </Pill>
          </div>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {detail.code} • {detail.sprint}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <TeamAvatars names={project.team} max={4} />
          <button
            type="button"
            aria-label="Add team member"
            className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-brand-soft hover:text-brand-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <span className="hidden h-8 w-px bg-border sm:block" aria-hidden />
        <Button
          variant="outline"
          size="sm"
          className="ml-auto gap-2 bg-card sm:ml-0"
        >
          <Pencil className="size-3.5" />
          Edit Project
        </Button>
        <ProjectActions />
      </div>
    </div>
  );
}
