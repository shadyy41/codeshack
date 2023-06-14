"use client";
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import Divider from "@/app/components/divider"
import { TailSpin } from "react-loader-spinner"
import PreviewModal from "./previewmodal"

const ClientSide = ({ name="Anonymous" } : { name: string | undefined | null }) => {
  const room = !useSearchParams().has('room') ? "" : useSearchParams().get('room')
  const router = useRouter()
  const [name_s, setName_s] = useState(name)
  const [roomId, setRoomId] = useState(room)
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const joinRoom = async () => {
    if(!roomId){
      toast.error("Enter a room ID")
      return
    }
    setLoading(true)

    try {
      const body = JSON.stringify({roomId})
      const res = await fetch("/api/room/verify", {method: "POST", body})
      if(res.status!==200) throw new Error()
      const data = await res.json()
      if(!data) throw new Error()
      console.log(data)
      // router.push(`/room/${data.roomId}`)
    } catch (error) {
      toast.error("Failed to join room")
    }
    finally{
      setLoading(false)
    }
  }
  
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* @ts-ignore */}
        <input type="text" placeholder="Join as" value={name_s} onChange={e=>setName_s(e.target.value)} className="text-sm sm:text-base w-full text-slate-300 py-3 px-4 rounded-md border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm"/>
        {/* @ts-ignore */}
        <input type="text" placeholder="Enter Room ID" value={roomId} onChange={e=>setRoomId(e.target.value)} className="text-sm sm:text-base w-full text-slate-300 py-3 px-4 rounded-md border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm"/>
        <button className={`text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm ${isLoading ? 'cursor-progress' : ''}`} onClick={()=>setIsOpen(true)} disabled={isLoading}>
          Preview Video
        </button>
      </div>
      <Divider text="Ready to Join?"/>
      {isOpen && <PreviewModal isOpen={isOpen} setIsOpen={setIsOpen} joinRoom={joinRoom} isLoading={isLoading}/>}
      <button className={`text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm ${isLoading ? 'cursor-progress' : ''} flex items-center justify-center`} onClick={joinRoom} disabled={isLoading}>
        {isLoading ? <TailSpin height={24} width={24} color="white"/> : 'Join Room'}
      </button>
    </>
  )
}

export default ClientSide