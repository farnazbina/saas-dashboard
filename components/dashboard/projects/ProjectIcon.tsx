import {
  AppWindow,
  Bell,
  BarChart3,
  BookOpen,
  CreditCard,
  Database,
  Gauge,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Languages,
  Mail,
  Map as MapIcon,
  Megaphone,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  Webhook,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { ProjectIconKey, ProjectStatus } from "@/data/projects-data";
import { cn } from "@/lib/utils";
import { TONE_SOFT, type Tone } from "@/components/dashboard/overview/Pill";

const ICONS: Record<ProjectIconKey, LucideIcon> = {
  web: AppWindow,
  mobile: Smartphone,
  crm: LayoutDashboard,
  design: Palette,
  analytics: BarChart3,
  auth: ShieldCheck,
  billing: CreditCard,
  api: Webhook,
  megaphone: Megaphone,
  data: Database,
  support: LifeBuoy,
  bell: Bell,
  tools: Wrench,
  gauge: Gauge,
  server: Server,
  globe: Globe,
  book: BookOpen,
  map: MapIcon,
  mail: Mail,
  language: Languages,
};

const STATUS_TONE: Record<ProjectStatus, Tone> = {
  "In Progress": "brand",
  "At Risk": "danger",
  Planned: "neutral",
  Completed: "success",
};

export function ProjectIcon({
  icon,
  status,
  className,
}: {
  icon: ProjectIconKey;
  status: ProjectStatus;
  className?: string;
}) {
  const Icon = ICONS[icon];
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg",
        TONE_SOFT[STATUS_TONE[status]],
        className,
      )}
    >
      <Icon className="size-[18px]" aria-hidden />
    </span>
  );
}
