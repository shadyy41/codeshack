import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  try{
    const { roomId } = await request.json()
    if(!roomId) return NextResponse.json({ message: "No room ID" }, { status: 400 })
    const room : any = await kv.get(roomId)
    if(!room) return NextResponse.json({ message: "Invalid room ID" }, { status: 400 })
    if(!room.joinable) return NextResponse.json({ message: "Room cannot be joined" }, { status: 400 })
    return NextResponse.json({ message: "Success" }, { status: 200 })
  }
  catch(e){
    console.log(e, "Error in verifying room")
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 })
  }
}