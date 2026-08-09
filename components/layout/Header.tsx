// 'use client'

import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserAvatar } from "../user-avatar"

const user = {
    imageUrl: '/next.svg',
    fullName: 'Farnaz',
    emailAddresses: [{ emailAddress: 'farnaz.bina99@gmail.com' }]
}

export default function Header() {
    return (
        <div className="sticky top-0 z-10 flex justify-between items-center bg-background-layout border-b border-solid border-chart-1 py-5">
            <SidebarTrigger />
            <h1 className="text-xl font-medium">Hello Farnaz</h1>
            <div className="flex items-center justify-end gap-4">
                {/* <ThemeToggle /> */}
                <div className="relative">
                    <UserAvatar user={user} />
                </div>
            </div>
        </div>
    )
}