import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const categories = await prisma.category.findMany()
        
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching from categories.')
        return NextResponse.json({ error: 'Failed to load data.' }, { status: 500 })
    }
}