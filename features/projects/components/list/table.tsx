"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp } from "lucide-react"

import { PersonAvatar } from "@/components/ui/PersonAvatar"
import { ProgressBar } from "@/features/overview/components/ProgressBar"
import type { Project } from "@/data/projects-data"
import type { SortKey } from "@/utils/projects-utils"
import { cn } from "@/lib/utils"
import { PriorityTag, StatusPill } from "@/components/ui/Badges"
import { ProjectIcon } from "./icon"
import { TeamAvatars } from "@/components/ui/TeamAvatar"

const th = "px-3 py-3 text-left text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
const checkbox = "size-4 rounded accent-brand"

function HeaderCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean
  indeterminate: boolean
  onChange: (checked: boolean) => void
}) {
  const ref = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label="Select all projects on this page"
      className={checkbox}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  )
}

const progressTone = (p: Project) =>
  p.status === "At Risk" ? "danger" : p.status === "Completed" ? "success" : "brand"
const progressText = (p: Project) =>
  p.status === "At Risk" ? "text-danger-ink" : p.status === "Completed" ? "text-success-ink" : "text-foreground"

export function ProjectsTable({
  projects,
  selected,
  onToggle,
  onTogglePage,
  sort,
  onSort,
  footer,
}: {
  projects: Project[]
  selected: Set<string>
  onToggle: (id: string) => void
  onTogglePage: (checked: boolean) => void
  sort: SortKey
  onSort: (s: SortKey) => void
  footer: React.ReactNode
}) {
  const selectedOnPage = projects.filter((p) => selected.has(p.id)).length
  const nameSort = sort === "name-asc" ? "asc" : sort === "name-desc" ? "desc" : null
  const SortIcon = nameSort === "desc" ? ArrowUp : ArrowDown

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="bg-panel">
              <th className="w-10 py-3 pl-4">
                <HeaderCheckbox
                  checked={projects.length > 0 && selectedOnPage === projects.length}
                  indeterminate={selectedOnPage > 0 && selectedOnPage < projects.length}
                  onChange={onTogglePage}
                />
              </th>
              <th className={th} aria-sort={nameSort === "asc" ? "ascending" : nameSort === "desc" ? "descending" : "none"}>
                <button
                  type="button"
                  onClick={() => onSort(sort === "name-asc" ? "name-desc" : "name-asc")}
                  className="inline-flex items-center gap-1 uppercase hover:text-foreground focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  Project
                  <SortIcon className={cn("size-3", !nameSort && "opacity-40")} aria-hidden />
                </button>
              </th>
              <th className={th}>Status</th>
              <th className={cn(th, "hidden md:table-cell")}>Priority</th>
              <th className={cn(th, "hidden lg:table-cell")}>Owner</th>
              <th className={cn(th, "hidden xl:table-cell")}>Team</th>
              <th className={cn(th, "hidden pr-4 sm:table-cell")}>Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {projects.map((p) => {
              const isSelected = selected.has(p.id)
              return (
                <tr
                  key={p.id}
                  data-selected={isSelected || undefined}
                  className={cn("transition-colors", isSelected ? "bg-brand-soft" : "hover:bg-panel/70")}
                >
                  <td className="py-3 pl-4">
                    <input
                      type="checkbox"
                      aria-label={`Select ${p.name}`}
                      className={checkbox}
                      checked={isSelected}
                      onChange={() => onToggle(p.id)}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <ProjectIcon icon={p.icon} status={p.status} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/projects/${p.id}`}
                            className="truncate font-semibold hover:text-brand-ink hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                          >
                            {p.name}
                          </Link>
                          {p.status === "At Risk" && (
                            <span className="rounded border border-danger/30 bg-danger-soft px-1.5 font-mono text-[10px] tracking-wide text-danger-ink">
                              AT RISK
                            </span>
                          )}
                        </div>
                        <p className="max-w-[16rem] truncate text-xs text-muted-foreground sm:max-w-xs lg:max-w-sm">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><StatusPill status={p.status} /></td>
                  <td className="hidden px-3 py-3 md:table-cell"><PriorityTag priority={p.priority} /></td>
                  <td className="hidden px-3 py-3 lg:table-cell">
                    <div className="flex items-center gap-2">
                      <PersonAvatar name={p.owner} round className="size-7" />
                      <span className="text-[13px] whitespace-nowrap">{p.owner}</span>
                    </div>
                  </td>
                  <td className="hidden px-3 py-3 xl:table-cell"><TeamAvatars names={p.team} /></td>
                  <td className="hidden px-3 py-3 pr-4 sm:table-cell">
                    <div className="flex items-center gap-3">
                      <ProgressBar value={p.progress} tone={progressTone(p)} label={`${p.name} progress`} className="w-20 lg:w-28" />
                      <span className={cn("w-10 text-right font-mono text-xs font-medium", progressText(p))}>
                        {p.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {footer}
    </div>
  )
}