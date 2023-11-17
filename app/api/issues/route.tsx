import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  // console.log("hit issues Post route");
  const body = await request.json();
  // console.log("body:", body);
  const validation = createIssueSchema.safeParse(body);
  // console.log("validation object", validation.error);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
