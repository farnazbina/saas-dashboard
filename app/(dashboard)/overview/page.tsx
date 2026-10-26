import { MyTasksTable } from "@/features/overview/components/MyTaskstable";
import { OverviewHeader } from "@/features/overview/components/OverviewHeader";
import { ProjectProgressChart } from "@/features/overview/components/ProjectProgressChart";
import { RecentActivity } from "@/features/overview/components/RecentActivities";
import { StatCards } from "@/features/overview/components/StatCards";
import { TasksByStatusChart } from "@/features/overview/components/TaskByStatusChart";
import { UpcomingDeadlines } from "@/features/overview/components/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-4 sm:space-y-6">
      <OverviewHeader userName="Alex" />
      <StatCards />
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-3">
        <ProjectProgressChart className="xl:col-span-2" />
        <TasksByStatusChart />
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <UpcomingDeadlines />
        <RecentActivity />
      </div>
      <MyTasksTable />
    </div>
  );
}
