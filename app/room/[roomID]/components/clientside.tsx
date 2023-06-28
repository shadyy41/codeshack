"use client";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import LeftPanel from "./leftpanel"
import RightPanel from "./rightpanel"
import CenterPanel from "./centerpanel"
//@ts-ignore
import { Room, joinRoom } from "trystero/firebase"
import { toast } from "react-hot-toast"

export type User = {
  email: string, image: string, name: string, creator: boolean
}

const ClientSide = ( { user } : { user: User} ) => {
  const { roomID } = useParams()

  const roomRef = useRef<Room>()
  const [peersInfo, setPeersInfo] = useState<Array<any>>([])
  const infoActionRef = useRef<any>()

  useEffect(()=>{
    roomRef.current = joinRoom({ appId: process.env.NEXT_PUBLIC_FIREBASE_URL }, roomID)
    infoActionRef.current = roomRef.current.makeAction('peerInfo')

    infoActionRef.current[1]((data: any, peerID: string) => { /* action receiver */
      data.peerID = peerID
      setPeersInfo((peersInfo)=>[...peersInfo, data])
      toast(`${data.name} joined the room`)
    })

    roomRef.current.onPeerJoin((peerID:string)=>{
      infoActionRef.current[0](user, peerID) /* action sender */
    })

    return ()=>{
      roomRef.current?.leave()
    }
  }, [])

  useEffect(()=>{
    if(!roomRef.current) return
    roomRef.current.onPeerLeave((peerID:string)=>{
      let peer = peersInfo.find(p=>p.peerID===peerID)
      setPeersInfo((peersInfo)=>peersInfo.filter(p=>p.peerID!==peerID))
      if(peer) toast(`${peer.name} left the room`)
    })
  }, [peersInfo, roomRef.current])

  return (
    <div className="w-full flex items-center justify-center p-2 gap-2 h-full">
      <LeftPanel/>
      <CenterPanel/>
      <RightPanel roomID={roomID} peersInfo={peersInfo} user={user}/>
    </div>
  )
}

export default ClientSide