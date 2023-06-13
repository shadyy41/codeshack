import { createClient } from '@vercel/kv'
import { NextResponse } from 'next/server'
 
export async function GET() {
  const roomClient = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })
  console.log("????")
  try{
    const obj = {
      creator: 'creatorid',
      roomId: 'roomid',
      joinable: true
    }
    const str = JSON.stringify(obj)
    console.log(str)
    await roomClient.set('example-room-id', str)
    const room = await roomClient.get('example-room-id')
    console.log(room)
    return NextResponse.json({ room })
  }
  catch(e){
    console.log(e, "Error")
    return NextResponse.json({ mesage: "Error" }, {status: 404})
  }
}