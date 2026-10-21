import { OverviewHeader } from "@/components/dashboard/overview/OverviewHeader";
import { StatCards } from "@/components/dashboard/overview/StatCards";
import OverviewSection from "@/components/dashboard/OverviewSection";
import { ProjectProgressSection } from "@/components/dashboard/ProjectProgressSection";
import { RecentClientsTable } from "@/components/dashboard/RecentClientsTable";
import { TaskDistributionSection } from "@/components/dashboard/TaskDistributionSection";

export default function DashboardPage() {
    return (
        <div className="mx-auto w-full max-w-[1400px] space-y-4 sm:space-y-6">
            <OverviewHeader userName="Alex" />
            <StatCards />
            {/* <OverviewSection />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6">
                <div className="col-span-2 xl:col-span-4">
                    <ProjectProgressSection />
                </div>
                <div className="col-span-2 xl:col-span-2">
                    <TaskDistributionSection />
                </div>
            </div>
            <RecentClientsTable /> */}
        </div>
    )
}