import { OverviewHeader } from "@/components/dashboard/overview/OverviewHeader";
import { ProjectProgressChart } from "@/components/dashboard/overview/ProjectProgressChart";
import { RecentActivity } from "@/components/dashboard/overview/RecentActivities";
import { StatCards } from "@/components/dashboard/overview/StatCards";
import { TasksByStatusChart } from "@/components/dashboard/overview/TaskByStatusChart";
import { UpcomingDeadlines } from "@/components/dashboard/overview/UpcomingDeadlines";

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
    </div>
  );
}
