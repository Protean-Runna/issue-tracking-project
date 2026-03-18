import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { IssueSchema } from "@/lib/ValidationSchemas";
import { auth } from "@/auth";



export async function POST(req:NextRequest) {
    const session = await auth();
    if (!session){
        return NextResponse.json({message: "You are not Authorized"},{status:401})
    }
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