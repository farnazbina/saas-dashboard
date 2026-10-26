"use client"

import { Archive, ChevronDown, CircleDot, Trash2, UserPlus, X } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { STATUSES, type ProjectStatus } from "@/data/projects-data"
import { cn } from "@/lib/utils"

const action =
  "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-bulk-foreground/90 transition-colors hover:bg-white/10 hover:text-bulk-foreground focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"

export function BulkActionBar({
  count,
  owners,
  onStatus,
  onOwner,
  onArchive,
  onDelete,
  onClear,
}: {
  count: number
  owners: string[]
  onStatus: (s: ProjectStatus) => void
  onOwner: (o: string) => void
  onArchive: () => void
  onDelete: () => void
  onClear: () => void
}) {
  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-xl bg-bulk px-4 py-2.5 text-bulk-foreground shadow-lg"
    >
      <span className="mr-3 flex items-center gap-2 text-xs font-semibold">
        <span className="size-2 rounded-full bg-sky-400" aria-hidden />
        {count} project{count === 1 ? "" : "s"} selected
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger render={<button type="button" className={action} />}>
          <CircleDot className="size-3.5" aria-hidden /> Change Status <ChevronDown className="size-3" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-card">
          {STATUSES.map((s) => (
            <DropdownMenuItem key={s} onClick={() => onStatus(s)}>{s}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger render={<button type="button" className={action} />}>
          <UserPlus className="size-3.5" aria-hidden /> Assign Owner <ChevronDown className="size-3" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-card">
          {owners.map((o) => (
            <DropdownMenuItem key={o} onClick={() => onOwner(o)}>{o}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <button type="button" className={action} onClick={onArchive}>
        <Archive className="size-3.5" aria-hidden /> Archive
      </button>
      <button type="button" className={cn(action, "bg-white/10")} onClick={onDelete}>
        <Trash2 className="size-3.5" aria-hidden /> Delete
      </button>

      <button type="button" className={cn(action, "ml-auto")} onClick={onClear}>
        <X className="size-3.5" aria-hidden /> Deselect all
      </button>
    </div>
  )
}