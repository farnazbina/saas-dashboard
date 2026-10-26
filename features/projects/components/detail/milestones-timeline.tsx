import { Check, ChevronRight } from "lucide-react"

import { Pill } from "@/features/overview/components/Pill"
import { SectionCard, ViewAllLink } from "@/features/overview/components/SectionCard"
import type { Milestone } from "@/data/project-detail-data"
import { formatDate } from "@/utils/projects-utils"
import { cn } from "@/lib/utils"

function Marker({ state }: { state: Milestone["state"] }) {
  if (state === "done")
    return (
      <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-success text-white ring-4 ring-card">
        <Check className="size-3.5" strokeWidth={3} aria-hidden />
        <span className="sr-only">Completed</span>
      </span>
    )
  if (state === "active")
    return (
      <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand ring-4 ring-brand-soft">
        <span className="size-2 rounded-full bg-white" />
        <span className="sr-only">In progress</span>
      </span>
    )
  return (
    <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted ring-4 ring-card">
      <span className="size-2 rounded-full bg-muted-foreground/60" />
      <span className="sr-only">Upcoming</span>
    </span>
  )
}

function StatePill({ state }: { state: Milestone["state"] }) {
  if (state === "done") return <Pill tone="success" className="rounded-md">Done</Pill>
  if (state === "active") return <Pill tone="brand" className="rounded-md bg-brand text-white">Active</Pill>
  return <Pill tone="neutral" className="rounded-md">Upcoming</Pill>
}

export function MilestonesTimeline({ milestones, className }: { milestones: Milestone[]; className?: string }) {
  return (
    <SectionCard
      title="Milestones Timeline"
      subtitle="Critical phase gates and target delivery deadlines."
      className={className}
      action={
        <ViewAllLink>
          <span className="inline-flex items-center gap-0.5">
            Manage Milestones <ChevronRight className="size-3.5" aria-hidden />
          </span>
        </ViewAllLink>
      }
    >
      <ol className="flex flex-col gap-3">
        {milestones.map((m, i) => {
          const done = m.state === "done"
          const upcoming = m.state === "upcoming"
          const due = m.due ? `Due: ${formatDate(m.due)}` : "No date set"
          return (
            <li key={m.id} className="relative flex gap-3">
              {i < milestones.length - 1 && (
                <span aria-hidden className="absolute top-6 -bottom-3 left-[11px] w-px bg-border" />
              )}
              <Marker state={m.state} />
              <div
                className={cn(
                  "min-w-0 flex-1 rounded-xl bg-panel p-3",
                  m.state === "active" && "ring-1 ring-brand/30"
                )}
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <div className="min-w-0">
                    <p className={cn("text-sm font-semibold", done && "text-muted-foreground line-through")}>
                      {m.title}
                      {m.state === "active" && m.progress != null && (
                        <span className="ml-1.5 font-mono text-xs font-semibold text-brand-ink">
                          ({m.progress}% Complete)
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{m.description}</p>
                    {upcoming && (
                      <p className="mt-2 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                        {due} <StatePill state={m.state} />
                      </p>
                    )}
                  </div>
                  {!upcoming && (
                    <p className="flex shrink-0 items-center gap-2 font-mono text-[11px] whitespace-nowrap text-muted-foreground">
                      {due} <StatePill state={m.state} />
                    </p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </SectionCard>
  )
}