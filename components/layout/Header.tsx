// 'use client'

import { ThemeToggle } from "./theme-toggle"
import { UserAvatar } from "../user-avatar"

const user = {
    imageUrl: '/next.svg',
    fullName: 'Farnaz',
    emailAddresses: [{ emailAddress: 'farnaz.bina99@gmail.com' }]
}

export default function Header() {
    return (
        <div className="flex justify-between items-center border-b border-solid border-chart-1 pb-5">
            <h1 className="text-xl font-medium">Hello Farnaz</h1>
            <div className="flex items-center justify-end gap-4">
                <ThemeToggle />
                <div className="relative">
                    <UserAvatar user={user} />
                </div>
            </div>
        </div>
    )
}