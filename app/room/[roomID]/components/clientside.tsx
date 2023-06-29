"use client";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import CenterPanel from "./centerpanel"
//@ts-ignore
import { Room, joinRoom } from "trystero/firebase"
import { toast } from "react-hot-toast"
import MessagePanel from "./messagepanel";
import UsersPanel from "./userspanel";

export type User = {
  email: string, image: string, name: string, creator: boolean
}
export type Message = {
  data: string, username: string, timestamp: string, you: boolean
}

const ClientSide = ( { user } : { user: User} ) => {
  const { roomID } = useParams()

  const roomRef = useRef<Room>()
  const [peersInfo, setPeersInfo] = useState<Array<any>>([])
  const [sidepanel, setSidepanel] = useState<number>(1) // 0 1 2 => 0 = disabled
  const [messages, setMessages] = useState<Array<Message>>([])
  const infoActionRef = useRef<any>()
  const messageActionRef = useRef<any>()

  useEffect(()=>{
    roomRef.current = joinRoom({ appId: process.env.NEXT_PUBLIC_FIREBASE_URL }, roomID)
    infoActionRef.current = roomRef.current.makeAction('peerInfo')
    messageActionRef.current = roomRef.current.makeAction('message')

    infoActionRef.current[1]((data: any, peerID: string) => { /* info action receiver */
      data.peerID = peerID
      setPeersInfo((peersInfo)=>[...peersInfo, data])
      toast(`${data.name} joined the room`)
    })

    messageActionRef.current[1]((message: Message)=>{  /* message action receiver */
      setMessages((messages)=>[message, ...messages])
    })

    roomRef.current.onPeerJoin((peerID:string)=>{
      infoActionRef.current[0](user, peerID) /* info action sender */
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

  const handleMessage = ( data: string ) => {
    const obj = new Date()
    const timestamp: string = obj.getHours().toString() + ":" + obj.getMinutes().toString()
    const message: Message = {
      data,
      username: user.name,
      timestamp,
      you: true
    }
    setMessages((messages)=>[message, ...messages])
    messageActionRef.current[0]({...message, you: false}) /* message action sender */
  }

  return (
    <div className="w-full flex items-center justify-center p-2 gap-2 h-full">
      <CenterPanel sidepanel={sidepanel} setSidepanel={setSidepanel}/>
      <UsersPanel roomID={roomID} peersInfo={peersInfo} user={user} setSidepanel={setSidepanel} sidepanel={sidepanel}/>
      <MessagePanel roomID={roomID} peersInfo={peersInfo} user={user} setSidepanel={setSidepanel} sidepanel={sidepanel} messages={messages} handleMessage={handleMessage}/>
    </div>
  )
}

export default ClientSide