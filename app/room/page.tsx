import { createClient } from '@vercel/kv'

export default async function Room() {
  
  async function test() {
    const roomClient = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
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
    }
    catch(e){
      console.log(e, "Error")
    }
  }

  await test()

  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-sm border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 bg-neutral-950">
        <h1>Room</h1>
      </div>
    </div>
  )
}