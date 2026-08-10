"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------- Types ----------
interface Invoice {
    id: string;
    name: string; // client name or invoice title
    amount: number;
    date: string; // ISO date string
    isPaid: boolean;
}

// ---------- Mock Data ----------
const initialInvoices: Invoice[] = [
    { id: "INV-001", name: "Alice Johnson", amount: 125000, date: "2025-03-01", isPaid: true },
    { id: "INV-002", name: "Bob Smith", amount: 45000, date: "2025-04-01", isPaid: false },
    { id: "INV-003", name: "Carol White", amount: 89000, date: "2025-02-15", isPaid: false },
    { id: "INV-004", name: "David Brown", amount: 15000, date: "2025-03-20", isPaid: true },
    { id: "INV-005", name: "Eva Green", amount: 210000, date: "2025-01-10", isPaid: false },
    { id: "INV-006", name: "Frank Miller", amount: 72000, date: "2025-04-10", isPaid: true },
    { id: "INV-007", name: "Grace Lee", amount: 34000, date: "2025-04-15", isPaid: false },
];

// ---------- Main Page ----------
export default function InvoicesPage() {
    const router = useRouter();
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);

    // ---------- Filter & Pagination ----------
    const filteredInvoices = useMemo(() => {
        return invoices.filter((inv) =>
            inv.name.toLowerCase().includes(search.toLowerCase()) ||
            inv.id.toLowerCase().includes(search.toLowerCase())
        );
    }, [invoices, search]);

    const sortedInvoices = useMemo(() => {
        // Sort by date descending (newest first)
        return [...filteredInvoices].sort((a, b) => b.date.localeCompare(a.date));
    }, [filteredInvoices]);

    const totalPages = Math.ceil(sortedInvoices.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedInvoices = sortedInvoices.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // ---------- Actions ----------
    const handleTogglePaid = (id: string) => {
        setInvoices((prev) =>
            prev.map((inv) =>
                inv.id === id ? { ...inv, isPaid: !inv.isPaid } : inv
            )
        );
    };

    const handleDelete = (invoice: Invoice) => {
        setInvoiceToDelete(invoice);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (invoiceToDelete) {
            setInvoices(invoices.filter((inv) => inv.id !== invoiceToDelete.id));
            setDeleteDialogOpen(false);
            setInvoiceToDelete(null);
        }
    };

    // Format date
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return "$" + amount.toLocaleString();
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>

            {/* Search */}
            <div className="flex items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by client or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                    Total: {invoices.length} invoices
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Client Name</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">Paid</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedInvoices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No invoices found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedInvoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                                    <TableCell className="font-medium">{invoice.name}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                                    <TableCell>{formatDate(invoice.date)}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                invoice.isPaid
                                                    ? "bg-green-100 text-green-800 border-green-300"
                                                    : "bg-yellow-100 text-yellow-800 border-yellow-300"
                                            )}
                                        >
                                            {invoice.isPaid ? "Paid" : "Unpaid"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            checked={invoice.isPaid}
                                            onCheckedChange={() => handleTogglePaid(invoice.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(invoice)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Invoice</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete invoice <strong>{invoiceToDelete?.id}</strong> for {invoiceToDelete?.name}? This action cannot be undone.
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
        </div>
    );
}