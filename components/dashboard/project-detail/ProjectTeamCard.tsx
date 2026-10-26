import { Plus } from "lucide-react";

import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { Pill } from "@/components/dashboard/overview/Pill";
import { SectionCard } from "@/components/dashboard/overview/SectionCard";
import type { Presence, TeamMember } from "@/data/project-detail-data";
import { cn } from "@/lib/utils";

const PRESENCE: Record<Presence, { label: string; dot: string }> = {
  online: { label: "Online", dot: "bg-success" },
  away: { label: "Away", dot: "bg-warning" },
  offline: { label: "Offline", dot: "bg-muted-foreground" },
};

export function ProjectTeamCard({
  team,
  className,
}: {
  team: TeamMember[];
  className?: string;
}) {
  return (
    <SectionCard
      title="Project Team"
      badge={
        <Pill tone="neutral" className="font-mono">
          {team.length}
        </Pill>
      }
      className={className}
      action={
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-ink hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
        >
          <Plus className="size-3.5" aria-hidden /> Add
        </button>
      }
    >
      <ul className="divide-y">
        {team.map((m) => (
          <li
            key={m.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span className="relative shrink-0">
              <PersonAvatar name={m.name} round className="size-10" />
              <span
                className={cn(
                  "absolute right-0 bottom-0 size-3 rounded-full ring-2 ring-card",
                  PRESENCE[m.presence].dot,
                )}
              >
                <span className="sr-only">{PRESENCE[m.presence].label}</span>
              </span>
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold">{m.name}</p>
                {m.lead && (
                  <Pill tone="brand" className="rounded-md">
                    Lead
                  </Pill>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {m.role}
                {m.owner ? " • Owner" : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
