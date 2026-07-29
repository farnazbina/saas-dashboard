import { Category } from "./categories"

export type Projects = {
  id: string
  name: string
  description: string
  status: string
  categoryId: string
  category: Category
  clientId: string
//   client      Client   @relation(fields: [clientId], references: [id])
  teamLeadId: string
//   teamLead    User     @relation("TeamLead", fields: [teamLeadId], references: [id])
//   members     User[]   @relation("TeamMembers")
  createdAt: string
  updatedAt: string
}