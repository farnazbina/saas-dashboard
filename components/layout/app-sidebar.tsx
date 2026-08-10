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
import { LayoutDashboard, SquareKanban, FolderKanban, Users, Settings, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AppSidebar() {
    const pathName = usePathname()

    const menu = [
        {
            text: 'Dashboard',
            link: '/overview',
            icon: <LayoutDashboard />
        },
        {
            text: 'Projects',
            link: '/projects',
            icon: <FolderKanban />
        },
        {
            text: 'Clients',
            link: '/clients',
            icon: <Users />
        },
        {
            text: 'Tasks',
            link: '/tasks',
            icon: <SquareKanban />
        },
        {
            text: 'Invoices',
            link: '/invoices',
            icon: <Wallet />
        },
        {
            text: 'Teams',
            link: '/teams',
            icon: <Users />
        },
        {
            text: 'Settings',
            link: '/settings',
            icon: <Settings />
        }
    ]
    return (
        <Sidebar className="py-6 px-4 bg-background hidden lg:flex">
            <SidebarHeader className="bg-background">
                <Link href='/dashboard/overview' className="text-lg font-semibold">Dreams <span className="text-primary">Dashboard</span></Link>
            </SidebarHeader>
            <SidebarContent className="bg-background pt-4">
                <SidebarGroup>
                    <SidebarMenu className="gap-y-1">
                        {menu.map((item, index) => {
                            const isActive = pathName === item.link
                            return(
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton
                                    className={`h-11 w-full gradient-hover text-text hover:text-white duration-300 transition-colors ${isActive ? 'active' : ''}`}
                                >
                                    <Link href={item.link} className="h-11 w-full text-text cursor-pointer flex items-center gap-x-4 text-[16px] font-regular">
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