import type { Project } from "@/data/projects-data";
import { ProjectCard } from "./card";

export function ProjectsGrid({
  projects,
  onArchive,
}: {
  projects: Project[];
  onArchive: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onArchive={onArchive} />
      ))}
    </div>
  );
}
