"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronsLeft,
  ChevronsUpDown,
  FolderOpen,
  LayoutGrid,
  ListChecks,
  type LucideIcon,
  Moon,
  MoreVertical,
  Plus,
  Settings,
  SquareKanban,
  Sun,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

/* ---------------------------------- data ---------------------------------- */

type NavItem = { title: string; url: string; icon: LucideIcon }

const NAV_ITEMS: NavItem[] = [
  { title: "Overview", url: "/overview", icon: LayoutGrid },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "My Tasks", url: "/my-tasks", icon: CheckCircle2 },
  { title: "Task Board", url: "/board", icon: SquareKanban },
  { title: "Calendar", url: "/calendar", icon: CalendarDays },
  { title: "Team Members", url: "/team", icon: Users },
  { title: "Reports & Analytics", url: "/reports", icon: BarChart3 },
  { title: "Forms", url: "/forms", icon: ListChecks },
]

const USER = {
  name: "Alex Morgan",
  role: "Product Lead",
  avatar: "/avatars/alex.jpg",
}

const hideWhenCollapsed = "group-data-[collapsible=icon]:hidden"

const navButton = cn(
  "h-9 gap-3 rounded-lg px-3 text-[14px] font-medium text-sidebar-foreground",
  "hover:bg-sidebar-accent hover:text-sidebar-foreground",
  "data-[active=true]:bg-indigo-50 data-[active=true]:text-indigo-600",
  "data-active:bg-indigo-50 data-active:text-indigo-600",
  "dark:data-[active=true]:bg-indigo-500/15 dark:data-[active=true]:text-indigo-300",
  "dark:data-active:bg-indigo-500/15 dark:data-active:text-indigo-300",
  "[&>svg]:size-[18px] [&>svg]:shrink-0",
  "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
)

/* ------------------------------- sub-components ---------------------------- */

function Logo() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <rect x="5" y="5" width="9" height="4" rx="1.5" />
        <rect x="5" y="10" width="14" height="4" rx="1.5" />
        <rect x="5" y="15" width="7" height="4" rx="1.5" />
      </svg>
    </div>
  )
}

function WorkspaceSwitcher() {
  const { isMobile } = useSidebar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
        <SidebarMenuButton
          tooltip="Acme Studio"
          className={cn(
            "h-11 gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/60 px-2.5",
            "hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent",
            "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
          )}
        />
        }
      >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-indigo-700 text-xs font-semibold text-white">
            A
          </span>
          <span className={cn("flex-1 truncate text-sm font-semibold", hideWhenCollapsed)}>
            Acme Studio
          </span>
          <span
            className={cn(
              "rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700",
              "dark:bg-indigo-500/20 dark:text-indigo-200",
              hideWhenCollapsed
            )}
          >
            Pro
          </span>
          <ChevronsUpDown className={cn("size-4 text-muted-foreground", hideWhenCollapsed)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg bg-card"
        side={isMobile ? "bottom" : "right"}
        align="start"
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
          <DropdownMenuItem>Acme Studio</DropdownMenuItem>
          <DropdownMenuItem>Northwind Labs</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="size-4" /> Add workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

function UserMenu() {
  const { isMobile } = useSidebar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
        <SidebarMenuButton
          tooltip={USER.name}
          className={cn(
            "h-12 gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/60 px-2.5",
            "hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent",
            "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
          )}
        />
        }
      >
          <Avatar className="size-8 shrink-0 rounded-md">
            <AvatarImage src={USER.avatar} alt={USER.name} />
            <AvatarFallback className="rounded-md bg-indigo-100 text-xs font-semibold text-indigo-700">
              AM
            </AvatarFallback>
          </Avatar>
          <span className={cn("grid flex-1 text-left leading-tight", hideWhenCollapsed)}>
            <span className="truncate text-sm font-semibold">{USER.name}</span>
            <span className="truncate text-xs text-muted-foreground">{USER.role}</span>
          </span>
          <MoreVertical className={cn("size-4 text-muted-foreground", hideWhenCollapsed)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg bg-card"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>{USER.name}</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ---------------------------------- sidebar -------------------------------- */

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  // Exact match, or a nested route under it (/projects/42 keeps "Projects" active)
  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/")

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Brand + collapse button */}
      <SidebarHeader className="gap-3 p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Logo />
          <span className={cn("text-[15px] font-semibold tracking-tight", hideWhenCollapsed)}>
            Flowspace
          </span>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
            className={cn(
              "ml-auto rounded-md p-1 text-muted-foreground transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-foreground",
              "focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none",
              hideWhenCollapsed
            )}
          >
            <ChevronsLeft className="size-4" />
          </button>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <WorkspaceSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-0">
        {/* Primary action */}
        <SidebarGroup className="pb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="New Issue / Task"
                className={cn(
                  "h-10 justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm",
                  "hover:bg-indigo-500 hover:text-white active:bg-indigo-700 active:text-white",
                  "dark:bg-indigo-500 dark:hover:bg-indigo-400",
                  "group-data-[collapsible=icon]:size-8!"
                )}
              >
                <Plus className="size-4" />
                <span className={hideWhenCollapsed}>New Issue / Task</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                    className={navButton}
                  >
                    <item.icon />
                    <span className={hideWhenCollapsed}>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Settings + profile */}
      <SidebarFooter className="gap-2 p-2 pb-4 group-data-[collapsible=icon]:px-0">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/settings" />}
              tooltip="Settings"
              isActive={isActive("/settings")}
              className={navButton}
            >
              <Settings />
              <span className={hideWhenCollapsed}>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Invisible hover strip on the edge: click to expand/collapse */}
      <SidebarRail />
    </Sidebar>
  )
}

export { ThemeToggle }