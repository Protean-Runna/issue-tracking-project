import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { IssueSchema } from "@/lib/ValidationSchemas";


export async function POST(req:NextRequest) {
    //console.log(req);
    const body = await req.json();
    
    
    const validation = IssueSchema.safeParse(body);

    if (!validation.success){
        return NextResponse.json(validation.error.issues, {status:400})
    }
        

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description, status: body.status},

    })

    return NextResponse.json(newIssue, {status:201});
}