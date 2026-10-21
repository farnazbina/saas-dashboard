import { OverviewHeader } from "@/components/dashboard/overview/OverviewHeader";
import { ProjectProgressChart } from "@/components/dashboard/overview/ProjectProgressChart";
import { StatCards } from "@/components/dashboard/overview/StatCards";
import { TasksByStatusChart } from "@/components/dashboard/overview/TaskByStatusChart";
import OverviewSection from "@/components/dashboard/OverviewSection";
import { RecentClientsTable } from "@/components/dashboard/RecentClientsTable";
import { TaskDistributionSection } from "@/components/dashboard/TaskDistributionSection";

export default function DashboardPage() {
    return (
        <div className="mx-auto w-full max-w-[1400px] space-y-4 sm:space-y-6">
            <OverviewHeader userName="Alex" />
            <StatCards />
            <div className="grid gap-4 sm:gap-6 xl:grid-cols-3">
                <ProjectProgressChart className="xl:col-span-2" />
                <TasksByStatusChart />
            </div>
            {/* <OverviewSection />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6">
                <div className="col-span-2 xl:col-span-4">
                </div>
                <div className="col-span-2 xl:col-span-2">
                    <TaskDistributionSection />
                </div>
            </div>
            <RecentClientsTable /> */}
        </div>
    )
}