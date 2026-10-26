// app/(dashboard)/projects/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectHeader } from "@/features/projects/components/detail/ProjectHeader";
import { ProjectMetaChips } from "@/features/projects/components/detail/ProjectMetaChip";
import { ProjectProgressCard } from "@/features/projects/components/detail/ProjectProgressCard";
import { ProjectStatCards } from "@/features/projects/components/detail/ProjectStatCards";
import {
  ProjectTabs,
  isTabId,
} from "@/features/projects/components/detail/ProjectTabs";
import { ProjectTeamCard } from "@/features/projects/components/detail/ProjectTeamCard";
import { TabPlaceholder } from "@/features/projects/components/detail/TabPlaceholder";
import { getProjectDetail } from "@/data/project-detail-data";
import { INITIAL_PROJECTS } from "@/data/projects-data";
import { MilestonesTimeline } from "@/features/projects/components/detail/MilestonesTimeline";
import { RecentTasks } from "@/features/projects/components/detail/RecentTasks";
import { ProjectDeadlines } from "@/features/projects/components/detail/ProjectDeadlines";
import { ProjectActivity } from "@/features/projects/components/detail/ProjectActivity";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

// Swap for a real lookup (database / API)
const findProject = (id: string) => INITIAL_PROJECTS.find((p) => p.id === id);

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { id } = await params;
  const project = findProject(id);
  return {
    title: project ? `${project.name} · Flowspace` : "Project not found",
  };
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { tab } = await searchParams;

  const project = findProject(id);
  if (!project) notFound();

  const detail = getProjectDetail(project);
  const active = isTabId(tab) ? tab : "overview";

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-4 sm:space-y-6">
      {/* Header card: title, description, meta chips, tabs */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-xs">
        <div className="space-y-4 p-4 sm:p-6">
          <ProjectHeader project={project} detail={detail} />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {detail.description ?? project.description}
          </p>
          <ProjectMetaChips project={project} detail={detail} />
        </div>
        <ProjectTabs active={active} detail={detail} />
      </section>

      {active === "overview" ? (
        <>
          <ProjectStatCards detail={detail} />
          {/* Main column + 340px sidebar; stacks to one column below xl */}
          <div className="grid gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
            <div className="min-w-0 space-y-4 sm:space-y-6">
              <ProjectProgressCard detail={detail} />
              <MilestonesTimeline milestones={detail.timeline} />
              <RecentTasks
                tasks={detail.tasks}
                totalTasks={detail.counts.tasks}
              />
            </div>
            <div className="min-w-0 space-y-4 sm:space-y-6">
              <ProjectTeamCard team={detail.team} />
              <ProjectDeadlines items={detail.deadlines} />
              <ProjectActivity items={detail.activity} />
            </div>
          </div>
        </>
      ) : (
        <TabPlaceholder tab={active} />
      )}
    </div>
  );
}
