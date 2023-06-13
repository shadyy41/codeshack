import { kv } from '@vercel/kv'
import { nanoid } from 'nanoid'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Room() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const userid = session?.user?.id

  async function CreateRoom() {
    try{
      const obj = {
        creator: userid,
        roomId: nanoid(12),
        joinable: true
      }
      const str = JSON.stringify(obj)
      console.log()
      // await kv.set('example-room-id', str)
      // const room = await kv.get('example-room-id')
      // console.log(room, "Hain?")
    }
    catch(e){
      console.log(e, "Error")
    }
  }

  await CreateRoom()

  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-sm border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 bg-neutral-950">
        <h1>Room</h1>
      </div>
    </div>
  )
}