import { CalendarDays } from "lucide-react";

import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { ProgressBar } from "@/features/overview/components/ProgressBar";
import {
  deadlineStatus,
  formatRange,
  type ProjectDetail,
} from "@/data/project-detail-data";
import type { Project } from "@/data/projects-data";
import { cn } from "@/lib/utils";

const chip =
  "inline-flex items-center gap-2 rounded-full bg-panel px-3 py-1.5 text-xs font-medium";
const TONE_TEXT = {
  info: "text-info-ink",
  warning: "text-warning-ink",
  danger: "text-danger-ink",
} as const;

export function ProjectMetaChips({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail;
}) {
  const deadline =
    project.status === "Completed" ? null : deadlineStatus(detail.endDate);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={chip}>
        <PersonAvatar name={project.owner} round className="size-5" />
        {project.owner} (Owner)
      </span>

      <span className={chip}>
        <CalendarDays className="size-3.5 text-muted-foreground" aria-hidden />
        {formatRange(detail.startDate, detail.endDate)}
        {deadline && (
          <span className={cn("font-semibold", TONE_TEXT[deadline.tone])}>
            ({deadline.label})
          </span>
        )}
      </span>

      <span className={chip}>
        <b className="font-semibold">{project.progress}%</b>
        <span className="text-muted-foreground">
          {project.tasksDone}/{project.tasksTotal} tasks
        </span>
        <ProgressBar
          value={project.progress}
          label="Project completion"
          className="w-16 sm:w-24"
        />
      </span>
    </div>
  );
}
