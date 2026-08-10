"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Check, CheckCheck, Eye, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserAvatar } from "../user-avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ---------- Types ----------
type Notification = {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
};

// ---------- Mock Notifications ----------
const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "New comment on your task",
        message: "Alice commented on 'Design homepage wireframes'.",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
        id: "2",
        title: "Project status updated",
        message: "E-commerce Platform moved to 'In Progress'.",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
        id: "3",
        title: "Invoice payment received",
        message: "Invoice #INV-001 from Alice Johnson has been paid.",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
        id: "4",
        title: "New team member added",
        message: "David Brown joined the Web Development team.",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
];

// ---------- User Data ----------
const user = {
    imageUrl: "/next.svg",
    fullName: "Farnaz",
    emailAddresses: [{ emailAddress: "farnaz.bina99@gmail.com" }],
};

// ---------- Notification Item Component ----------
function NotificationItem({
    notification,
    onMarkAsRead,
}: {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
}) {
    const timeAgo = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div
            className={cn(
                "flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-muted/50 relative",
                !notification.read && "bg-muted/30"
            )}
        >
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">{notification.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                    {timeAgo(notification.createdAt)}
                </p>
            </div>
            {!notification.read && (
                <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Mark as read"
                >
                    <Check className="h-4 w-4" />
                </button>
            )}
            {notification.read && (
                <div className="shrink-0 text-muted-foreground/30">
                    <CheckCheck className="h-4 w-4" />
                </div>
            )}
        </div>
    );
}

// ---------- Notifications Dropdown ----------
function NotificationsDropdown() {
    const [notifications, setNotifications] =
        useState<Notification[]>(mockNotifications);
    const [open, setOpen] = useState(false);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const handleMarkAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleMarkAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0" sideOffset={8}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto px-2 py-1 text-xs"
                            onClick={handleMarkAllRead}
                        >
                            <CheckCheck className="mr-1 h-3.5 w-3.5" />
                            Mark all read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm p-4">
                            <Bell className="h-8 w-8 mb-2 opacity-30" />
                            <p>No notifications</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={handleMarkAsRead}
                                />
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t">
                    <Link
                        href="/notifications"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full py-1"
                        onClick={() => setOpen(false)}
                    >
                        <Eye className="h-4 w-4" />
                        View all notifications
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// ---------- Main Header ----------
export default function Header() {
    return (
        <header className="sticky top-0 z-10 flex justify-between items-center bg-background-layout border-b border-solid border-border py-5 px-4 md:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-xl font-medium hidden sm:block">Hello Farnaz</h1>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <NotificationsDropdown />
                <UserAvatar user={user} />
            </div>
        </header>
    );
}