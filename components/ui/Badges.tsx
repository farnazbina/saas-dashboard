import {
  ArrowDown,
  ArrowUp,
  CircleAlert,
  Equal,
  Flag,
  type LucideIcon,
} from "lucide-react";

import type { ProjectPriority, ProjectStatus } from "@/data/projects-data";
import { cn } from "@/lib/utils";
import { Pill, type Tone } from "@/components/dashboard/overview/Pill";

const STATUS_TONE: Record<ProjectStatus, Tone> = {
  "In Progress": "info",
  "At Risk": "danger",
  Planned: "neutral",
  Completed: "success",
};

export function StatusPill({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <Pill
      tone={STATUS_TONE[status]}
      dot={status !== "Completed"}
      className={className}
    >
      {status}
    </Pill>
  );
}

const PRIORITY_TONE: Record<ProjectPriority, Tone> = {
  Urgent: "danger",
  High: "danger",
  Medium: "neutral",
  Low: "info",
};
const LIST_ICON: Record<ProjectPriority, LucideIcon> = {
  Urgent: CircleAlert,
  High: ArrowUp,
  Medium: Equal,
  Low: ArrowDown,
};

/** variant "list" uses arrows (table), "card" uses a flag (grid) */
export function PriorityTag({
  priority,
  variant = "list",
  className,
}: {
  priority: ProjectPriority;
  variant?: "list" | "card";
  className?: string;
}) {
  const icon =
    variant === "card" && priority !== "Urgent" ? Flag : LIST_ICON[priority];
  return (
    <Pill
      tone={PRIORITY_TONE[priority]}
      icon={icon}
      className={cn(
        "rounded-md font-mono",
        // Urgent is the one solid tag; swap for a palette token if you add one
        priority === "Urgent" && "bg-red-700 text-white dark:bg-red-600",
        className,
      )}
    >
      {priority}
    </Pill>
  );
}
