import {
  AppWindow, Bell, BarChart3, BookOpen, CreditCard, Database, FolderOpen, Gauge, Globe, LayoutDashboard,
  LifeBuoy, Languages, Mail, Map as MapIcon, Megaphone, Palette, Server, ShieldCheck, Smartphone,
  Webhook, Wrench, type LucideIcon,
} from "lucide-react"

import type { ProjectIconKey, ProjectStatus } from "@/data/projects-data"
import { cn } from "@/lib/utils"
import { TONE_SOFT, type Tone } from "@/components/dashboard/overview/Pill"

export const PROJECT_ICONS: Record<ProjectIconKey, LucideIcon> = {
  folder: FolderOpen, web: AppWindow, mobile: Smartphone, crm: LayoutDashboard, design: Palette, analytics: BarChart3,
  auth: ShieldCheck, billing: CreditCard, api: Webhook, megaphone: Megaphone, data: Database,
  support: LifeBuoy, bell: Bell, tools: Wrench, gauge: Gauge, server: Server, globe: Globe,
  book: BookOpen, map: MapIcon, mail: Mail, language: Languages,
}

const STATUS_TONE: Record<ProjectStatus, Tone> = {
  "In Progress": "brand",
  "At Risk": "danger",
  Planned: "neutral",
  Completed: "success",
}

export function ProjectIcon({
  icon,
  status,
  accent,
  className,
}: {
  icon: ProjectIconKey
  status: ProjectStatus
  /** Hex accent picked at creation; At Risk / Completed keep their status colours */
  accent?: string
  className?: string
}) {
  const Icon = PROJECT_ICONS[icon]
  const useAccent = accent && status !== "At Risk" && status !== "Completed"
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg",
        !useAccent && TONE_SOFT[STATUS_TONE[status]],
        className
      )}
      style={
        useAccent
          ? {
              background: `color-mix(in oklab, ${accent} 20%, transparent)`,
              color: `color-mix(in oklab, ${accent} 70%, var(--foreground))`,
            }
          : undefined
      }
    >
      <Icon className="size-[18px]" aria-hidden />
    </span>
  )
}