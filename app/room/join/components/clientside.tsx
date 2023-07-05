"use client";
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Divider from "@/app/components/divider"
import PreviewModal from "./previewmodal"
import JoinButton from "./joinbutton"
import { toast } from "react-hot-toast";

const ClientSide = ({ name="Anonymous" } : { name: string | undefined | null }) => {
  const room = !useSearchParams().has('roomID') ? "" : useSearchParams().get('roomID')
  const [roomID, setRoomID] = useState(room)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    if(!roomID){
      setRoomID("vzGGM17ygbZz")
      toast("Added public room ID")
    }
  }, [roomID])
  
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* @ts-ignore */}
        <input type="text" placeholder="Enter Room ID" value={roomID} onChange={e=>setRoomID(e.target.value)} className="text-sm w-full text-slate-300 py-3 px-4 rounded border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm" onSubmit={()=>setLoading(true)}/>
        <JoinButton roomID={roomID}/>
      </div>
      <Divider/>
      {isOpen && <PreviewModal isOpen={isOpen} setIsOpen={setIsOpen} roomID={roomID}/>}
      <button className="text-sm py-3 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm" onClick={()=>setIsOpen(true)}>
        Preview Video
      </button>
    </>
  )
}

export default ClientSide