import {NextResponse } from "next/server";

import prisma from "@/lib/db";
import { auth } from "@/auth";



export async function GET() {

     const session = await auth();
            if (!session){
                return NextResponse.json({message: "You are not Authorized"},{status:401})
    }

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
        createdAt: i.createdAt.toDateString(),
        updatedAt: i.updatedAt.toDateString(),
    }))
    return NextResponse.json(uiIssues, {status:200});
    } catch (error) {
        console.error('Error fetching issues:', error);
        return NextResponse.json({ issues: [] }, { status: 500 });
    }
 
}



