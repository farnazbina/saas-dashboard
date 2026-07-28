import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const clients = await prisma.user.findMany()

        return NextResponse.json({ clients })
    } catch (error) {
        console.error('Error fetching from categories.')
        return NextResponse.json({ error: 'Failed to load data.' }, { status: 500 })
    }
}