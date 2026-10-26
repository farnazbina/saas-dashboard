import type { ProjectIconKey, ProjectPriority } from "@/data/projects-data"

/* ------------------------------ people (mock) ------------------------------ */
export type Person = { id: string; name: string; role: string; color: string }

export const PEOPLE: Person[] = [
    { id: "alex", name: "Alex Morgan", role: "Lead", color: "#4f46e5" },
    { id: "olivia", name: "Olivia Martin", role: "Designer", color: "#0b6a8a" },
    { id: "ethan", name: "Ethan Carter", role: "Engineer", color: "#0f6b4f" },
    { id: "sophia", name: "Sophia Lee", role: "Product Manager", color: "#6d3fd9" },
    { id: "mia", name: "Mia Chen", role: "Designer", color: "#b45309" },
    { id: "noah", name: "Noah Wilson", role: "Engineer", color: "#be185d" },
    { id: "liam", name: "Liam Patel", role: "Engineer", color: "#1d5fd1" },
    { id: "ava", name: "Ava Johnson", role: "QA", color: "#4d7c0f" },
    { id: "lucas", name: "Lucas Meyer", role: "DevOps", color: "#475569" },
]

/** "Olivia Martin" -> "Olivia M." */
export function shortName(name: string) {
    const parts = name.split(" ")
    return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : name
}

/* --------------------------------- values ---------------------------------- */
export type TemplateId = "software" | "marketing" | "design" | "launch" | "blank"
export type Stage = "Planned" | "In Progress"

export type NewProjectValues = {
    name: string
    key: string
    accent: string
    icon: ProjectIconKey
    description: string
    template: TemplateId
    priority: ProjectPriority
    owner: string // Person id
    team: string[] // Person ids
    stage: Stage
    startDate: string // YYYY-MM-DD
    deadline: string // YYYY-MM-DD or ""
}

export const DESCRIPTION_MAX = 300
export const DEFAULT_ACCENT = "#4f46e5"

const todayLocal = () => new Date().toLocaleDateString("en-CA") // YYYY-MM-DD in local time

export const defaultValues = (): NewProjectValues => ({
    name: "",
    key: "",
    accent: DEFAULT_ACCENT,
    icon: "folder",
    description: "",
    template: "software",
    priority: "Medium",
    owner: "alex",
    team: [],
    stage: "Planned",
    startDate: todayLocal(),
    deadline: "",
})

/* ------------------------------- project key ------------------------------- */
export const sanitizeKey = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)

/** "Customer Portal V2" -> "CPV2" */
export function deriveKey(name: string) {
    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => (/^[A-Za-z]\d+$/.test(w) ? w : w[0]))
    return sanitizeKey(parts.join("")).slice(0, 6)
}

/* ------------------------------- validation -------------------------------- */
export type FormErrors = Partial<Record<"name" | "key" | "owner" | "deadline", string>>

export function validate(v: NewProjectValues): FormErrors {
    const errors: FormErrors = {}
    if (!v.name.trim()) errors.name = "Give your project a name."
    if (v.key.length < 2) errors.key = "Use 2–8 letters or numbers."
    if (!v.owner) errors.owner = "Choose a project owner."
    if (v.startDate && v.deadline && v.deadline < v.startDate)
        errors.deadline = "Deadline can't be before the start date."
    return errors
}

/* --------------------- draft storage (swap for your API) -------------------- */
const DRAFT_KEY = "flowspace:new-project-draft"
export type Draft = { values: NewProjectValues; keyTouched: boolean }

export function loadDraft(): Draft | null {
    try {
        const raw = window.localStorage.getItem(DRAFT_KEY)
        if (!raw) return null
        const draft = JSON.parse(raw) as Draft
        return draft?.values && typeof draft.values.name === "string" ? draft : null
    } catch {
        return null
    }
}
export function saveDraft(draft: Draft) {
    try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch { }
}
export function clearDraft() {
    try {
        window.localStorage.removeItem(DRAFT_KEY)
    } catch { }
}