import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                category: true,
                client: true,
                teamLead: true,
                member: true,
            },
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(projects)
    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
    }
}