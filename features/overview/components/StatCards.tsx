import {
  CircleCheck,
  CircleCheckBig,
  CirclePlay,
  FolderOpen,
  ListChecks,
  type LucideIcon,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Pill, TONE_SOFT, type Tone } from "./Pill";
import { ProgressBar } from "./ProgressBar";

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
  valueClassName,
  aside,
  children,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: Tone;
  valueClassName?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col justify-between gap-3 rounded-2xl border bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] leading-tight font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg",
            TONE_SOFT[tone],
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={cn(
            "text-3xl leading-none font-bold tracking-tight",
            valueClassName,
          )}
        >
          {value}
        </span>
        {aside}
      </div>
      {children}
    </div>
  );
}

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
      <StatCard
        label="Total Projects"
        value="24"
        icon={FolderOpen}
        tone="brand"
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Pill tone="success" icon={TrendingUp}>
            12.5%
          </Pill>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </StatCard>

      <StatCard
        label="Active Projects"
        value="12"
        icon={CirclePlay}
        tone="info"
      >
        <Pill tone="info" dot className="self-start">
          3 near deadline
        </Pill>
      </StatCard>

      <StatCard label="Completed" value="8" icon={CircleCheck} tone="success">
        <Pill tone="success" className="self-start">
          +2 this month
        </Pill>
      </StatCard>

      <StatCard
        label="Overdue"
        value="2"
        icon={TriangleAlert}
        tone="danger"
        valueClassName="text-danger"
      >
        <Pill tone="danger" dot className="self-start">
          Requires attention
        </Pill>
      </StatCard>

      <StatCard
        label="Total Tasks"
        value="186"
        icon={ListChecks}
        tone="neutral"
      >
        <span className="text-xs text-muted-foreground">
          Across all projects
        </span>
      </StatCard>

      <StatCard
        label="Completed Tasks"
        value="124"
        icon={CircleCheckBig}
        tone="violet"
        aside={
          <span className="text-xs font-medium text-muted-foreground">
            66.7%
          </span>
        }
      >
        <ProgressBar value={66.7} label="Completed tasks" />
      </StatCard>
    </div>
  );
}
