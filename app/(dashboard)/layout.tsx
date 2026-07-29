import AppSidebar from "@/components/layout/app-sidebar"
import Header from "@/components/layout/Header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col gap-6 py-6 px-8 bg-background-layout">
                <Header />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}