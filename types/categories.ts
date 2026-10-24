import { Project } from "./projects"

export type Category = {
    id: number | string
    name: string
    createdAt: string
    updatedAt: string
    projects: Project[]
}