// Mock project-detail data. Replace getProjectDetail() with a real fetch.
import type { Project } from "./projects-data"

export type Presence = "online" | "away" | "offline"
export type TeamMember = {
    id: string
    name: string
    role: string
    lead?: boolean
    owner?: boolean
    presence: Presence
}
export type BreakdownKey = "done" | "inProgress" | "inReview" | "todo" | "backlog"
export type BreakdownItem = { key: BreakdownKey; label: string; count: number; color: string }

export type MilestoneState = "done" | "active" | "upcoming"
export type Milestone = {
    id: string
    title: string
    description: string
    due?: string // ISO
    state: MilestoneState
    /** Only for the active milestone */
    progress?: number
}

export type DetailTaskStatus = "Done" | "In Progress" | "In Review" | "To Do"
export type DetailTask = {
    id: string
    title: string
    status: DetailTaskStatus
    priority: "High" | "Medium" | "Low"
    assignee: string
    due: string // ISO
    /** Highlight the due date */
    dueSoon?: boolean
}

export type DeadlineItem = { id: string; due: string; title: string; description: string; target?: boolean }

export type DetailActivityKind = "completed" | "status" | "comment" | "upload"
export type DetailActivity = {
    id: string
    kind: DetailActivityKind
    actor: string
    target: string
    /** status name for "status", quote for "comment" */
    extra?: string
    time: string
}

export type ProjectDetail = {
    code: string
    sprint: string
    description?: string
    favorite: boolean
    startDate?: string // ISO
    endDate?: string // ISO
    breakdown: BreakdownItem[]
    milestones: number
    completedThisWeek: number
    overdue: number
    velocity: { pace: number; trend: number[]; note: string }
    counts: { tasks: number; board: number; files: number }
    team: TeamMember[]
    timeline: Milestone[]
    tasks: DetailTask[]
    deadlines: DeadlineItem[]
    activity: DetailActivity[]
    lastSynced: string
}

// Colours reference CSS variables so they follow light/dark (see overview-theme.css)
const COLORS: Record<BreakdownKey, string> = {
    done: "var(--chart-done)",
    inProgress: "var(--brand)",
    inReview: "var(--violet)",
    todo: "var(--warning)",
    backlog: "var(--chart-blocked)",
}
const LABELS: Record<BreakdownKey, string> = {
    done: "Done",
    inProgress: "In Progress",
    inReview: "In Review",
    todo: "To Do",
    backlog: "Backlog",
}
const breakdown = (c: Record<BreakdownKey, number>): BreakdownItem[] =>
    (Object.keys(LABELS) as BreakdownKey[]).map((key) => ({ key, label: LABELS[key], count: c[key], color: COLORS[key] }))

const ROLES = ["Product Lead", "Frontend Developer", "Backend Developer", "UI/UX Designer", "QA Engineer"]
const PRESENCE: Presence[] = ["online", "online", "away", "offline"]

const shiftDays = (iso: string, days: number) => {
    const d = new Date(`${iso}T00:00:00Z`)
    d.setUTCDate(d.getUTCDate() + days)
    return d.toISOString().slice(0, 10)
}

export function getProjectDetail(p: Project): ProjectDetail {
    // Hand-written detail for the sample "Website Redesign" project
    if (p.id === "p1") {
        return {
            code: "PRJ-2026-WEB",
            sprint: "Sprint Cycle 04",
            description:
                "Redesign the company website to improve usability, accessibility, and conversion rates across desktop and mobile devices.",
            favorite: true,
            startDate: "2026-10-01",
            endDate: "2026-10-20",
            breakdown: breakdown({ done: 41, inProgress: 4, inReview: 2, todo: 2, backlog: 1 }),
            milestones: 5,
            completedThisWeek: 6,
            overdue: 2,
            velocity: { pace: 14.5, trend: [9, 11.5, 10, 12.5, 11.8, 14.5], note: "Target launch on Oct 20 is on schedule." },
            counts: { tasks: 50, board: 50, files: 14 },
            team: [
                { id: "t1", name: "Olivia Martin", role: "Product Lead", lead: true, owner: true, presence: "online" },
                { id: "t2", name: "Ethan Carter", role: "Frontend Developer", presence: "online" },
                { id: "t3", name: "Noah Wilson", role: "Backend Developer", presence: "away" },
                { id: "t4", name: "Sophia Lee", role: "UI/UX Designer", presence: "online" },
            ],
            timeline: [
                { id: "m1", title: "Discovery & Requirements", description: "Completed client interviews, target user personas, and core IA.", due: "2026-10-04", state: "done" },
                { id: "m2", title: "Wireframes & Information Architecture", description: "Low-fidelity wireframes approved by stakeholders.", due: "2026-10-08", state: "done" },
                { id: "m3", title: "UI Design Approval", description: "High-fidelity design components and Figma library sign-off.", due: "2026-10-12", state: "done" },
                { id: "m4", title: "Frontend Implementation", description: "Translating approved tokens into production web components.", due: "2026-10-18", state: "active", progress: 75 },
                { id: "m5", title: "Final QA & Launch", description: "Cross-browser regression, performance benchmarking, DNS rollout.", due: "2026-10-20", state: "upcoming" },
            ],
            tasks: [
                { id: "k1", title: "Finalize homepage design", status: "Done", priority: "High", assignee: "Olivia Martin", due: "2026-10-12" },
                { id: "k2", title: "Implement responsive navigation", status: "In Progress", priority: "High", assignee: "Ethan Carter", due: "2026-10-17", dueSoon: true },
                { id: "k3", title: "Optimize hero section performance", status: "In Review", priority: "Medium", assignee: "Noah Wilson", due: "2026-10-18" },
                { id: "k4", title: "Complete accessibility audit", status: "To Do", priority: "Medium", assignee: "Sophia Lee", due: "2026-10-19" },
                { id: "k5", title: "Prepare launch checklist", status: "To Do", priority: "Low", assignee: "Olivia Martin", due: "2026-10-20" },
            ],
            deadlines: [
                { id: "d1", due: "2026-10-18", title: "Frontend Implementation", description: "Primary components & interactive states" },
                { id: "d2", due: "2026-10-19", title: "Accessibility Audit", description: "ARIA roles & keyboard traversal pass" },
                { id: "d3", due: "2026-10-20", title: "Final QA & Launch", description: "Production DNS switch & marketing release", target: true },
            ],
            activity: [
                { id: "a1", kind: "completed", actor: "Olivia Martin", target: "Finalize homepage design", time: "29m ago" },
                { id: "a2", kind: "status", actor: "Ethan Carter", target: "Responsive navigation", extra: "In Progress", time: "1h ago" },
                { id: "a3", kind: "comment", actor: "Noah Wilson", target: "", extra: "Bundle size reduced by 22% after code-splitting", time: "2h ago" },
                { id: "a4", kind: "upload", actor: "Sophia Lee", target: "Design-Tokens-v2.fig", time: "4h ago" },
            ],
            lastSynced: "2m ago",
        }
    }

    const timeline = buildTimeline(p)

    // Everything else is derived from the list data so every project has a working page
    const total = p.tasksTotal
    const rest = Math.max(0, total - p.tasksDone)
    const inProgress = Math.round(rest * 0.4)
    const inReview = Math.round(rest * 0.2)
    const todo = Math.round(rest * 0.3)
    const backlog = Math.max(0, rest - inProgress - inReview - todo)

    return {
        code: `PRJ-2026-${p.name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()}`,
        sprint: "Sprint Cycle 04",
        favorite: false,
        startDate: p.due ? shiftDays(p.due, -21) : undefined,
        endDate: p.due,
        breakdown: breakdown({ done: p.tasksDone, inProgress, inReview, todo, backlog }),
        milestones: 3,
        completedThisWeek: Math.min(p.tasksDone, 4),
        overdue: p.status === "At Risk" ? Math.min(3, rest) : 0,
        velocity: {
            pace: 10.5,
            trend: [8, 9.5, 9, 10.5, 10, 10.5],
            note: p.status === "At Risk" ? "Behind pace: review scope with the team." : "On schedule for the target date.",
        },
        counts: { tasks: total, board: total, files: Math.max(2, Math.round(total / 4)) },
        team: p.team.map((name, i) => ({
            id: `m${i}`,
            name,
            role: name === p.owner ? "Product Lead" : ROLES[(i % (ROLES.length - 1)) + 1],
            lead: name === p.owner,
            owner: name === p.owner,
            presence: PRESENCE[i % PRESENCE.length],
        })),
        timeline,
        tasks: buildTasks(p),
        deadlines: buildDeadlines(timeline),
        activity: buildActivity(p),
        lastSynced: "2m ago",
    }
}

/* ------------- generators used for projects without hand-written data ------------- */
function buildTimeline(p: Project): Milestone[] {
    const phases: [string, string][] = [
        ["Discovery & Planning", "Scope, goals and success metrics agreed with stakeholders."],
        ["Design & Prototyping", "Wireframes and visual design reviewed and approved."],
        ["Implementation", "Build, integrate and review the core deliverables."],
        ["QA & Launch", "Testing, performance checks and release."],
    ]
    const done = p.status === "Completed"
    const activeIdx = done || p.progress === 0 ? -1 : Math.min(3, Math.floor(p.progress / 25))
    return phases.map(([title, description], i) => ({
        id: `ms${i}`,
        title,
        description,
        due: p.due ? shiftDays(p.due, -21 + Math.round(((i + 1) * 21) / 4)) : undefined,
        state: (done || i < activeIdx ? "done" : i === activeIdx ? "active" : "upcoming") as MilestoneState,
        progress: i === activeIdx ? Math.round(((p.progress % 25) / 25) * 100) || 10 : undefined,
    }))
}

function buildTasks(p: Project): DetailTask[] {
    const rows: [string, DetailTask["priority"]][] = [
        ["Define scope and requirements", "High"],
        ["Review deliverables with stakeholders", "Medium"],
        ["Prepare release checklist", "Medium"],
        ["Update project documentation", "Low"],
        ["Resolve open feedback", "High"],
    ]
    const statuses: DetailTaskStatus[] = ["Done", "In Progress", "In Review", "To Do", "To Do"]
    return rows.map(([title, priority], i) => ({
        id: `tk${i}`,
        title,
        priority,
        status: p.status === "Completed" ? "Done" : statuses[i],
        assignee: p.team[i % Math.max(1, p.team.length)] ?? p.owner,
        due: shiftDays(p.due ?? "2026-11-01", i - 3),
    }))
}

function buildDeadlines(timeline: Milestone[]): DeadlineItem[] {
    const last = timeline[timeline.length - 1]?.id
    return timeline
        .filter((m) => m.state !== "done" && m.due)
        .slice(0, 3)
        .map((m) => ({ id: m.id, due: m.due!, title: m.title, description: m.description, target: m.id === last }))
}

function buildActivity(p: Project): DetailActivity[] {
    const who = (i: number) => p.team[i % Math.max(1, p.team.length)] ?? p.owner
    return [
        { id: "ac0", kind: "completed", actor: who(0), target: "Define scope and requirements", time: "29m ago" },
        { id: "ac1", kind: "status", actor: who(1), target: "Review deliverables", extra: "In Progress", time: "1h ago" },
        { id: "ac2", kind: "comment", actor: who(2), target: "", extra: "Looks good, let's move this forward", time: "2h ago" },
        { id: "ac3", kind: "upload", actor: who(3), target: `${p.name.replace(/\s+/g, "-")}-brief.pdf`, time: "4h ago" },
    ]
}

/* --------------------------------- dates ---------------------------------- */
const DAY = 86_400_000
const utc = (iso: string) => new Date(`${iso}T00:00:00Z`).getTime()
const fmt = (iso: string, withYear: boolean) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        ...(withYear ? { year: "numeric" } : {}),
        timeZone: "UTC",
    })

/** "Oct 1 – Oct 20, 2026" */
export function formatRange(start?: string, end?: string) {
    if (!start && !end) return "No dates set"
    if (!start) return `Due ${fmt(end!, true)}`
    if (!end) return `Starts ${fmt(start, true)}`
    const sameYear = start.slice(0, 4) === end.slice(0, 4)
    return `${fmt(start, !sameYear)} – ${fmt(end, true)}`
}

/** Days from today to the end date: tone + label for the date chip */
export function deadlineStatus(end?: string, now = new Date()): { label: string; tone: "info" | "warning" | "danger" } | null {
    if (!end) return null
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    const days = Math.round((utc(end) - today) / DAY)
    if (days > 3) return { label: `${days} days left`, tone: "info" }
    if (days >= 0) return { label: days === 0 ? "Due today" : `${days} day${days === 1 ? "" : "s"} left`, tone: "warning" }
    const over = Math.abs(days)
    return { label: `${over} day${over === 1 ? "" : "s"} overdue`, tone: "danger" }
}

/** "3d left" / "Today" / "2d overdue" for the deadline list */
export function deadlineBadge(
    iso: string,
    now = new Date()
): { label: string; tone: "info" | "warning" | "danger" } {
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    const days = Math.round((utc(iso) - today) / DAY)
    if (days < 0) return { label: `${Math.abs(days)}d overdue`, tone: "danger" }
    if (days === 0) return { label: "Today", tone: "warning" }
    return { label: `${days}d left`, tone: days <= 3 ? "warning" : "info" }
}