import { PersonAvatar } from "./PersonAvatar";

export function TeamAvatars({
  names,
  max = 3,
}: {
  names: string[];
  max?: number;
}) {
  const shown = names.slice(0, max);
  const extra = names.length - shown.length;
  return (
    <div className="flex -space-x-2">
      {shown.map((n) => (
        <PersonAvatar
          key={n}
          name={n}
          round
          className="size-7 ring-2 ring-card"
        />
      ))}
      {extra > 0 && (
        <span className="relative flex size-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground ring-2 ring-card">
          +{extra}
        </span>
      )}
    </div>
  );
}
