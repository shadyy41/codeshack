"use client";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import CenterPanel from "./centerpanel"
//@ts-ignore
import { Room, joinRoom } from "trystero/firebase"
import { toast } from "react-hot-toast"
import MessagePanel from "./messagepanel"
import UsersPanel from "./userspanel"
import Sidebar from "./sidebar"
import useRoomStore from "@/app/lib/roomstore"
import { languages } from "@/app/lib/languagelist"

export type User = {
  email: string, image: string, name: string, creator: boolean
}
export type Message = {
  data: string, username: string, timestamp: string, you: boolean
}
export type PeerStreamData = {
  stream: any, name: string, peerID: string
}
export type PeerAudioData = {
  stream: any, peerID: string
}

const ClientSide = ( { user } : { user: User} ) => {
  const { roomID } = useParams()
  const roomRef = useRef<Room>()
  const [peersInfo, setPeersInfo] = useState<Array<any>>([])

  const peerCamStreams = useRoomStore((s:any)=>s.peerCamStreams)
  const setPeerCamStreams = useRoomStore((s:any)=>s.setPeerCamStreams)

  const peerMicStreams = useRoomStore((s:any)=>s.peerMicStreams)
  const setPeerMicStreams = useRoomStore((s:any)=>s.setPeerMicStreams)

  const [messages, setMessages] = useState<Array<Message>>([])

  const userVideo = useRoomStore((s:any)=>s.userVideo)
  const setUserVideo = useRoomStore((s:any)=>s.setUserVideo)

  const userAudio = useRoomStore((s:any)=>s.userAudio)
  const setUserAudio = useRoomStore((s:any)=>s.setUserAudio)

  const lang = useRoomStore((s:any)=>s.lang)
  const setLang = useRoomStore((s:any)=>s.setLang)

  const langAction = useRoomStore((s:any)=>s.langAction)
  const setLangAction = useRoomStore((s:any)=>s.setLangAction)

  const outputAction = useRoomStore((s:any)=>s.outputAction)
  const setOutputAction = useRoomStore((s:any)=>s.setOutputAction)

  const output = useRoomStore((s:any)=>s.output)
  const setOutput = useRoomStore((s:any)=>s.setOutput)

  const setUserData = useRoomStore((s:any)=>s.setUserData)

  const infoActionRef = useRef<any>()
  const messageActionRef = useRef<any>()
  const streamRemovedActionRef = useRef<any>()
  const timeRef = useRef<any>()

  useEffect(()=>{
    setUserData(user)
  }, [user])

  useEffect(()=>{
    timeRef.current = Date.now()
    roomRef.current = joinRoom({ appId: process.env.NEXT_PUBLIC_FIREBASE_URL }, roomID)

    infoActionRef.current = roomRef.current.makeAction('peerInfo')
    messageActionRef.current = roomRef.current.makeAction('message')
    streamRemovedActionRef.current = roomRef.current.makeAction('sr')
    setLangAction(roomRef.current.makeAction('lang'))
    setOutputAction(roomRef.current.makeAction('op'))


    infoActionRef.current[1]((data: any, peerID: string) => { /* info action receiver */
      const peer = {...data.user, peerID}
      setPeersInfo((peersInfo)=>[...peersInfo, peer])
      if(data.time>=timeRef.current){
        toast(`${peer.name} joined the room`)
      }
    })

    messageActionRef.current[1]((message: Message)=>{  /* message action receiver */
      setMessages((messages)=>[message, ...messages])
    })

    return ()=>{
      roomRef.current?.leave()
      setPeerCamStreams([]) /* cleanup as it is a global state */
      setPeerMicStreams([])
      setLang(languages[0])
      setOutput("")
    }
  }, [])

  useEffect(()=>{
    if(!langAction) return
    langAction[1]((data: any, peerID: string) => { /* lang action receiver */
      const { name, langObj, onJoin, time } = data
      if(time && time>timeRef.current) return /* new user will also emit onpeerjoin */

      if(langObj.name===lang.name) return /* when a user joins late, all the peers will send the current language */
      setLang(langObj)
      if(!onJoin) toast(`${name} changed the language to ${langObj.name}`)
    })
  }, [lang, langAction])

  useEffect(()=>{
    if(!outputAction) return
    outputAction[1]((data: any, peerID: string) => { /* output action receiver */
      const { result } = data
      console.log(result)
      setOutput(result)
    })
  }, [output, outputAction])

  useEffect(()=>{
    if(!langAction) return
    roomRef.current.onPeerJoin((peerID:string)=>{
      infoActionRef.current[0]({user, time: timeRef.current}, peerID) /* info action sender */
      langAction[0]({langObj: lang, name: user.name, onJoin: true, time: timeRef.current}, peerID) /* lang action sender */

      if(userVideo){
        roomRef.current.addStream(userVideo, peerID, { type: "video" })
      }
      if(userAudio){
        roomRef.current.addStream(userVideo, peerID, { type: "audio" })
      }
    })
  }, [userAudio, userVideo, roomRef.current, infoActionRef.current, lang, langAction])

  useEffect(()=>{
    if(userVideo){
      roomRef.current.addStream(userVideo, null, { type: "video" })
    }

    return ()=>{
      if(userVideo){
        try {
          roomRef.current.removeStream(userVideo)
        } catch (error) {

        }
        if(streamRemovedActionRef?.current) streamRemovedActionRef.current[0]("video") /* stream remove action sender */
        userVideo.getTracks().forEach(function(track:any) {
          track.stop()
        })
        setUserVideo(null)
      }
    }
  }, [userVideo, roomRef.current, streamRemovedActionRef.current, infoActionRef.current])

  useEffect(()=>{
    if(userAudio){
      roomRef.current.addStream(userAudio, null, { type: "audio" })
    }

    return ()=>{
      if(userAudio){
        try {
          roomRef.current.removeStream(userAudio)
        } catch (error) {

        }
        if(streamRemovedActionRef?.current) streamRemovedActionRef.current[0]("audio") /* stream remove action sender */

        userAudio.getTracks().forEach(function(track:any) {
          track.stop()
        })
        setUserAudio(null)
      }
    }
  }, [userAudio, roomRef.current, streamRemovedActionRef.current, infoActionRef.current])

  useEffect(()=>{
    if(!roomRef.current) return

    roomRef.current.onPeerStream((stream:any, peerID:string, metadata: { type: string })=>{
      if(metadata.type==="video"){
        let peer = peersInfo.find(p=>p.peerID===peerID)
        setPeerCamStreams([...peerCamStreams, {name: peer.name, peerID, stream}])
      }
      else if(metadata.type==="audio"){
        let audio = new Audio()
        audio.srcObject = stream
        audio.autoplay = true
      }
      else{ /* screen-share */

      }
    })

    if(streamRemovedActionRef?.current){
      streamRemovedActionRef.current[1]((data: string, peerID: string)=>{ /* stream remove action receiver */
        if(data==="video"){
          setPeerCamStreams(peerCamStreams.filter((p:PeerStreamData)=>p.peerID!==peerID))
        }
        else if(data==="audio"){
          setPeerMicStreams(peerMicStreams.filter((p: PeerStreamData)=>p.peerID!==peerID))
        }
      })
    }

    roomRef.current.onPeerLeave((peerID:string)=>{
      let peer = peersInfo.find(p=>p.peerID===peerID)
      setPeersInfo((peersInfo)=>peersInfo.filter(p=>p.peerID!==peerID))
      setPeerCamStreams(peerCamStreams.filter((p:PeerStreamData)=>p.peerID!==peerID))
      setPeerMicStreams(peerMicStreams.filter((p: PeerStreamData)=>p.peerID!==peerID))
      if(peer) toast(`${peer.name} left the room`)
    })
  }, [peersInfo, roomRef.current, peerCamStreams])

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
    <div className="w-full flex items-center justify-center p-1 gap-1 h-full">
      <Sidebar/>
      <CenterPanel/>
      <UsersPanel peersInfo={peersInfo} user={user}/>
      <MessagePanel messages={messages} handleMessage={handleMessage}/>
    </div>
  )
}

export default ClientSide