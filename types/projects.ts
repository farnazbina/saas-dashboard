// types/project.ts

export type ProjectStatus =
  | "active"
  | "completed"
  | "on-hold";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string | null;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}