import { Button } from "@/components/ui/button"

type ProjectStatus = "TODO" | "IN_PROGRESS" | "DONE"

interface Props {
    title: string
    category: string
    status: ProjectStatus
    deadline: string
    assignee: string
}

const statusStyles: Record<ProjectStatus, { bg: string; text: string }> = {
    "TODO": {
        bg: "bg-task-todo-muted border-task-todo/30",
        text: "text-task-todo",
    },
    "IN_PROGRESS": {
        bg: "bg-task-progress-muted border-task-progress/30",
        text: "text-task-progress",
    },
    "DONE": {
        bg: "bg-task-done-muted border-task-done/30",
        text: "text-task-done",
    },
};

const ProjectCard = ({ title, category, status, deadline, assignee }: Props) => {
    const defaultStyle = { bg: "bg-muted0", text: "text-secondary-foreground" };
    const { bg, text } = statusStyles[status] || defaultStyle;

    return (
        <div className="flex flex-col bg-card border border-solid border-muted rounded-lg px-5 py-4">
            <div className="flex justify-between items-center border-b border-solid border-muted pb-4">
                <div className="flex flex-col">
                    <span className="text-text text-lg font-semibold">{title}</span>
                    <span className="text-primary text-sm font-medium">{category}</span>
                </div>
                <button>...</button>
            </div>
            <div className="flex items-center mt-4">
                <span className="block w-2/5">Status</span>
                <span className="block w-3/5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-medium border border-solid ${bg} ${text}`}>
                        {status}
                    </span>
                </span>
            </div>
            <div className="flex items-center mt-3">
                <span className="block w-2/5">Deadline</span>
                <span className="block w-3/5">
                    {deadline}
                </span>
            </div>
            <div className="flex items-center mt-3 mb-4">
                <span className="block w-2/5">Assignees</span>
                <span className="block w-3/5">{assignee}</span>
            </div>
            <div className="flex items-center justify-between border-t border-solid border-muted pt-4">
                60 03
                <Button variant='secondary' className="hover:bg-primary hover:text-primary-foreground" >mark as complete</Button>
            </div>
        </div>
    )
}
export default ProjectCard