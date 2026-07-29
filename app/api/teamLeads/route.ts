import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const teamLeads = await prisma.teamLead.findMany()
        
        return NextResponse.json(teamLeads)
    } catch (error) {
        console.error('Error fetching from teamLeads.')
        return NextResponse.json({ error: 'Failed to load data.' }, { status: 500 })
    }
}