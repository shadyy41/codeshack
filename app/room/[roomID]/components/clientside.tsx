"use client";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import LeftPanel from "./leftpanel"
import RightPanel from "./rightpanel"
import CenterPanel from "./centerpanel"
import { Room, joinRoom } from "trystero"
import { toast } from "react-hot-toast"

const ClientSide = ( { session } : any ) => {
  const userid = session?.user?.id
  const email = session?.user?.email
  const image = session?.user?.image
  const name = session?.user?.name
  const user = {
    userid, email, image, creator: false, name, peerID: "12345"
  }

  const { roomID } = useParams()

  const roomRef = useRef<Room>()
  const [peersInfo, setPeersInfo] = useState([user])
  const infoActionRef = useRef<any>()

  useEffect(()=>{
    const config = {appId: 'codeshack_shady41'}
    roomRef.current = joinRoom(config, roomID)
    infoActionRef.current = roomRef.current.makeAction('drink')

    infoActionRef.current[1]((data: any, peerID: string) => {
      data.peerID = peerID
      setPeersInfo([...peersInfo, data])
    })

    roomRef.current.onPeerJoin((peerID)=>{
      infoActionRef.current[0](user, peerID)
      console.log(`${peerID} joined`)
    })
    roomRef.current.onPeerLeave((peerID)=>{
      setPeersInfo(peersInfo.filter(p=>p.peerID!==peerID))
      console.log(`${peerID} left`)
    })

    return ()=>{
      roomRef.current?.leave()
    }
  }, [])

  useEffect(()=>{
    console.log(peersInfo)
  }, [peersInfo])

  return (
    <div className="w-full flex items-center justify-center p-2 gap-2 h-full">
      <LeftPanel/>
      <CenterPanel/>
      <RightPanel roomID={roomID} peersInfo={peersInfo}/>
    </div>
  )
}

export default ClientSide


{/* <div className="h-full w-full border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 bg-neutral-950">
        <ClientSide/>
      </div> */}