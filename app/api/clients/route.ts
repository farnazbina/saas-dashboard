import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const clients = await prisma.client.findMany()
        
        return NextResponse.json(clients)
    } catch (error) {
        console.error('Error fetching from clients.')
        return NextResponse.json({ error: 'Failed to load data.' }, { status: 500 })
    }
}