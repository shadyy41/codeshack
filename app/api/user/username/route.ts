import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '@/app/lib/prismaclient'
import { revalidatePath } from 'next/cache'
 
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if(!session) return NextResponse.json({message: "Unauthenticated"}, {status: 401})
  const userId = session?.user?.id
  const isPremium = session?.user?.isPremium
  if(!isPremium) return NextResponse.json({message: "Unauthorized"}, {status: 403})
  const { username } = await request.json()

  if(!username || !username.length || username.length>20) return NextResponse.json({message: "Bad username"}, {status: 400})

  await prisma.user.update({
    where: { id: userId },
    data: { name: username }
  })
  
  revalidatePath('/')
  return NextResponse.json({status: 200})
}