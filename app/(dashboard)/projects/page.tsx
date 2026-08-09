import { getProjects } from "@/app/actions/project.actions";
import AddNewProject from "@/components/dashboard/AddNewProject";
import ProjectCard from "@/components/dashboard/projects/ProjectCard";


export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-text text-lg font-semibold">Projects</h1>
                <AddNewProject />
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.name}
                        category={project.category.name}
                        status={project.status}
                        deadline={project.name} // فرض کنید deadline دارید
                        assignee={project.member?.name || 'Unassigned'} // چون فقط یک member داریم
                    />
                ))}
            </div>
        </>
    )
}