// Mock data: replace INITIAL_PROJECTS with a real fetch.

export type ProjectStatus = "In Progress" | "At Risk" | "Planned" | "Completed"
export type ProjectPriority = "Urgent" | "High" | "Medium" | "Low"
export type ProjectIconKey =
  | "web" | "mobile" | "crm" | "design" | "analytics" | "auth" | "billing" | "api" | "megaphone" | "data"
  | "support" | "bell" | "tools" | "gauge" | "server" | "globe" | "book" | "map" | "mail" | "language" | "folder"

export type Project = {
  id: string
  name: string
  description: string
  icon: ProjectIconKey
  status: ProjectStatus
  priority: ProjectPriority
  owner: string
  team: string[]
  progress: number
  tasksDone: number
  tasksTotal: number
  /** ISO date (YYYY-MM-DD) */
  due: string
  /** Highlight the due date as "coming up" */
  dueSoon?: boolean
  archived?: boolean
  accent?: string
  key?: string
  template?: string
  createdAt?: number
}

export const STATUSES: ProjectStatus[] = ["In Progress", "At Risk", "Planned", "Completed"]
export const PRIORITIES: ProjectPriority[] = ["Urgent", "High", "Medium", "Low"]

const p = (
  id: string, name: string, description: string, icon: ProjectIconKey,
  status: ProjectStatus, priority: ProjectPriority, owner: string, team: string[],
  tasksDone: number, tasksTotal: number, due: string, dueSoon = false
): Project => ({
  id, name, description, icon, status, priority, owner, team, tasksDone, tasksTotal, due, dueSoon,
  progress: tasksTotal ? Math.round((tasksDone / tasksTotal) * 100) : 0,
})

export const INITIAL_PROJECTS: Project[] = [
  p("p1", "Website Redesign", "Redesign the company website to improve usability and conversions.", "web", "In Progress", "High", "Olivia Martin", ["Olivia Martin", "Noah Wilson", "Ethan Carter"], 41, 50, "2026-10-20", true),
  p("p2", "Mobile App Launch", "Prepare the mobile application for its first public release.", "mobile", "In Progress", "High", "Ethan Carter", ["Ethan Carter", "Mia Chen", "Liam Patel"], 26, 40, "2026-10-22"),
  p("p3", "CRM Dashboard", "Build a unified dashboard for customer relationship management.", "crm", "At Risk", "Urgent", "Sophia Lee", ["Sophia Lee", "Ava Johnson"], 18, 40, "2026-10-24"),
  p("p4", "Design System", "Establish reusable UI components and shared design foundations.", "design", "In Progress", "Medium", "Mia Chen", ["Mia Chen", "Olivia Martin"], 28, 40, "2026-10-29"),
  p("p5", "Analytics Integration", "Integrate product analytics and reporting into the platform.", "analytics", "Planned", "Medium", "Noah Wilson", ["Noah Wilson", "Lucas Meyer"], 0, 24, "2026-11-08"),
  p("p6", "Authentication Upgrade", "Improve authentication, account security, and session management.", "auth", "Completed", "High", "Olivia Martin", ["Olivia Martin", "Liam Patel"], 32, 32, "2026-10-10"),
  p("p7", "Billing Revamp", "Move subscriptions to usage-based billing with self-serve invoices.", "billing", "In Progress", "High", "Lucas Meyer", ["Lucas Meyer", "Sophia Lee"], 14, 30, "2026-11-12"),
  p("p8", "Customer Onboarding Flow", "Guide new workspaces from sign-up to their first project.", "map", "In Progress", "Medium", "Ava Johnson", ["Ava Johnson", "Mia Chen", "Noah Wilson"], 19, 28, "2026-11-05"),
  p("p9", "API v3 Migration", "Ship the new public API and deprecate v2 endpoints.", "api", "At Risk", "Urgent", "Liam Patel", ["Liam Patel", "Ethan Carter"], 22, 60, "2026-11-01"),
  p("p10", "Marketing Site Refresh", "Update landing pages, pricing and case studies.", "megaphone", "Planned", "Low", "Sophia Lee", ["Sophia Lee", "Olivia Martin"], 0, 18, "2026-12-03"),
  p("p11", "Data Warehouse Setup", "Centralize product and revenue data for reporting.", "data", "In Progress", "Medium", "Noah Wilson", ["Noah Wilson", "Lucas Meyer"], 11, 26, "2026-11-20"),
  p("p12", "Support Portal", "Self-service help center with ticket tracking.", "support", "Planned", "Medium", "Ava Johnson", ["Ava Johnson", "Mia Chen"], 0, 22, "2026-12-10"),
  p("p13", "Notification Center", "Unify email, in-app and push notification preferences.", "bell", "In Progress", "Medium", "Mia Chen", ["Mia Chen", "Ethan Carter", "Ava Johnson"], 15, 24, "2026-11-14"),
  p("p14", "Internal Admin Tools", "Back-office tooling for support and finance teams.", "tools", "Completed", "Low", "Lucas Meyer", ["Lucas Meyer", "Liam Patel"], 20, 20, "2026-09-30"),
  p("p15", "Performance Audit", "Profile slow pages and cut load times across the app.", "gauge", "In Progress", "High", "Ethan Carter", ["Ethan Carter", "Noah Wilson"], 9, 16, "2026-10-31"),
  p("p16", "Accessibility Pass", "Bring core flows up to WCAG 2.2 AA.", "globe", "Planned", "High", "Olivia Martin", ["Olivia Martin", "Mia Chen"], 0, 20, "2026-12-15"),
  p("p17", "Partner Integrations", "Connect Slack, Trello and Google Calendar.", "server", "In Progress", "Medium", "Liam Patel", ["Liam Patel", "Sophia Lee", "Lucas Meyer"], 12, 34, "2026-11-25"),
  p("p18", "Q4 Infrastructure", "Capacity planning, observability and cost review.", "server", "At Risk", "High", "Noah Wilson", ["Noah Wilson", "Liam Patel"], 8, 25, "2026-10-28"),
  p("p19", "Security Review", "Annual penetration test and remediation plan.", "auth", "In Progress", "Urgent", "Sophia Lee", ["Sophia Lee", "Ethan Carter"], 17, 22, "2026-11-02"),
  p("p20", "Mobile Push Campaigns", "Lifecycle messaging for the new mobile app.", "megaphone", "Planned", "Low", "Ava Johnson", ["Ava Johnson", "Olivia Martin"], 0, 14, "2026-12-18"),
  p("p21", "Knowledge Base", "Document internal processes and product how-tos.", "book", "Completed", "Low", "Mia Chen", ["Mia Chen", "Ava Johnson"], 18, 18, "2026-10-05"),
  p("p22", "Roadmap Planning", "Align 2027 priorities across product and engineering.", "map", "Planned", "Medium", "Lucas Meyer", ["Lucas Meyer", "Sophia Lee"], 0, 12, "2026-12-01"),
  p("p23", "Localization Rollout", "Translate the product into German, French and Spanish.", "language", "In Progress", "Medium", "Noah Wilson", ["Noah Wilson", "Mia Chen"], 10, 30, "2026-12-08"),
  p("p24", "Email Templates", "Redesign transactional emails to match the new brand.", "mail", "Completed", "Low", "Ethan Carter", ["Ethan Carter", "Ava Johnson"], 12, 12, "2026-10-12"),
]