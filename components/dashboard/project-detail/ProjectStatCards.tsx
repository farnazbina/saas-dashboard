import {
  CircleAlert,
  CircleCheckBig,
  Clock,
  Eye,
  Milestone,
  SquareCheckBig,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { TONE_SOFT, type Tone } from "@/components/dashboard/overview/Pill";
import type { ProjectDetail } from "@/data/project-detail-data";
import { cn } from "@/lib/utils";

function DetailStat({
  label,
  value,
  aside,
  icon: Icon,
  tone,
  valueClassName,
  children,
}: {
  label: string;
  value: number;
  aside?: string;
  icon: LucideIcon;
  tone: Tone;
  valueClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-2xl border bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] leading-tight font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            TONE_SOFT[tone],
          )}
        >
          <Icon className="size-[18px]" aria-hidden />
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "text-3xl leading-none font-bold tracking-tight",
            valueClassName,
          )}
        >
          {value}
        </span>
        {aside && (
          <span className="text-sm font-medium text-success-ink">{aside}</span>
        )}
      </div>
      <p className="flex items-center gap-1.5 text-xs">{children}</p>
    </div>
  );
}

export function ProjectStatCards({ detail }: { detail: ProjectDetail }) {
  const count = (key: string) =>
    detail.breakdown.find((b) => b.key === key)?.count ?? 0;
  const total = detail.breakdown.reduce((s, b) => s + b.count, 0);
  const done = count("done");
  const inReview = count("inReview");
  const active = count("inProgress") + inReview;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <DetailStat
        label="Total Tasks"
        value={total}
        icon={SquareCheckBig}
        tone="brand"
      >
        <span className="flex items-center gap-1.5 text-brand-ink">
          <Milestone className="size-3.5" aria-hidden /> Across{" "}
          {detail.milestones} active milestones
        </span>
      </DetailStat>

      <DetailStat
        label="Completed"
        value={done}
        aside={total ? `(${Math.round((done / total) * 100)}%)` : undefined}
        icon={CircleCheckBig}
        tone="success"
      >
        <span className="flex items-center gap-1.5 text-success-ink">
          <TrendingUp className="size-3.5" aria-hidden /> +
          {detail.completedThisWeek} completed this week
        </span>
      </DetailStat>

      <DetailStat label="In Progress" value={active} icon={Clock} tone="info">
        <span className="flex items-center gap-1.5 text-info-ink">
          <Eye className="size-3.5" aria-hidden /> {inReview} currently in code
          review
        </span>
      </DetailStat>

      <DetailStat
        label="Overdue"
        value={detail.overdue}
        icon={CircleAlert}
        tone="danger"
        valueClassName={detail.overdue ? "text-danger" : undefined}
      >
        {detail.overdue ? (
          <span className="flex items-center gap-1.5 font-medium text-danger-ink">
            <CircleAlert className="size-3.5" aria-hidden /> Requires immediate
            attention
          </span>
        ) : (
          <span className="text-muted-foreground">Nothing overdue</span>
        )}
      </DetailStat>
    </div>
  );
}
