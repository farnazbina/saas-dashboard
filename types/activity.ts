// types/activity.ts

export type ActivityAction =
  | "project-created"
  | "project-updated"
  | "task-created"
  | "task-updated"
  | "task-completed"
  | "task-status-changed"
  | "member-added";

export interface Activity {
  id: string;
  memberId: string;
  projectId: string;
  taskId: string | null;
  action: ActivityAction;
  description: string;
  createdAt: string;
}