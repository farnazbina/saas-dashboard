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
            <SidebarInset className="flex flex-col gap-6 p-4">
                <Header />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}