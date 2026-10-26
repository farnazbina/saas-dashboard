import {
  ArrowRightLeft,
  CircleCheck,
  FileText,
  Plus,
  type LucideIcon,
} from "lucide-react";

import { ACTIVITY, type ActivityKind } from "@/data/overview-data";
import { cn } from "@/lib/utils";
import { Pill, TONE_SOFT, type Tone } from "./Pill";
import { SectionCard, ViewAllLink } from "./SectionCard";

const KIND: Record<ActivityKind, { icon: LucideIcon; tone: Tone }> = {
  completed: { icon: CircleCheck, tone: "success" },
  moved: { icon: ArrowRightLeft, tone: "info" },
  created: { icon: Plus, tone: "brand" },
  uploaded: { icon: FileText, tone: "neutral" },
};

type Item = (typeof ACTIVITY)[number];

function Sentence({ item }: { item: Item }) {
  const actor = <span className="font-semibold">{item.actor}</span>;
  const target = (
    <a href="#" className="font-medium text-brand-ink hover:underline">
      {item.target}
    </a>
  );

  switch (item.kind) {
    case "completed":
      return (
        <>
          {actor} completed {target}
        </>
      );
    case "moved":
      return (
        <>
          {actor} moved {item.target} to{" "}
          <Pill tone="info" className="align-middle">
            {item.extra}
          </Pill>
        </>
      );
    case "created":
      return (
        <>
          {actor} created a new task in{" "}
          <span className="font-medium">{item.target}</span>
        </>
      );
    case "uploaded":
      return (
        <>
          {actor} uploaded project documentation for{" "}
          <span className="font-medium">{item.target}</span>
        </>
      );
  }
}

export function RecentActivity({ className }: { className?: string }) {
  return (
    <SectionCard
      title="Recent Activity"
      action={<ViewAllLink>View all</ViewAllLink>}
      className={className}
    >
      <ol className="relative flex flex-col gap-5">
        {/* Timeline rail */}
        <span
          aria-hidden
          className="absolute top-3 bottom-3 left-3 w-px bg-border"
        />
        {ACTIVITY.map((item) => {
          const { icon: Icon, tone } = KIND[item.kind];
          return (
            <li key={item.id} className="relative flex gap-3">
              <span
                className={cn(
                  "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full ring-4 ring-card",
                  TONE_SOFT[tone],
                )}
              >
                <Icon className="size-3.5" aria-hidden />
              </span>
              <div className="min-w-0 text-sm leading-snug">
                <p>
                  <Sentence item={item} />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.time}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionCard>
  );
}
