"use client";

import { useState, useMemo } from "react";
import {
    Card,
    CardContent,
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Plus,
    Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------- Types ----------
type ClientStatus = "active" | "inactive" | "pending";

interface Client {
    id: string;
    name: string;
    company: string;
    email: string;
    projects: number;
    revenue: number;
    status: ClientStatus;
    createdAt: Date;
}

// ---------- Mock Data ----------
const mockClients: Client[] = [
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
    {
        id: "CL-004",
        name: "David Brown",
        company: "DataFlow",
        email: "david@dataflow.com",
        projects: 0,
        revenue: 0,
        status: "inactive",
        createdAt: new Date("2024-12-10"),
    },
    {
        id: "CL-005",
        name: "Eva Green",
        company: "EcoSolutions",
        email: "eva@ecosolutions.com",
        projects: 3,
        revenue: 89000,
        status: "active",
        createdAt: new Date("2025-04-05"),
    },
    {
        id: "CL-006",
        name: "Frank Miller",
        company: "NextGen AI",
        email: "frank@nextgen.ai",
        projects: 5,
        revenue: 210000,
        status: "active",
        createdAt: new Date("2025-04-12"),
    },
];

// ---------- Status Badge ----------
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

function StatusBadge({ status }: { status: ClientStatus }) {
    return (
        <Badge variant="outline" className={cn("text-xs font-medium", statusColors[status])}>
            {statusLabels[status]}
        </Badge>
    );
}

// ---------- Main Page ----------
export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");
    const [sortOption, setSortOption] = useState<string>("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

    // Edit modal state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

    // Show details
    const [showDialogOpen, setShowDialogOpen] = useState(false);
    const [clientToShow, setClientToShow] = useState<Client | null>(null);

    // ---------- Computed summary ----------
    const totalClients = clients.length;
    const activeClients = clients.filter((c) => c.status === "active").length;
    const newThisMonth = clients.filter(
        (c) =>
            c.createdAt.getMonth() === new Date().getMonth() &&
            c.createdAt.getFullYear() === new Date().getFullYear()
    ).length;
    const totalRevenue = clients.reduce((sum, c) => sum + c.revenue, 0);

    // ---------- Filter & Sort ----------
    const filteredClients = useMemo(() => {
        let result = clients.filter(
            (c) =>
                (statusFilter === "all" || c.status === statusFilter) &&
                (c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.company.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase()))
        );
        return result;
    }, [clients, statusFilter, search]);

    const sortedClients = useMemo(() => {
        const sorted = [...filteredClients];
        switch (sortOption) {
            case "newest":
                sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                break;
            case "oldest":
                sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
                break;
            case "name-asc":
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "revenue-high":
                sorted.sort((a, b) => b.revenue - a.revenue);
                break;
            case "revenue-low":
                sorted.sort((a, b) => a.revenue - b.revenue);
                break;
            default:
                break;
        }
        return sorted;
    }, [filteredClients, sortOption]);

    // ---------- Pagination ----------
    const totalPages = Math.ceil(sortedClients.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedClients = sortedClients.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // ---------- CRUD actions ----------
    const handleDelete = (client: Client) => {
        setClientToDelete(client);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (clientToDelete) {
            setClients(clients.filter((c) => c.id !== clientToDelete.id));
            setDeleteDialogOpen(false);
            setClientToDelete(null);
        }
    };

    const handleEdit = (client: Client) => {
        setClientToEdit(client);
        setEditDialogOpen(true);
    };

    const handleShow = (client: Client) => {
        setClientToShow(client);
        setShowDialogOpen(true);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Clients</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Clients
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalClients}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Clients
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeClients}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            New This Month
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{newThisMonth}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalRevenue.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortOption} onValueChange={(val) => setSortOption(val)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="name-asc">Name A-Z</SelectItem>
                            <SelectItem value="name-desc">Name Z-A</SelectItem>
                            <SelectItem value="revenue-high">Revenue High-Low</SelectItem>
                            <SelectItem value="revenue-low">Revenue Low-High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="ml-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Client
                </Button>
            </div>

            {/* Table */}
            <div className="border rounded-md">
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
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedClients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No clients found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedClients.map((client) => (
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
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <span variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuGroup>
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleShow(client)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Show
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEdit(client)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => handleDelete(client)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-end">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage - 1);
                                    }}
                                    aria-disabled={currentPage === 1}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page);
                                        }}
                                        isActive={page === currentPage}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage + 1);
                                    }}
                                    aria-disabled={currentPage === totalPages}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Client</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{clientToDelete?.name}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog (simplified) */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Client</DialogTitle>
                        <DialogDescription>
                            Update the client's information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="edit-name"
                                defaultValue={clientToEdit?.name}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="edit-email"
                                defaultValue={clientToEdit?.email}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Show Dialog */}
            <Dialog open={showDialogOpen} onOpenChange={setShowDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Client Details</DialogTitle>
                    </DialogHeader>
                    {clientToShow && (
                        <div className="space-y-2">
                            <p><strong>ID:</strong> {clientToShow.id}</p>
                            <p><strong>Name:</strong> {clientToShow.name}</p>
                            <p><strong>Company:</strong> {clientToShow.company}</p>
                            <p><strong>Email:</strong> {clientToShow.email}</p>
                            <p><strong>Projects:</strong> {clientToShow.projects}</p>
                            <p><strong>Revenue:</strong> ${clientToShow.revenue.toLocaleString()}</p>
                            <p><strong>Status:</strong> <StatusBadge status={clientToShow.status} /></p>
                            <p><strong>Created At:</strong> {clientToShow.createdAt.toLocaleDateString()}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setShowDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}