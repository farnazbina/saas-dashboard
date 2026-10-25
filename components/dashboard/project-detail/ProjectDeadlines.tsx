import { Pill } from "@/components/dashboard/overview/Pill";
import { SectionCard, ViewAllLink } from "@/components/dashboard/overview/SectionCard";
import { deadlineBadge, type DeadlineItem } from "@/data/project-detail-data";

function DateTile({ iso }: { iso: string }) {
  const d = new Date(`${iso}T00:00:00Z`);
  const month = d
    .toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
  return (
    <div className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-soft text-brand-ink">
      <span className="text-[9px] leading-none font-bold tracking-wide">
        {month}
      </span>
      <span className="mt-0.5 text-base leading-none font-bold">
        {d.getUTCDate()}
      </span>
    </div>
  );
}

export function ProjectDeadlines({
  items,
  className,
}: {
  items: DeadlineItem[];
  className?: string;
}) {
  return (
    <SectionCard
      title="Upcoming Deadlines"
      className={className}
      action={<ViewAllLink href="?tab=calendar">View calendar</ViewAllLink>}
    >
      {items.length === 0 ? (
        <p className="rounded-xl bg-panel p-4 text-center text-sm text-muted-foreground">
          No upcoming deadlines.
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {items.map((d) => {
            const badge = d.target
              ? { label: "Target", tone: "brand" as const }
              : deadlineBadge(d.due);
            return (
              <li
                key={d.id}
                className="flex items-start gap-3 rounded-xl bg-panel p-3"
              >
                <DateTile iso={d.due} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{d.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {d.description}
                  </p>
                </div>
                <Pill tone={badge.tone} className="rounded-md font-mono">
                  {badge.label}
                </Pill>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
