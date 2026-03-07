import {NextResponse } from "next/server";

import prisma from "@/lib/db";



export async function GET() {

    try {
    const issues = await prisma.issue.findMany({
        select:{
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: {createdAt: 'desc'},
    });
    const uiIssues = issues.map((i) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        status: i.status.toUpperCase(),
        createdAt: i.createdAt.toLocaleString(),
        updatedAt: i.updatedAt.toLocaleString(),
    }))
    return NextResponse.json(uiIssues, {status:200});
    } catch (error) {
        console.error('Error fetching issues:', error);
        return NextResponse.json({ issues: [] }, { status: 500 });
    }
 
}



