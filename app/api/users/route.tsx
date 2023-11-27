import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Note:  although the request isn't used in the function, it is benefitial to include it to prevent caching
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(users);
}
