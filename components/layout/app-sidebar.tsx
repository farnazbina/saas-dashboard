'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, ChartBar, FolderKanban, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AppSidebar() {
    const pathName = usePathname()

    const menu = [
        {
            text: 'Dashboard',
            link: '/dashboard/overview',
            icon: <LayoutDashboard />
        },
        {
            text: 'Analytics',
            link: '/dashboard/analytics',
            icon: <ChartBar />
        },
        {
            text: 'Projects',
            link: '/dashboard/projects',
            icon: <FolderKanban />
        },
        {
            text: 'Teams',
            link: '/dashboard/teams',
            icon: <Users />
        }
    ]
    return (
        <Sidebar className="py-6 px-4 bg-white">
            <SidebarHeader className="bg-white">
                <Link href='/dashboard/overview' className="text-lg font-semibold">Dreams <span className="text-primary">Dashboard</span></Link>
            </SidebarHeader>
            <SidebarContent className="bg-white pt-4">
                <SidebarGroup>
                    <SidebarMenu className="gap-y-1">
                        {menu.map((item, index) => {
                            const isActive = pathName === item.link
                            return(
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton
                                    className={`h-12 w-full gradient-hover hover:text-white duration-300 transition-colors ${isActive ? 'active' : ''}`}
                                >
                                    <Link href={item.link} className="h-full w-full cursor-pointer flex items-center gap-4 text-base font-medium">
                                        {item.icon}
                                        {item.text}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )})}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-white">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="h-12">
                            Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}