import type { Project } from "@/types/projects";

export const initialProjects: Project[] = [
  {
    id: "project-1",
    name: "SaaS Project Manager",
    description:
      "A project management platform with Kanban boards, team collaboration, and analytics.",
    status: "active",
    startDate: "2026-09-01",
    dueDate: "2026-11-15",
    memberIds: ["member-1", "member-2", "member-3", "member-4"],
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-10-16T14:30:00.000Z",
  },
  {
    id: "project-2",
    name: "E-commerce Store",
    description:
      "A responsive online store with product filtering, cart, and checkout.",
    status: "active",
    startDate: "2026-09-10",
    dueDate: "2026-11-05",
    memberIds: ["member-1", "member-3", "member-5"],
    createdAt: "2026-09-10T10:00:00.000Z",
    updatedAt: "2026-10-15T12:00:00.000Z",
  },
  {
    id: "project-3",
    name: "Health Booking Platform",
    description:
      "An appointment booking experience for patients, doctors, and clinics.",
    status: "completed",
    startDate: "2026-07-01",
    dueDate: "2026-09-30",
    memberIds: ["member-2", "member-3", "member-5"],
    createdAt: "2026-07-01T08:30:00.000Z",
    updatedAt: "2026-09-29T16:00:00.000Z",
  },
  {
    id: "project-4",
    name: "Architecture Studio",
    description:
      "A visual portfolio website showcasing architectural projects and services.",
    status: "on-hold",
    startDate: "2026-09-20",
    dueDate: "2026-11-20",
    memberIds: ["member-1", "member-4"],
    createdAt: "2026-09-20T11:00:00.000Z",
    updatedAt: "2026-10-12T09:15:00.000Z",
  },
  {
    id: "project-5",
    name: "UI Design System",
    description:
      "A reusable component library with design tokens, accessible components, and documentation.",
    status: "active",
    startDate: "2026-10-01",
    dueDate: "2026-12-01",
    memberIds: ["member-1", "member-2", "member-4"],
    createdAt: "2026-10-01T09:00:00.000Z",
    updatedAt: "2026-10-17T08:00:00.000Z",
  },
];