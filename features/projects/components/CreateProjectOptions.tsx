import {
  File,
  FileCode2,
  Flag,
  Megaphone,
  Palette,
  Rocket,
} from "lucide-react";

import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { PROJECT_ICONS } from "./ProjectIcon";
import type { ProjectIconKey, ProjectPriority } from "@/data/projects-data";
import { PEOPLE, type Stage, type TemplateId } from "./CreateProjectModal";
import type { SelectOption } from "@/components/ui/SelectMenu";

export const ACCENTS = [
  { value: "#4f46e5", label: "Indigo", fg: "#ffffff" },
  { value: "#34d399", label: "Mint", fg: "#064e3b" },
  { value: "#c4c2fa", label: "Lavender", fg: "#312e81" },
  { value: "#22b8f5", label: "Sky", fg: "#ffffff" },
  { value: "#ffd3cc", label: "Peach", fg: "#7c2d12" },
  { value: "#7cc4fb", label: "Light blue", fg: "#0c4a6e" },
];

const ICON_LABELS: [ProjectIconKey, string][] = [
  ["folder", "Folder"],
  ["web", "Web app"],
  ["mobile", "Mobile app"],
  ["design", "Design"],
  ["analytics", "Analytics"],
  ["auth", "Security"],
  ["billing", "Billing"],
  ["api", "API"],
  ["megaphone", "Marketing"],
  ["data", "Data"],
  ["globe", "Global"],
  ["server", "Infrastructure"],
];
export const ICON_OPTIONS: SelectOption<ProjectIconKey>[] = ICON_LABELS.map(
  ([value, label]) => {
    const Icon = PROJECT_ICONS[value];
    return {
      value,
      label,
      icon: <Icon className="size-4 text-brand-ink" aria-hidden />,
    };
  },
);

const icon = "size-4 text-muted-foreground";
export const TEMPLATE_OPTIONS: SelectOption<TemplateId>[] = [
  {
    value: "software",
    label: "Software Development",
    badge: "Kanban",
    icon: <FileCode2 className={icon} aria-hidden />,
  },
  {
    value: "marketing",
    label: "Marketing Campaign",
    badge: "Timeline",
    icon: <Megaphone className={icon} aria-hidden />,
  },
  {
    value: "design",
    label: "Design Sprint",
    badge: "Board",
    icon: <Palette className={icon} aria-hidden />,
  },
  {
    value: "launch",
    label: "Product Launch",
    badge: "Checklist",
    icon: <Rocket className={icon} aria-hidden />,
  },
  {
    value: "blank",
    label: "Blank Project",
    icon: <File className={icon} aria-hidden />,
  },
];

export const PRIORITY_OPTIONS: SelectOption<ProjectPriority>[] = [
  {
    value: "Urgent",
    label: "Urgent",
    icon: <Flag className="size-4 text-danger-ink" aria-hidden />,
  },
  {
    value: "High",
    label: "High Priority",
    icon: <Flag className="size-4 text-danger-ink" aria-hidden />,
  },
  {
    value: "Medium",
    label: "Medium Priority",
    icon: <Flag className="size-4 text-warning-ink" aria-hidden />,
  },
  {
    value: "Low",
    label: "Low Priority",
    icon: <Flag className="size-4 text-info-ink" aria-hidden />,
  },
];

export const STAGE_OPTIONS: SelectOption<Stage>[] = [
  {
    value: "Planned",
    label: "Planned",
    icon: <span className="mx-0.5 size-2 rounded-full bg-info" aria-hidden />,
  },
  {
    value: "In Progress",
    label: "In Progress",
    icon: <span className="mx-0.5 size-2 rounded-full bg-brand" aria-hidden />,
  },
];

export const OWNER_OPTIONS: SelectOption<string>[] = PEOPLE.map((p) => ({
  value: p.id,
  label: p.name,
  description: p.role,
  icon: <PersonAvatar name={p.name} round className="size-7" />,
}));
