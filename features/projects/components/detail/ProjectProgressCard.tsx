import { Gauge } from "lucide-react"

import { SectionCard } from "@/features/overview/components/SectionCard"
import type { ProjectDetail } from "@/data/project-detail-data"
import { Sparkline } from "./Sparkline"

export function ProjectProgressCard({ detail, className }: { detail: ProjectDetail; className?: string }) {
  const total = detail.breakdown.reduce((s, b) => s + b.count, 0)
  const done = detail.breakdown.find((b) => b.key === "done")?.count ?? 0
  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0)
  const summary = detail.breakdown.map((b) => `${b.label} ${b.count}`).join(", ")

  return (
    <SectionCard
      title="Project Progress"
      subtitle="Overall completion metrics based on closed sprint deliverables."
      className={className}
      action={
        <div className="text-right">
          <p className="text-2xl leading-none font-bold text-brand-ink">{pct(done)}%</p>
          <p className="mt-1 text-xs whitespace-nowrap text-muted-foreground">
            {done} of {total} tasks
          </p>
        </div>
      }
    >
      {/* Segmented bar: segment widths are proportional to task counts */}
      <div role="img" aria-label={`Task breakdown: ${summary}`} className="flex h-2.5 w-full gap-px overflow-hidden rounded-full bg-border">
        {detail.breakdown
          .filter((b) => b.count > 0)
          .map((b) => (
            <div key={b.key} style={{ flex: `${b.count} 1 0%`, background: b.color }} />
          ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
        {detail.breakdown.map((b) => (
          <li key={b.key} className="flex items-center gap-2">
            <span className="size-2.5 rounded-[3px]" style={{ background: b.color }} aria-hidden />
            <span className="text-muted-foreground">{b.label}:</span>
            <span className="font-semibold">
              {b.count} ({pct(b.count)}%)
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 rounded-xl bg-panel p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-ink">
            <Gauge className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold">Velocity Pace: {detail.velocity.pace} pts/week</p>
            <p className="text-xs text-muted-foreground">{detail.velocity.note}</p>
          </div>
        </div>
        <Sparkline values={detail.velocity.trend} className="h-9 w-28 shrink-0 self-end sm:self-auto" />
      </div>
    </SectionCard>
  )
}