import { Projects } from "./projects"

export type Category = {
    id: number | string
    name: string
    createdAt: string
    updatedAt: string
    projects: Projects[]
}