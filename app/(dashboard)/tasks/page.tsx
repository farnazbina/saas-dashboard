"use client";

import { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    todo: "bg-blue-100 border-blue-300",
    "in-progress": "bg-yellow-100 border-yellow-300",
    done: "bg-green-100 border-green-300",
    blocked: "bg-red-100 border-red-300",
    "in-review": "bg-purple-100 border-purple-300",
};

const PRIORITY_COLORS: Record<Priority, string> = {
    low: "bg-green-100 text-green-800 border-green-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    high: "bg-red-100 text-red-800 border-red-300",
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
    index: number;
    onMove: (taskId: string, newStatus: TaskStatus) => void;
}

function TaskCard({ task, index, onMove }: TaskCardProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: { id: task.id, status: task.status, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const dueDateFormatted = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null;

    return (
        <div
            ref={drag}
            className={cn(
                "p-4 mb-2 rounded-lg border shadow-sm cursor-grab transition-opacity space-y-2",
                STATUS_COLORS[task.status],
                isDragging && "opacity-50"
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

// ---------- Column (Drop Target) ----------
interface ColumnProps {
    status: TaskStatus;
    tasks: Task[];
    onMove: (taskId: string, newStatus: TaskStatus) => void;
}

function Column({ status, tasks, onMove }: ColumnProps) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: { id: string }) => {
            onMove(item.id, status);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
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
                {tasks.map((task, index) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        onMove={onMove}
                    />
                ))}
                {tasks.length === 0 && (
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

    const moveTask = (taskId: string, newStatus: TaskStatus) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
        // Optionally, call an API to persist the change
        console.log(`Task ${taskId} moved to ${newStatus}`);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="py-6">
                <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
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