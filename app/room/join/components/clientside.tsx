"use client";
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Divider from "@/app/components/divider"
import PreviewModal from "./previewmodal"
import JoinButton from "./joinbutton"

const ClientSide = ({ name="Anonymous" } : { name: string | undefined | null }) => {
  const room = !useSearchParams().has('roomID') ? "" : useSearchParams().get('roomID')
  const [name_s, setName_s] = useState(name)
  const [roomID, setRoomID] = useState(room)
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* @ts-ignore */}
        <input type="text" placeholder="Join as" value={name_s} onChange={e=>setName_s(e.target.value)} className="text-sm sm:text-base w-full text-slate-300 py-3 px-4 rounded-md border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm"/>
        {/* @ts-ignore */}
        <input type="text" placeholder="Enter Room ID" value={roomID} onChange={e=>setRoomID(e.target.value)} className="text-sm sm:text-base w-full text-slate-300 py-3 px-4 rounded-md border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm" onSubmit={()=>setLoading(true)}/>
        <button className="text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm" onClick={()=>setIsOpen(true)}>
          Preview Video
        </button>
      </div>
      <Divider text="Ready to Join?"/>
      {isOpen && <PreviewModal isOpen={isOpen} setIsOpen={setIsOpen} roomID={roomID}/>}
      <JoinButton roomID={roomID}/>
    </>
  )
}

export default ClientSide