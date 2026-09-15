"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------- Types ----------
type ClientStatus = "active" | "inactive" | "pending";
type TaskStatus = "todo" | "in-progress" | "done" | "blocked" | "in-review";
type TaskPriority = "low" | "medium" | "high";
type InvoiceStatus = "paid" | "pending" | "overdue";

interface Client {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    location: string;
    referredBy: string;
    joinedDate: Date;
    status: ClientStatus;
    avatar?: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    dueDate: string;
    priority: "low" | "medium" | "high";
}

interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    progress: number;
    commentsCount: number;
    dueDate: string;
    assignee: string;
}

interface Invoice {
    id: string;
    invoiceNumber: string;
    amount: number;
    status: InvoiceStatus;
    issueDate: string;
    dueDate: string;
}

// ---------- Mock Data ----------
const mockClients: Record<string, Client> = {
    "CL-001": {
        id: "CL-001",
        name: "Alice Johnson",
        company: "TechCorp",
        email: "alice@techcorp.com",
        phone: "+1 234 567 8901",
        location: "San Francisco, CA",
        referredBy: "John Doe",
        joinedDate: new Date("2025-01-15"),
        status: "active",
        avatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=6366f1&color=fff",
    },
    "CL-002": {
        id: "CL-002",
        name: "Bob Smith",
        company: "Innovate Inc",
        email: "bob@innovate.com",
        phone: "+1 234 567 8902",
        location: "New York, NY",
        referredBy: "Sarah Lee",
        joinedDate: new Date("2025-02-20"),
        status: "active",
        avatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=22c55e&color=fff",
    },
    "CL-003": {
        id: "CL-003",
        name: "Carol White",
        company: "Design Studio",
        email: "carol@design.studio",
        phone: "+1 234 567 8903",
        location: "New York, NY",
        referredBy: "Sarah Lee",
        joinedDate: new Date("2025-02-20"),
        status: "active",
        avatar: "https://ui-avatars.com/api/?name=Carol+White&background=3b82f6&color=fff",
    },
};

const mockProjects: Record<string, Project[]> = {
    "CL-001": [
        {
            id: "p1",
            name: "E-commerce Platform",
            description: "Build a full-featured online store",
            status: "In Progress",
            progress: 65,
            dueDate: "2025-06-30",
            priority: "high",
        },
        {
            id: "p2",
            name: "Mobile App",
            description: "React Native app for clients",
            status: "To Do",
            progress: 20,
            dueDate: "2025-07-15",
            priority: "medium",
        },
        {
            id: "p5",
            name: "User Authentication System",
            description: "Implement user login and registration",
            status: "To Do",
            progress: 10,
            dueDate: "2025-07-15",
            priority: "medium",
        },
    ],
    "CL-002": [
        {
            id: "p3",
            name: "Dashboard Redesign",
            description: "Modernize admin dashboard",
            status: "Done",
            progress: 100,
            dueDate: "2025-04-01",
            priority: "low",
        },
        {
            id: "p4",
            name: "API Integration",
            description: "Integrate third-party APIs",
            status: "In Review",
            progress: 90,
            dueDate: "2025-05-20",
            priority: "low",
        },
    ],
    "CL-003": [
        {
            id: "p6",
            name: "API Integration",
            description: "Integrate third-party APIs",
            status: "In Review",
            progress: 90,
            dueDate: "2025-05-20",
            priority: "high",
        },
    ]
};

const mockTasks: Record<string, Task[]> = {
    "CL-001": [
        {
            id: "t1",
            title: "Design homepage",
            description: "Create wireframes and mockups",
            status: "in-progress",
            priority: "high",
            progress: 65,
            commentsCount: 8,
            dueDate: "2025-05-10",
            assignee: "Alice Johnson",
        },
        {
            id: "t2",
            title: "Set up database",
            description: "Install and configure PostgreSQL",
            status: "done",
            priority: "medium",
            progress: 100,
            commentsCount: 3,
            dueDate: "2025-04-20",
            assignee: "Bob Smith",
        },
    ],
    "CL-002": [
        {
            id: "t3",
            title: "API documentation",
            description: "Write OpenAPI specs",
            status: "todo",
            priority: "low",
            progress: 10,
            commentsCount: 1,
            dueDate: "2025-06-01",
            assignee: "Carol White",
        },
    ],
    "CL-003": [
        {
            id: "t4",
            title: "Implement authentication",
            description: "Set up OAuth2 and JWT",
            status: "in-review",
            priority: "high",
            progress: 90,
            commentsCount: 5,
            dueDate: "2025-05-15",
            assignee: "Alice Johnson",
        },
    ],
};

const mockInvoices: Record<string, Invoice[]> = {
    "CL-001": [
        {
            id: "inv1",
            invoiceNumber: "INV-2025-001",
            amount: 125000,
            status: "paid",
            issueDate: "2025-03-01",
            dueDate: "2025-03-30",
        },
        {
            id: "inv2",
            invoiceNumber: "INV-2025-002",
            amount: 45000,
            status: "pending",
            issueDate: "2025-04-01",
            dueDate: "2025-04-30",
        },
    ],
    "CL-002": [
        {
            id: "inv3",
            invoiceNumber: "INV-2025-003",
            amount: 89000,
            status: "overdue",
            issueDate: "2025-02-01",
            dueDate: "2025-03-01",
        },
    ],
    "CL-003": [
        {
            id: "inv4",
            invoiceNumber: "INV-2025-004",
            amount: 56000,
            status: "paid",
            issueDate: "2025-01-15",
            dueDate: "2025-02-15",
        },
    ],
};

// ---------- Helpers ----------
const statusColors: Record<ClientStatus, string> = {
    active: "bg-success-muted text-success border-success/30",
    inactive: "bg-muted text-muted-foreground border-border",
    pending: "bg-warning-muted text-warning border-warning/30",
};

const invoiceStatusColors: Record<InvoiceStatus, string> = {
    paid: "bg-success-muted text-success border-success/30",
    pending: "bg-warning-muted text-warning border-warning/30",
    overdue: "bg-error-muted text-error border-error/30",
};

const taskStatusColors: Record<TaskStatus, string> = {
    todo: "bg-task-todo-muted text-task-todo border-task-todo/30",
    "in-progress": "bg-task-progress-muted text-task-progress border-task-progress/30",
    done: "bg-task-done-muted text-task-done border-task-done/30",
    blocked: "bg-task-blocked-muted text-task-blocked border-task-blocked/30",
    "in-review": "bg-task-inreview-muted text-task-inreview border-task-inreview/30",
};

// ---------- Task Card Component ----------
function TaskCard({ task }: { task: Task }) {
    const priorityColors = {
        low: "bg-success-muted text-success border-success/30",
        medium: "bg-warning-muted text-warning border-warning/30",
        high: "bg-error-muted text-error border-error/30",
    };

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <Badge variant="outline" className={taskStatusColors[task.status]}>
                        {task.status.replace("-", " ").charAt(0).toUpperCase() +
                            task.status.replace("-", " ").slice(1)}
                    </Badge>
                </div>
                <CardDescription className="text-sm">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Priority:</span>
                        <Badge variant="outline" className={priorityColors[task.priority]}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                    </div>
                    <span className="text-muted-foreground">Assignee: {task.assignee}</span>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {task.commentsCount} comments
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

// ---------- Main Component ----------
export default function ClientDetailPage() {
    const router = useRouter();
    const params = useParams();
    const clientId = params.clientId as string;

    const client = mockClients[clientId];
    const projects = mockProjects[clientId] || [];
    const tasks = mockTasks[clientId] || [];
    const invoices = mockInvoices[clientId] || [];

    if (!client) {
        return (
            <div className="p-6">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold">Client not found</h2>
                    <p className="text-muted-foreground mt-2">
                        The client with ID {clientId} does not exist.
                    </p>
                    <Button className="mt-4" onClick={() => router.back()}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const initials = client.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="p-6 space-y-6">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            {/* Client Info */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={client.avatar} />
                                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{client.name}</CardTitle>
                                <CardDescription>{client.company}</CardDescription>
                            </div>
                        </div>
                        <Badge variant="outline" className={cn("text-sm", statusColors[client.status])}>
                            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Client ID:</span>
                            <span className="font-mono text-xs">{client.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Referred By:</span>
                            <span>{client.referredBy}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{client.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Joined: {client.joinedDate.toLocaleDateString()}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Projects */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                {projects.length === 0 ? (
                    <p className="text-muted-foreground">No projects for this client.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <Card key={project.id}>
                                <CardHeader>
                                    <CardTitle className="text-base">{project.name}</CardTitle>
                                    <CardDescription className="text-sm">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Status</span>
                                        <Badge variant="outline">{project.status}</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} className="h-2" />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Due Date</span>
                                        <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Priority</span>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-xs",
                                                project.priority === "high" && "bg-error-muted text-error border-error/30",
                                                project.priority === "medium" && "bg-warning-muted text-warning border-warning/30",
                                                project.priority === "low" && "bg-success-muted text-success border-success/30"
                                            )}
                                        >
                                            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Tasks */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                {tasks.length === 0 ? (
                    <p className="text-muted-foreground">No tasks for this client.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>

            {/* Invoices */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Invoices</h2>
                {invoices.length === 0 ? (
                    <p className="text-muted-foreground">No invoices for this client.</p>
                ) : (
                    <div className="border rounded-md">
                        <Table className="bg-card rounded-md">
                            <TableHeader className="bg-muted">
                                <TableRow className="h-12">
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id} className="h-14">
                                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                                        <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                                        <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={invoiceStatusColors[invoice.status]}>
                                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}