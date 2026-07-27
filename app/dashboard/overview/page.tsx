import OverviewSection from "@/components/dashboard/OverviewSection";
import { ProjectProgressSection } from "@/components/dashboard/ProjectProgressSection";

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <OverviewSection />
            <div className="w-full grid grid-cols-6 gap-6">
                <div className="col-span-4">
                    <ProjectProgressSection />
                </div>
                <div className="col-span-2"></div>
            </div>
        </div>
    )
}