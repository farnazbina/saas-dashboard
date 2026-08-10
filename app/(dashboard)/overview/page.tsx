import OverviewSection from "@/components/dashboard/OverviewSection";
import { ProjectProgressSection } from "@/components/dashboard/ProjectProgressSection";
import { TaskDistributionSection } from "@/components/dashboard/TaskDistributionSection";

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full">
            <OverviewSection />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6">
                <div className="col-span-2 xl:col-span-4">
                    <ProjectProgressSection />
                </div>
                <div className="col-span-2 xl:col-span-2">
                    <TaskDistributionSection />
                </div>
            </div>
        </div>
    )
}