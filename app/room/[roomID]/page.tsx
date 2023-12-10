import ClientSide from './components/clientside'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'
import { customAlphabet } from 'nanoid/non-secure'
//@ts-ignore
import { getOccupants } from "trystero/firebase"
import type { User } from "./components/clientside"

export const metadata = {
  title: 'Room',
}

const verifyRoom = async ( roomID : string ) => {
  try{
    const room : { creator: string, joinable: boolean, limit: number } | null = await kv.get(roomID)
    if(!room) return { message: "Invalid Room ID", success: false }
    if(!room.joinable) return { message: "Room is not joinable", success: false }

    return  { room, success: true }
  }
  catch(e){
    return { message: "Unable to Join Room", success: false }
  }
}

export default async function Room({ params }: { params: { roomID: string } }) {
  const res : any = await verifyRoom(params.roomID)
  const nanoid = customAlphabet('123456789', 4)

  if(!res.success){
    redirect(`/?err=${res.message}`)
  }

  const occupants = await getOccupants({ appId: process.env.NEXT_PUBLIC_FIREBASE_URL }, params.roomID)
  if(occupants.length===res.room.limit){
    redirect("/?err=Room Full")
  }
  
  let session : Session | null = await getServerSession(authOptions)
  const userid = session ? session.user?.id : ""

  const user : User = (session && session.user) ? {
    email: session.user.email as string,
    image: session.user.image as string,
    name: session.user.name as string,
    creator: userid===res.room.creator
  } : 
  {
    email: "Guest",
    image: "/default-user.png",
    name: `Anon-${nanoid()}`,
    creator: false
  }

  return (
    <ClientSide user={user}/>
  )
}