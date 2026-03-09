// Route for getting individual Issues
import {NextRequest,NextResponse } from "next/server";

import prisma from "@/lib/db";
import { Issue } from "@/app/generated/prisma/client";


export async function GET(request: Request, {params}: {params: Promise<{id: number}>}) {
    const id = parseInt((await params).id.toString());

    if (!id){
        return NextResponse.json({
            error: "No ID Provided"
        }, {status:400})
    }
    try {
    const issue: Issue | null = await prisma.issue.findUnique({
        where : {id: id},
        

    });
    
    return NextResponse.json(issue, {status:200});
    } catch (error) {
        console.error('Error fetching issue:', error);
        return NextResponse.json({ message: "Issue could not be found" }, { status: 404 });
    }
 
}
