// Mock data. Replace with real fetches (React Query, server actions, etc.).

export type Priority = "Urgent" | "High" | "Medium" | "Low"
export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Done"

export const PROGRESS_SERIES = [
    { label: "Sep 15", value: 28 },
    { label: "Sep 22", value: 41 },
    { label: "Sep 29", value: 57 },
    { label: "Oct 6", value: 68 },
    { label: "Oct 13", value: 76 },
    { label: "Oct 20", value: 92 },
]
export const PROGRESS_AVERAGE = 68

// Order = slice order clockwise from 12 o'clock
export const STATUS_BREAKDOWN = [
    { key: "done", name: "Done", value: 112, color: "var(--chart-done)" },
    { key: "progress", name: "Progress", value: 28, color: "var(--brand)" },
    { key: "todo", name: "To Do", value: 24, color: "var(--chart-todo)" },
    { key: "blocked", name: "Blocked", value: 10, color: "var(--chart-blocked)" },
    { key: "review", name: "Review", value: 12, color: "var(--chart-review)" },
]
// Legend columns (left, right) as in the design
export const LEGEND_COLUMNS = [
    ["done", "todo", "blocked"],
    ["progress", "review"],
]

export const DEADLINES = [
    { id: "d1", project: "Website Redesign", lead: "Olivia Martin", status: "In Progress", due: "Oct 20, 2026", progress: 82, atRisk: false },
    { id: "d2", project: "Mobile App Launch", lead: "Ethan Carter", status: "In Progress", due: "Oct 22, 2026", progress: 65, atRisk: false },
    { id: "d3", project: "CRM Dashboard", lead: "Sophia Lee", status: "At Risk", due: "Oct 24, 2026", progress: 45, atRisk: true },
]

export type ActivityKind = "completed" | "moved" | "created" | "uploaded"
export const ACTIVITY: {
    id: string
    kind: ActivityKind
    actor: string
    target: string
    extra?: string
    time: string
}[] = [
        { id: "a1", kind: "completed", actor: "Olivia Martin", target: "Finalize homepage design", time: "20 minutes ago" },
        { id: "a2", kind: "moved", actor: "Ethan Carter", target: "Authentication flow", extra: "In Review", time: "1 hour ago" },
        { id: "a3", kind: "created", actor: "Sophia Lee", target: "CRM Dashboard", time: "2 hours ago" },
        { id: "a4", kind: "uploaded", actor: "Noah Wilson", target: "Q4 Infrastructure", time: "4 hours ago" },
    ]

export const MY_TASKS: {
    id: string
    title: string
    project: string
    priority: Priority
    due: string
    dueUrgent?: boolean
    status: TaskStatus
}[] = [
        { id: "t1", title: "Design system token audit", project: "Flowspace Web", priority: "High", due: "Today, 5:00 PM", dueUrgent: true, status: "In Progress" },
        { id: "t2", title: "Implement workspace switcher dropdown", project: "Flowspace Web", priority: "Medium", due: "Tomorrow", status: "In Review" },
        { id: "t3", title: "Review user permissions RFC", project: "Security & Org", priority: "Low", due: "Oct 18, 2026", status: "To Do" },
        { id: "t4", title: "Update typography tokens & scale", project: "Flowspace Web", priority: "Urgent", due: "Oct 19, 2026", status: "In Progress" },
    ]