import { SectionCard, ViewAllLink } from "@/features/overview/components/SectionCard";
import type {
  DetailActivity,
  DetailActivityKind,
} from "@/data/project-detail-data";
import { cn } from "@/lib/utils";

const DOT: Record<DetailActivityKind, string> = {
  completed: "bg-success",
  status: "bg-info",
  comment: "bg-violet",
  upload: "bg-brand",
};

const link = "font-medium text-brand-ink hover:underline";

function Sentence({ item }: { item: DetailActivity }) {
  const actor = <b className="font-semibold">{item.actor}</b>;
  switch (item.kind) {
    case "completed":
      return (
        <>
          {actor} completed{" "}
          <a href="#" className={link}>
            {item.target}
          </a>
          .
        </>
      );
    case "status":
      return (
        <>
          {actor} updated status on{" "}
          <a href="#" className={link}>
            {item.target}
          </a>{" "}
          to {item.extra}.
        </>
      );
    case "comment":
      return (
        <>
          {actor} left a comment:{" "}
          <i className="text-muted-foreground">“{item.extra}”.</i>
        </>
      );
    case "upload":
      return (
        <>
          {actor} uploaded <span className="font-medium">{item.target}</span>.
        </>
      );
  }
}

export function ProjectActivity({
  items,
  className,
}: {
  items: DetailActivity[];
  className?: string;
}) {
  return (
    <SectionCard
      title="Recent Activity"
      className={className}
      action={<ViewAllLink href="?tab=activity">View all</ViewAllLink>}
    >
      <ol className="relative flex flex-col gap-5">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[4px] w-px bg-border"
        />
        {items.map((a) => (
          <li key={a.id} className="relative flex gap-3">
            <span
              className={cn(
                "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full ring-4 ring-card",
                DOT[a.kind],
              )}
            />
            <div className="min-w-0 text-[13px] leading-snug">
              <p>
                <Sentence item={a} />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{a.time}</p>
            </div>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
