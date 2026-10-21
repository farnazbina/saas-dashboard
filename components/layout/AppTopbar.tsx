"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronRight, CircleHelp, Plus, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "./app-sidebar"

const titleCase = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

export function AppTopbar() {
  const pathname = usePathname()
  // "/dashboard/projects" -> "Projects" (adjust if your routes differ)
  const segments = pathname.split("/").filter(Boolean).filter((s) => s !== "dashboard")
  const crumbs = segments.length ? segments.map(titleCase) : ["Overview"]

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-4 md:px-6">
      <SidebarTrigger aria-label="Toggle sidebar" />

      <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Acme Studio</Link>
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 text-muted-foreground" aria-hidden />
            <span className={i === crumbs.length - 1 ? "truncate font-semibold" : "text-muted-foreground"}>{c}</span>
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Button variant="outline" size="sm" className="hidden w-56 justify-start gap-2 bg-card font-normal text-muted-foreground md:flex lg:w-72">
          <Search className="size-4" />
          Search anything…
          <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
          <Search className="size-4" />
        </Button>

        <Button size="icon" className="size-8 bg-brand text-white hover:bg-brand/90" aria-label="Create new">
          <Plus className="size-4" />
        </Button>

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger ring-2 ring-background" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Help">
          <CircleHelp className="size-4" />
        </Button>
        <ThemeToggle />

        <Avatar className="size-8">
          <AvatarImage src="/avatars/alex.jpg" alt="Alex Morgan" />
          <AvatarFallback className="bg-brand-soft text-xs font-semibold text-brand-ink">AM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}