import { DEADLINES } from "@/data/overview-data";
import { PersonAvatar } from "../../../components/ui/PersonAvatar";
import { Pill } from "./Pill";
import { ProgressBar } from "./ProgressBar";
import { SectionCard, ViewAllLink } from "./SectionCard";

export function UpcomingDeadlines({ className }: { className?: string }) {
  return (
    <SectionCard
      title="Upcoming Deadlines"
      badge={<Pill tone="brand">{DEADLINES.length} imminent</Pill>}
      action={<ViewAllLink>View all</ViewAllLink>}
      className={className}
    >
      <ul className="flex flex-col gap-3">
        {DEADLINES.map((d) => (
          <li key={d.id} className="rounded-xl border bg-panel p-3">
            <div className="flex items-start gap-3">
              <PersonAvatar name={d.lead} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{d.project}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Lead: {d.lead}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Pill tone={d.atRisk ? "danger" : "brand"}>{d.status}</Pill>
                <span className="text-xs text-muted-foreground">{d.due}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar
                value={d.progress}
                tone={d.atRisk ? "danger" : "brand"}
                label={`${d.project} progress`}
              />
              <span className="w-9 text-right text-xs font-semibold tabular-nums">
                {d.progress}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
