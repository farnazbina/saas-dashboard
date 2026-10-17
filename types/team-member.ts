// types/team-member.ts

export type TeamMemberRole =
  | "admin"
  | "manager"
  | "developer"
  | "designer"
  | "member";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: TeamMemberRole;
}