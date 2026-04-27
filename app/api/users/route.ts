import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const session = await auth();
        if (!session){
            return NextResponse.json({message: "You are not Authorized"},{status:401})
        }
    try {
    const users = await prisma.user.findMany({orderBy:{name: 'asc'}});
    return NextResponse.json(users, {status:200});

    } catch (error){
        console.error('Error fetching issues:', error);
        return NextResponse.json({ users: [] }, { status: 500 });
    }

}