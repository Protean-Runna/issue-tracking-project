// Route for getting individual Issues
import {NextRequest,NextResponse } from "next/server";

import prisma from "@/lib/db";



export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {

    try {
        const {id} = await params;
        const issueId = parseInt(id);
        if (isNaN(issueId)){
            return NextResponse.json({message:"Invalid ID"},{status: 400})
        };
    const issue = await prisma.issue.findUnique({       
        where : {id: issueId},
    });


    if (!issue){
        return NextResponse.json({message: "Issue could not be found"}, {status:404})
    };
    
    const uiIssue = {
        ...issue,
        status: issue.status.toUpperCase(),
        createdAt: issue.createdAt.toDateString(),
        updatedAt: issue.updatedAt.toDateString(),
    }
    
    return NextResponse.json(uiIssue, {status:200});
    } catch (error) {
        console.error('Error fetching issue:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
 
}
