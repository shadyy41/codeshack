import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismaclient"

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  return NextResponse.json({ hello: "world" });
}
