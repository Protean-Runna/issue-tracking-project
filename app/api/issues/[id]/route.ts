// Route for getting individual Issues
import {NextRequest,NextResponse } from "next/server";
import { IssueSchema } from "@/lib/ValidationSchemas";
import prisma from "@/lib/db";


export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    // TO DO: Fix this so that it can work with the IssueData Component
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
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
    }
    
    return NextResponse.json(uiIssue, {status:200});
    } catch (error) {
        console.error('Error fetching issue:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
 
};

export async function PATCH(request: NextRequest, {params}: {params: {id: string}}){
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    
    if (!validation.success){
        return NextResponse.json(validation.error.issues, {status:400})
    }
    try {
        const {id} = await params;
        const issueId = parseInt(id);

        const issue = prisma.issue.findUnique({
            where: {id: issueId}
        })
        if (!issue){
        return NextResponse.json({message: "Issue could not be found"}, {status:404})
        };

        const updatedIssue = await prisma.issue.update({
            where: { id: issueId},
            data: {
                title: body.title,
                description: body.description,
                updatedAt: new Date()
            }
            });
            return NextResponse.json(updatedIssue);
    } catch (error) {
        console.error('Error updating issue:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}

