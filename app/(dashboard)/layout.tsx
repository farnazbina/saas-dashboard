// app/dashboard/layout.tsx
import { ThemeProvider } from "next-themes"

import { AppSidebar, ThemeToggle } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-[#F6F6FD] dark:bg-[#0E0E16]">
          {/* Top bar: the trigger is how you re-expand from the icon rail (Ctrl/Cmd + B also works) */}
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger aria-label="Toggle sidebar" />
            <h1 className="text-sm font-medium">Overview Dashboard</h1>
            <ThemeToggle className="ml-auto" />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}