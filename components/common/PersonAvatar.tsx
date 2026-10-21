import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export function PersonAvatar({
  name,
  src,
  round,
  className,
}: {
  name: string
  src?: string
  /** Circle instead of rounded square */
  round?: boolean
  className?: string
}) {
  const shape = round ? "rounded-full" : "rounded-lg"
  return (
    <Avatar className={cn("size-9", shape, className)}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className={cn("bg-brand-soft text-xs font-semibold text-brand-ink", shape)}>
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  )
}