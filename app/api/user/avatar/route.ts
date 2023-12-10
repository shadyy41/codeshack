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
  const { userimage } = await request.json()

  await prisma.user.update({
    where: { id: userId },
    data: { image: userimage }
  })
  
  revalidatePath('/')
  return NextResponse.json({status: 200})
}