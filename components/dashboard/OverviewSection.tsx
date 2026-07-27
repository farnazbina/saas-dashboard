import { CircleCheckBig, FolderClosed, UsersRound, ClockCheck } from "lucide-react"
import OverviewCard from "./OverviewCard"

const OverviewSection = () => {
    const overview = [
        {
            id: 1,
            title: 'Active Projects',
            icon: <FolderClosed className="text-white" />,
            value: 12,
            progress: 12,
            label: 'In Progress',
            color: 'bg-primary'
        },
        {
            id: 2,
            title: 'Tasks Completed',
            icon: <CircleCheckBig className="text-white" />,
            value: 1248,
            progress: 12,
            label: 'This Sprint',
            color: 'bg-success'
        },
        {
            id: 3,
            title: 'Team Members',
            icon: <UsersRound className="text-white" />,
            value: 12,
            progress: 12,
            label: 'Active',
            color: 'bg-info'
        },
        {
            id: 4,
            title: 'On-Time Delivery',
            icon: <ClockCheck className="text-white" />,
            value: 12,
            progress: 12,
            label: 'Delivery Rate',
            color: 'bg-task-inreview'
        },
    ]
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-x-6">
            {overview.map((item) => (
                <OverviewCard key={item.id} {...item} />
            ))}
        </div>
    )
}
export default OverviewSection