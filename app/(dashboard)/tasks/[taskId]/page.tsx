"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ArrowLeft,
    Paperclip,
    MessageCircle,
    Activity,
    CheckCircle,
    Circle,
    Plus,
    Calendar,
    User,
    Clock,
    Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------- Types ----------
type TaskStatus = "todo" | "in-progress" | "done" | "blocked" | "in-review";
type TaskPriority = "low" | "medium" | "high";

interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface Comment {
    id: string;
    author: string;
    avatar?: string;
    text: string;
    createdAt: Date;
}

interface Activity {
    id: string;
    action: string;
    user: string;
    timestamp: Date;
}

interface Task {
    id: string;
    title: string;
    description: string;
    projectName: string;
    projectId: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignee: string;
    assigneeAvatar?: string;
    startDate: Date;
    dueDate: Date;
    createdAt: Date;
    attachments: string[]; // file names or URLs
    subtasks: Subtask[];
    comments: Comment[];
    activities: Activity[];
    overallProgress: number; // 0-100
}

// ---------- Mock Data ----------
const mockTasks: Record<string, Task> = {
    "task-1": {
        id: "task-1",
        title: "Design homepage wireframes",
        description:
            "Create low-fidelity wireframes for the new homepage layout. Include header, hero section, featured content, and footer.",
        projectName: "E-commerce Platform",
        projectId: "p1",
        status: "in-progress",
        priority: "high",
        assignee: "Alice Johnson",
        assigneeAvatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=6366f1&color=fff",
        startDate: new Date("2025-04-01"),
        dueDate: new Date("2025-05-10"),
        createdAt: new Date("2025-04-01"),
        attachments: ["wireframe-sketch.png", "user-flow-diagram.pdf"],
        subtasks: [
            { id: "st1", title: "Research competitor designs", isCompleted: true },
            { id: "st2", title: "Sketch low-fi wireframes", isCompleted: false },
            { id: "st3", title: "Get feedback from PM", isCompleted: false },
        ],
        comments: [
            {
                id: "c1",
                author: "Bob Smith",
                avatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=22c55e&color=fff",
                text: "Looks good! Maybe add a call-to-action section.",
                createdAt: new Date("2025-04-03T10:30:00"),
            },
            {
                id: "c2",
                author: "Carol White",
                avatar: "https://ui-avatars.com/api/?name=Carol+White&background=f59e0b&color=fff",
                text: "Don't forget the mobile version.",
                createdAt: new Date("2025-04-04T14:20:00"),
            },
        ],
        activities: [
            {
                id: "a1",
                action: "created the task",
                user: "Alice Johnson",
                timestamp: new Date("2025-04-01T09:00:00"),
            },
            {
                id: "a2",
                action: "changed status from 'To Do' to 'In Progress'",
                user: "Alice Johnson",
                timestamp: new Date("2025-04-02T11:30:00"),
            },
            {
                id: "a3",
                action: "added a comment",
                user: "Bob Smith",
                timestamp: new Date("2025-04-03T10:30:00"),
            },
        ],
        overallProgress: 45,
    },
    // add more tasks if needed
};

// ---------- Helper Components ----------
function StatusBadge({ status }: { status: TaskStatus }) {
    const statusMap = {
        todo: { label: "To Do", className: "bg-task-todo-muted text-task-todo border-task-todo/30" },
        "in-progress": { label: "In Progress", className: "bg-task-progress-muted text-task-progress border-task-progress/30" },
        done: { label: "Done", className: "bg-task-done-muted text-task-done border-task-done/30" },
        blocked: { label: "Blocked", className: "bg-task-blocked-muted text-task-blocked border-task-blocked/30" },
        "in-review": { label: "In Review", className: "bg-task-inreview-muted text-task-inreview border-task-inreview/30" },
    };
    const { label, className } = statusMap[status];
    return (
        <Badge variant="outline" className={className}>
            {label}
        </Badge>
    );
}

function PriorityBadge({ priority }: { priority: TaskPriority }) {
    const priorityMap = {
        low: { label: "Low", className: "bg-success-muted text-success border-success/30" },
        medium: { label: "Medium", className: "bg-warning-muted text-warning border-warning/30" },
        high: { label: "High", className: "bg-error-muted text-error border-error/30" },
    };
    const { label, className } = priorityMap[priority];
    return (
        <Badge variant="outline" className={className}>
            <Flag className="mr-1 h-3 w-3" />
            {label}
        </Badge>
    );
}

// ---------- Main Component ----------
export default function TaskDetailPage() {
    const router = useRouter();
    const params = useParams();
    const taskId = params.taskId as string;
    const task = mockTasks[taskId];

    // Local state for task data (will update on actions)
    const [taskData, setTaskData] = useState<Task | undefined>(task);
    const [newComment, setNewComment] = useState("");
    const [newSubtask, setNewSubtask] = useState("");

    if (!taskData) {
        return (
            <div className="p-6">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold">Task not found</h2>
                    <p className="text-muted-foreground mt-2">The task with ID {taskId} does not exist.</p>
                    <Button className="mt-4" onClick={() => router.back()}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    // ---------- Handlers ----------
    const handleToggleSubtask = (subtaskId: string) => {
        setTaskData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                subtasks: prev.subtasks.map((st) =>
                    st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
                ),
            };
        });
    };

    const handleAddSubtask = () => {
        if (!newSubtask.trim()) return;
        setTaskData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                subtasks: [
                    ...prev.subtasks,
                    { id: `st-${Date.now()}`, title: newSubtask, isCompleted: false },
                ],
                overallProgress: Math.min(
                    prev.overallProgress + 10,
                    100
                ), // simplistic update
            };
        });
        setNewSubtask("");
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const newCommentObj: Comment = {
            id: `c-${Date.now()}`,
            author: "Current User", // replace with actual user
            avatar: "https://ui-avatars.com/api/?name=Current+User&background=random",
            text: newComment,
            createdAt: new Date(),
        };
        setTaskData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                comments: [...prev.comments, newCommentObj],
                activities: [
                    ...prev.activities,
                    {
                        id: `a-${Date.now()}`,
                        action: "added a comment",
                        user: "Current User",
                        timestamp: new Date(),
                    },
                ],
            };
        });
        setNewComment("");
    };

    const handleMarkComplete = () => {
        setTaskData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                status: "done",
                overallProgress: 100,
                activities: [
                    ...prev.activities,
                    {
                        id: `a-${Date.now()}`,
                        action: "marked task as complete",
                        user: "Current User",
                        timestamp: new Date(),
                    },
                ],
            };
        });
    };

    // Compute completed subtasks count
    const completedSubtasks = taskData.subtasks.filter((st) => st.isCompleted).length;
    const totalSubtasks = taskData.subtasks.length;
    const subtaskProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

    // Format date
    const formatDate = (date: Date) => date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const formatTime = (date: Date) => date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="p-6 space-y-6">
            {/* Back button */}
            <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            {/* Card 1: Status, Title, Project, Created, Attachments, Description */}
            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <StatusBadge status={taskData.status} />
                            <h1 className="text-2xl font-bold">{taskData.title}</h1>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Project: {taskData.projectName}
                        </div>
                    </div>
                    <CardDescription>
                        Created: {formatDate(taskData.createdAt)} at {formatTime(taskData.createdAt)}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Attachments */}
                    {taskData.attachments.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium mb-2">Attachments</h4>
                            <div className="flex flex-wrap gap-2">
                                {taskData.attachments.map((file, idx) => (
                                    <Badge key={idx} variant="outline" className="flex items-center gap-1">
                                        <Paperclip className="h-3 w-3" />
                                        {file}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Description */}
                    <div>
                        <h4 className="text-sm font-medium mb-1">Description</h4>
                        <p className="text-sm text-muted-foreground">{taskData.description}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Card 2: Tabs for Subtasks, Comments, Activity */}
            <Card>
                <CardContent className="p-0">
                    <Tabs defaultValue="subtasks" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 rounded-t-lg">
                            <TabsTrigger value="subtasks" className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Subtasks
                            </TabsTrigger>
                            <TabsTrigger value="comments" className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" />
                                Comments
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                Activity
                            </TabsTrigger>
                        </TabsList>

                        {/* Subtasks Tab */}
                        <TabsContent value="subtasks" className="p-4 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progress: {subtaskProgress}%</span>
                                    <span>{completedSubtasks} / {totalSubtasks} done</span>
                                </div>
                                <Progress value={subtaskProgress} className="h-2" />
                            </div>

                            <div className="space-y-2">
                                {taskData.subtasks.map((subtask) => (
                                    <div key={subtask.id} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={subtask.isCompleted}
                                            onCheckedChange={() => handleToggleSubtask(subtask.id)}
                                        />
                                        <span className={cn("text-sm", subtask.isCompleted && "line-through text-muted-foreground")}>
                                            {subtask.title}
                                        </span>
                                    </div>
                                ))}
                                {taskData.subtasks.length === 0 && (
                                    <p className="text-sm text-muted-foreground">No subtasks yet.</p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add new subtask..."
                                    value={newSubtask}
                                    onChange={(e) => setNewSubtask(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                                />
                                <Button size="sm" onClick={handleAddSubtask}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Comments Tab */}
                        <TabsContent value="comments" className="p-4 space-y-4">
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {taskData.comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={comment.avatar} />
                                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">{comment.author}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDate(comment.createdAt)} at {formatTime(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-sm">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {taskData.comments.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No comments yet.</p>
                                    )}
                                </div>
                            </ScrollArea>

                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                                />
                                <Button size="sm" onClick={handleAddComment}>Post</Button>
                            </div>
                        </TabsContent>

                        {/* Activity Tab */}
                        <TabsContent value="activity" className="p-4">
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {taskData.activities.map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-2 text-sm">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                            <div>
                                                <span className="font-medium">{activity.user}</span>
                                                <span className="text-muted-foreground"> {activity.action}</span>
                                                <span className="text-xs text-muted-foreground ml-2">
                                                    {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {taskData.activities.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No activity yet.</p>
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Card 3: Task Details (status, priority, assignee, dates, progress, mark complete) */}
            <Card>
                <CardHeader>
                    <CardTitle>Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Status:</span>
                            <StatusBadge status={taskData.status} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Priority:</span>
                            <PriorityBadge priority={taskData.priority} />
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Assignee:</span>
                            <span className="text-sm">{taskData.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Start:</span>
                            <span className="text-sm">{formatDate(taskData.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Due:</span>
                            <span className="text-sm">{formatDate(taskData.dueDate)}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Overall Progress</span>
                            <span>{taskData.overallProgress}%</span>
                        </div>
                        <Progress value={taskData.overallProgress} className="h-2" />
                    </div>

                    <Button
                        className="w-full md:w-auto"
                        onClick={handleMarkComplete}
                        disabled={taskData.status === "done"}
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Complete
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}