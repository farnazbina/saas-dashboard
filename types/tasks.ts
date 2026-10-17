// types/task.ts

export type TaskStatus =
  | "blocked"
  | "done"
  | "in-progress"
  | "in-review"
  | "todo";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  dueDate: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}