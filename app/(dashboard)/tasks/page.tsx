"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDrag, useDragLayer, useDrop, DndProvider } from "react-dnd";
import { getEmptyImage, HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// ---------- Types ----------
type TaskStatus = "todo" | "in-progress" | "done" | "blocked" | "in-review";
type Priority = "low" | "medium" | "high";

interface Task {
    id: string | number;
    title: string;
    description: string;
    status: TaskStatus;
    progress: number;
    dueDate: string;
    priority: Priority;
}

const STATUSES: TaskStatus[] = ["todo", "in-progress", "done", "blocked", "in-review"];

const STATUS_LABELS: Record<TaskStatus, string> = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
    blocked: "Blocked",
    "in-review": "In Review",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
    todo: "bg-task-todo-muted border-task-todo/30",
    "in-progress": "bg-task-progress-muted border-task-progress/30",
    done: "bg-task-done-muted border-task-done/30",
    blocked: "bg-task-blocked-muted border-task-blocked/30",
    "in-review": "bg-task-inreview-muted border-task-inreview/30",
};

const PRIORITY_COLORS: Record<Priority, string> = {
    low: "bg-success-muted text-success border-success/30",
    medium: "bg-warning-muted text-warning border-warning/30",
    high: "bg-error-muted text-error border-error/30",
};

const PRIORITY_LABELS: Record<Priority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

// ---------- Mock Data ----------
const initialTasks: Task[] = [
    {
        id: 1,
        title: "Design homepage",
        description: "Create wireframes and mockups",
        status: "todo",
        progress: 30,
        dueDate: "2025-05-01",
        priority: "high",
    },
    {
        id: "2",
        title: "Set up database",
        description: "Install PostgreSQL and Prisma",
        status: "in-progress",
        progress: 60,
        dueDate: "2025-04-20",
        priority: "medium",
    },
    {
        id: "3",
        title: "Write API endpoints",
        description: "Implement CRUD for projects",
        status: "done",
        progress: 100,
        dueDate: "2025-04-10",
        priority: "low",
    },
    {
        id: "4",
        title: "Fix navigation bug",
        description: "Sidebar not closing on mobile",
        status: "blocked",
        progress: 0,
        dueDate: "2025-04-25",
        priority: "high",
    },
    {
        id: "5",
        title: "Code review",
        description: "Review PR #42",
        status: "in-review",
        progress: 80,
        dueDate: "2025-04-18",
        priority: "medium",
    },
    {
        id: "6",
        title: "Write tests",
        description: "Unit tests for auth",
        status: "todo",
        progress: 10,
        dueDate: "2025-05-10",
        priority: "low",
    },
];

// ---------- Drag Item Types ----------
const ItemTypes = {
    TASK: "task",
};

// ---------- Task Card (Draggable) ----------
interface TaskCardProps {
    task: Task;
}

interface DraggedTask {
    task: Task;
    width: number;
    height: number;
}

function TaskCard({ task }: TaskCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: () => ({
            task,
            width: cardRef.current?.getBoundingClientRect().width ?? 280,
            height: cardRef.current?.getBoundingClientRect().height ?? 200,
        } satisfies DraggedTask),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <div
            ref={(node) => { cardRef.current = node; drag(node); }}
            className={cn("cursor-grab", isDragging && "opacity-30")}
        >
            <TaskCardContent task={task} />
        </div>
    );
}

function TaskCardContent({ task }: TaskCardProps) {
    const dueDateFormatted = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null;

    return (
        <div
            className={cn(
                "p-4 rounded-lg border shadow-sm space-y-2",
                STATUS_COLORS[task.status],
            )}
        >
            <div className="flex items-start justify-between">
                <h4 className="font-semibold text-sm">{task.title}</h4>
                <Badge
                    variant="outline"
                    className={cn(
                        "text-xs font-medium border",
                        PRIORITY_COLORS[task.priority]
                    )}
                >
                    {PRIORITY_LABELS[task.priority]}
                </Badge>
            </div>

            <p className="text-xs text-muted-foreground">{task.description}</p>

            {/* Progress */}
            <div className="space-y-1">
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
            </div>

            {dueDateFormatted && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>📅</span>
                    <span>Due: {dueDateFormatted}</span>
                </div>
            )}

            <Badge variant="outline" className="text-xs">
                {STATUS_LABELS[task.status]}
            </Badge>
        </div>
    );
}

function TaskDragPreview() {
    const { item, offset, isDragging } = useDragLayer((monitor) => ({
        item: monitor.getItem<DraggedTask>(),
        offset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging() && monitor.getItemType() === ItemTypes.TASK,
    }));

    if (!isDragging || !item || !offset) return null;

    return createPortal(
        <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
            <div
                className="rounded-lg bg-background shadow-xl"
                style={{
                    width: item.width,
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                }}
            >
                <TaskCardContent task={item.task} />
            </div>
        </div>,
        document.body
    );
}

// ---------- Column (Drop Target) ----------
interface ColumnProps {
    status: TaskStatus;
    tasks: Task[];
    onMove: (taskId: Task["id"], newStatus: TaskStatus, beforeId: Task["id"] | null) => void;
}

function Column({ status, tasks, onMove }: ColumnProps) {
    const cardNodes = useRef(new Map<Task["id"], HTMLDivElement>());
    const placeholderRef = useRef<HTMLDivElement>(null);
    const insertionRef = useRef<Task["id"] | null>(null);
    const [beforeId, setBeforeId] = useState<Task["id"] | null>(null);
    const [{ isOver, placeholderHeight }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        hover: (item: DraggedTask, monitor) => {
            const pointer = monitor.getClientOffset();
            if (!pointer) return;

            // Keep the insertion point stable while hovering inside its placeholder.
            const placeholder = placeholderRef.current?.getBoundingClientRect();
            if (placeholder && pointer.y >= placeholder.top && pointer.y <= placeholder.bottom) return;

            const nextTask = tasks.find((task) => {
                if (task.id === item.task.id) return false;
                const bounds = cardNodes.current.get(task.id)?.getBoundingClientRect();
                return bounds && pointer.y < bounds.top + bounds.height / 2;
            });
            insertionRef.current = nextTask?.id ?? null;
            setBeforeId(insertionRef.current);
        },
        drop: (item: DraggedTask) => {
            onMove(item.task.id, status, insertionRef.current);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            placeholderHeight: monitor.getItem<DraggedTask>()?.height,
        }),
    }), [onMove, status, tasks]);

    const placeholder = isOver ? (
        <div
            ref={placeholderRef}
            className="flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/5 p-4 text-sm font-medium text-primary"
            style={{ minHeight: placeholderHeight ?? 200 }}
        >
            Drop here
        </div>
    ) : null;

    return (
        <div
            ref={(node) => { drop(node); }}
            className={cn(
                "flex flex-col min-h-[300px] p-3 rounded-lg border-2 border-dashed transition-colors",
                isOver ? "border-primary bg-primary/5" : "border-transparent"
            )}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{STATUS_LABELS[status]}</h3>
                <Badge variant="secondary">{tasks.length}</Badge>
            </div>
            <div className="flex-1 space-y-2">
                {tasks.map((task) => (
                    <Fragment key={task.id}>
                        {beforeId === task.id && placeholder}
                        <div ref={(node) => {
                            if (node) cardNodes.current.set(task.id, node);
                            else cardNodes.current.delete(task.id);
                        }}>
                            <TaskCard task={task} />
                        </div>
                    </Fragment>
                ))}
                {beforeId === null && placeholder}
                {tasks.length === 0 && !isOver && (
                    <div className="text-sm text-muted-foreground text-center py-8">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );
}

// ---------- Main Page ----------
export default function KanbanPage() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const moveTask = (taskId: Task["id"], newStatus: TaskStatus, beforeId: Task["id"] | null) => {
        setTasks((prev) => {
            const task = prev.find((task) => task.id === taskId);
            if (!task) return prev;

            const remaining = prev.filter((task) => task.id !== taskId);
            const insertionIndex = beforeId === null ? -1 : remaining.findIndex(
                (task) => task.id === beforeId && task.status === newStatus
            );
            remaining.splice(insertionIndex < 0 ? remaining.length : insertionIndex, 0, {
                ...task,
                status: newStatus,
            });
            return remaining;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <TaskDragPreview />
            <div className="py-6">
                <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-6">
                    {STATUSES.map((status) => (
                        <Card key={status} className="overflow-hidden">
                            <CardContent className="px-2 pb-2">
                                <Column
                                    status={status}
                                    tasks={tasks.filter((t) => t.status === status)}
                                    onMove={moveTask}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DndProvider>
    );
}
