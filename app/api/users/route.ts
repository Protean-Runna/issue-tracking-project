import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
    const users = await prisma.user.findMany({orderBy:{name: 'asc'}});
    return NextResponse.json(users, {status:200});

    } catch (error){
        console.error('Error fetching issues:', error);
        return NextResponse.json({ users: [] }, { status: 500 });
    }

}