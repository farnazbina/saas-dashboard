import type { Project, ProjectPriority, ProjectStatus } from "@/data/projects-data";

export type DeadlineFilter = "any" | "overdue" | "week" | "month"
export type SortKey = "due-asc" | "due-desc" | "name-asc" | "name-desc" | "progress-desc" | "priority-desc"

export type Filters = {
    query: string
    status: ProjectStatus | "All"
    owner: string
    priority: ProjectPriority | "All"
    deadline: DeadlineFilter
}

export const DEFAULT_FILTERS: Filters = { query: "", status: "All", owner: "All", priority: "All", deadline: "any" }

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: "due-asc", label: "Due date (soonest)" },
    { value: "due-desc", label: "Due date (latest)" },
    { value: "name-asc", label: "Name (A–Z)" },
    { value: "name-desc", label: "Name (Z–A)" },
    { value: "progress-desc", label: "Progress (high → low)" },
    { value: "priority-desc", label: "Priority (high → low)" },
]

export const DEADLINE_OPTIONS: { value: DeadlineFilter; label: string }[] = [
    { value: "any", label: "Any date" },
    { value: "overdue", label: "Overdue" },
    { value: "week", label: "Next 7 days" },
    { value: "month", label: "This month" },
]

const PRIORITY_RANK: Record<ProjectPriority, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 }
const DAY = 86_400_000
const toUtc = (iso: string) => new Date(`${iso}T00:00:00Z`).getTime()

export function formatDate(iso: string) {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
    })
}

export function filterProjects(projects: Project[], f: Filters, now = new Date()) {
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    const q = f.query.trim().toLowerCase()

    return projects.filter((p) => {
        if (p.archived) return false
        if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q)) return false
        if (f.status !== "All" && p.status !== f.status) return false
        if (f.owner !== "All" && p.owner !== f.owner) return false
        if (f.priority !== "All" && p.priority !== f.priority) return false

        const due = toUtc(p.due)
        if (f.deadline === "overdue") return due < today && p.status !== "Completed"
        if (f.deadline === "week") return due >= today && due <= today + 7 * DAY
        if (f.deadline === "month") {
            const d = new Date(due)
            return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth()
        }
        return true
    })
}

export function sortProjects(projects: Project[], key: SortKey) {
    const list = [...projects]
    // For date sorts, finished work sinks to the bottom so active projects stay on top
    const byDue = (dir: 1 | -1) => (a: Project, b: Project) => {
        const done = Number(a.status === "Completed") - Number(b.status === "Completed")
        return done || dir * (toUtc(a.due) - toUtc(b.due))
    }
    switch (key) {
        case "due-asc": return list.sort(byDue(1))
        case "due-desc": return list.sort(byDue(-1))
        case "name-asc": return list.sort((a, b) => a.name.localeCompare(b.name))
        case "name-desc": return list.sort((a, b) => b.name.localeCompare(a.name))
        case "progress-desc": return list.sort((a, b) => b.progress - a.progress)
        case "priority-desc": return list.sort((a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority])
    }
}

/** 1 … 4 5 6 … 12 */
export function pageWindow(page: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages = new Set([1, total, page - 1, page, page + 1])
    const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
    const out: (number | "…")[] = []
    sorted.forEach((n, i) => {
        if (i && n - sorted[i - 1] > 1) out.push("…")
        out.push(n)
    })
    return out
}