"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
// import { mockClients, type ClientStatus } from "@/lib/mock-data";

// lib/mock-data.ts
export type ClientStatus = "active" | "inactive" | "pending";

export interface Client {
    id: string;
    name: string;
    company: string;
    email: string;
    projects: number;
    revenue: number;
    status: ClientStatus;
    createdAt: Date;
    phone?: string;
    address?: string;
}

export const mockClients: Client[] = [
    {
        id: "CL-001",
        name: "Alice Johnson",
        company: "TechCorp",
        email: "alice@techcorp.com",
        projects: 4,
        revenue: 125000,
        status: "active",
        createdAt: new Date("2025-01-15"),
    },
    {
        id: "CL-002",
        name: "Bob Smith",
        company: "Innovate Inc",
        email: "bob@innovate.com",
        projects: 2,
        revenue: 45000,
        status: "active",
        createdAt: new Date("2025-02-20"),
    },
    {
        id: "CL-003",
        name: "Carol White",
        company: "Design Studio",
        email: "carol@design.studio",
        projects: 1,
        revenue: 15000,
        status: "pending",
        createdAt: new Date("2025-03-01"),
    },
    // Add more as needed...
];

// Reuse the StatusBadge component (copy from clients page or extract to shared)
function StatusBadge({ status }: { status: ClientStatus }) {
    const statusColors: Record<ClientStatus, string> = {
        active: "bg-green-100 text-green-800 border-green-300",
        inactive: "bg-gray-100 text-gray-800 border-gray-300",
        pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };
    const statusLabels: Record<ClientStatus, string> = {
        active: "Active",
        inactive: "Inactive",
        pending: "Pending",
    };
    return (
        <Badge variant="outline" className={cn("text-xs font-medium", statusColors[status])}>
            {statusLabels[status]}
        </Badge>
    );
}

export function RecentClientsTable() {
    // Get the 5 most recent clients (by createdAt)
    const recentClients = useMemo(() => {
        return [...mockClients]
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 5);
    }, []);

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle>Recent Clients</CardTitle>
                    <CardDescription>
                        The 5 most recently added clients
                    </CardDescription>
                </div>
                <Link href="/clients">
                    <Button variant="outline" size="sm" className="gap-1">
                        View All <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-center">Projects</TableHead>
                            <TableHead className="text-right">Revenue</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentClients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    No clients yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            recentClients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-mono text-xs">{client.id}</TableCell>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>{client.company}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                    <TableCell className="text-center">{client.projects}</TableCell>
                                    <TableCell className="text-right">
                                        ${client.revenue.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={client.status} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}