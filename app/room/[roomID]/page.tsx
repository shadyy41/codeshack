import ClientSide from './components/clientside'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

const verifyRoom = async ( roomID : string ) => {
  try{
    const room : any = await kv.get(roomID)
    if(!room) return "Invalid Room ID"
    if(!room.joinable) return "Room is not joinable"
    return ""
  }
  catch(e){
    return "Unable to Join Room"
  }
}

export default async function Room({ params }: { params: { roomID: string } }) {
  const verify : string = await verifyRoom(params.roomID)
  if(verify) redirect(`/?err=${verify}`)

  const session = await getServerSession(authOptions)
  //@ts-ignore
  const userid = session?.user?.id

  return (
    //@ts-expect-error
    <ClientSide/>
  )
}