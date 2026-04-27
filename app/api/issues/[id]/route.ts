// Route for getting individual Issues
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema, PatchIssueSchema } from "@/lib/ValidationSchemas";
import prisma from "@/lib/db";
import { Prisma } from "@/app/generated/prisma/client";
import { auth } from "@/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
        if (!session){
            return NextResponse.json({message: "You are not Authorized"},{status:401})
    }
  try {
    const { id } = await params;
    const issueId = parseInt(id);
    if (isNaN(issueId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      return NextResponse.json(
        { message: "Issue could not be found" },
        { status: 404 },
      );
    }

    const uiIssue = {
      ...issue,
      status: issue.status.toUpperCase(),
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
    };

    return NextResponse.json(uiIssue, { status: 200 });
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session){
      return NextResponse.json({message: "You are not Authorized"},{status:401})
  }
  const body = await request.json();
  const validation = PatchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }
  const {assignedToUserId, title, description, status} = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({ where: {id: assignedToUserId}});
    if (!user) return NextResponse.json({error: 'Invalid User'}, {status:400})
  }
  try {
    const { id } = await params;
    const issueId = parseInt(id);
    if (isNaN(issueId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const issue = prisma.issue.findUnique({
      where: { id: issueId },
    });
    if (!issue) {
      return NextResponse.json(
        { message: "Issue could not be found" },
        { status: 404 },
      );
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: issueId },
      data: {
        title: title,
        description: description,
        status: status,
        updatedAt: new Date(),
        assignedToUserId: assignedToUserId
      },
    });
    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
    if (!session){
        return NextResponse.json({message: "You are not Authorized"},{status:401})
    }
  try {
    const { id } = await params;
    const issueId = parseInt(id);
    if (isNaN(issueId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await prisma.issue.delete({
      where: { id: issueId },
    });

    return NextResponse.json(
      { message: `Issue ${issueId} has been deleted` },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }
    console.error("Error deleting issue:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
