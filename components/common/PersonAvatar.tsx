import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function PersonAvatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("size-9 rounded-lg", className)}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className="rounded-lg bg-brand-soft text-xs font-semibold text-brand-ink">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
