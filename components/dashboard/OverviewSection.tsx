import { CircleCheckBig, FolderClosed, UsersRound, ClockCheck } from "lucide-react"
import OverviewCard from "./OverviewCard"

const OverviewSection = () => {
    const overview = [
        {
            id: 1,
            title: 'Active Projects',
            icon: <FolderClosed  />,
            value: 12,
            progress: 12,
            label: 'In Progress',
            color: 'bg-primary text-primary-foreground'
        },
        {
            id: 2,
            title: 'Tasks Completed',
            icon: <CircleCheckBig  />,
            value: 1248,
            progress: 12,
            label: 'This Sprint',
            color: 'bg-success text-success-foreground'
        },
        {
            id: 3,
            title: 'Team Members',
            icon: <UsersRound  />,
            value: 12,
            progress: 12,
            label: 'Active',
            color: 'bg-info text-info-foreground'
        },
        {
            id: 4,
            title: 'On-Time Delivery',
            icon: <ClockCheck  />,
            value: 12,
            progress: 12,
            label: 'Delivery Rate',
            color: 'bg-task-inreview text-task-inreview-foreground'
        },
    ]
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {overview.map((item) => (
                <OverviewCard key={item.id} {...item} />
            ))}
        </div>
    )
}
export default OverviewSection