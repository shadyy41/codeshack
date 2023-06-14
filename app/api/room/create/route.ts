import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { nanoid } from 'nanoid'
import { authOptions } from '../../auth/[...nextauth]/route'
 
export async function GET() {
  const session = await getServerSession(authOptions)
  if(!session) return NextResponse.json({message: "Unauthenticated"}, {status: 401})
  //@ts-ignore
  const userId = session?.user?.id
  const roomId = nanoid(12)

  try{
    const obj = {
      creator: userId,
      joinable: true
    }
    const str = JSON.stringify(obj)
    await kv.set(roomId, str)
    const room = await kv.get(roomId)
    console.log(room)
    return NextResponse.json({ message: "Created Successfully", roomId})
  }
  catch(e){
    console.log(e, "Error in room creation")
    return NextResponse.json({ mesage: "Could Not Create Room" }, {status: 500})
  }
}