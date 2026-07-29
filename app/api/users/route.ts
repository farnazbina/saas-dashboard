import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const users = await prisma.user.findMany()
        
        return NextResponse.json(users)
    } catch (error) {
        console.error('Error fetching from categories.')
        return NextResponse.json({ error: 'Failed to load data.' }, { status: 500 })
    }
}