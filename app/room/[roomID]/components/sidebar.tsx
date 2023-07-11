import { Code, LayoutGrid, LogOut, MessagesSquare, Mic, MicOff, MonitorUp, Share2, Users, Video, VideoOff } from "lucide-react"
import { toast } from "react-hot-toast"
import useRoomStore from "@/app/lib/roomstore"
import { useParams, useRouter } from "next/navigation"
import Button from "./sidebarbutton"
import { useState } from "react"
import Spinner from "@/app/components/spinner"

const Sidebar = () => {
  const { roomID } = useParams()
  
  const [videoLoading, setVideoLoading] = useState<boolean>(false)
  const [audioLoading, setAudioLoading] = useState<boolean>(false)


  const sidepanel = useRoomStore((s:any)=>s.sidepanel)
  const setSidepanel = useRoomStore((s:any)=>s.setSidepanel)
  const centerpanel = useRoomStore((s:any)=>s.centerpanel)
  const setCenterpanel = useRoomStore((s:any)=>s.setCenterpanel)
  const userVideo = useRoomStore((s:any)=>s.userVideo)
  const setUserVideo = useRoomStore((s:any)=>s.setUserVideo)
  const userAudio = useRoomStore((s:any)=>s.userAudio)
  const setUserAudio = useRoomStore((s:any)=>s.setUserAudio)

  const router = useRouter()

  const handleSideChange = ( panel: number ) => {
    if(sidepanel===panel){
      setSidepanel(0)
      return
    }
    setSidepanel(panel)
  }

  const handleCenterChange = ( panel: number ) => {
    setCenterpanel(panel)
  }

  const handleLeave = () => {
    router.push("/")
  }

  const handleShare = () => {
    if(!navigator.clipboard){
      toast.error("Failed to copy room URL")
      return
    }

    const url = "https://codeshack.vercel.app/room/join?roomID=" + roomID
    navigator.clipboard.writeText(url)
    toast.success(`Copied room URL`)
  }

  const toggleCam = () => {
    setVideoLoading(true)
    if(!userVideo){ /* turn on the camera */
      if(!navigator.mediaDevices){
        toast.error("Media devices unavailable")
        setVideoLoading(false)
        return
      }

      navigator.mediaDevices.getUserMedia({ video: true }).then(stream=>{
        setUserVideo(stream)
        setVideoLoading(false)
      }).catch(()=>{
        setVideoLoading(false)
        toast.error("Permissions denied.")
      })

    }
    else{
      setUserVideo(null)
      setVideoLoading(false)
    }
  }

  const toggleMic = () => {
    setAudioLoading(true)
    if(!userAudio){ /* turn on the mic */
      if(!navigator.mediaDevices){
        toast.error("Media devices unavailable")
        setAudioLoading(false)
        return
      }

      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream=>{
        setUserAudio(stream)
        setAudioLoading(false)
      }).catch(()=>{
        setAudioLoading(false)
        toast.error("Permissions denied.")
      })

    }
    else{
      setUserAudio(null)
      setAudioLoading(false)
    }
  }

  return (
    <div className={`${sidepanel ? 'hidden sm:flex' : 'flex'} bg-neutral-950 border h-full border-white border-opacity-10 flex flex-col items-center justify-between gap-2 py-2 px-2 text-slate-300 rounded`}>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Button content="View Chat" onClickHandler={()=>handleSideChange(1)} active={sidepanel===1}>
          <MessagesSquare size={18}/>
        </Button>
        <Button content="View Participants" onClickHandler={()=>handleSideChange(2)} active={sidepanel===2}>
         <Users size={18}/>
        </Button>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Button content="Open Video Grid" onClickHandler={()=>handleCenterChange(1)} active={centerpanel===1}>
          <LayoutGrid size={18}/>
        </Button>
        <Button content="Open Editor" onClickHandler={()=>handleCenterChange(2)} active={centerpanel===2}>
          <Code size={18}/>
        </Button>
        <Button content="Present Screen" onClickHandler={()=>toast.error("This feature has not been implemented yet.")} active={false}>
          <MonitorUp size={18}/>
        </Button>
        <Button content="Toggle Mic" onClickHandler={toggleMic} active={userAudio} danger={!userAudio}>
          { audioLoading ? <Spinner sizeclass="w-[18px] h-[18px]"/> : !userAudio ? <MicOff size={18}/> : <Mic size={18}/> }
        </Button>
        <Button content="Toggle Camera" onClickHandler={toggleCam} active={userVideo} danger={!userVideo}>
          { videoLoading ? <Spinner sizeclass="w-[18px] h-[18px]"/> : !userVideo ? <VideoOff size={18}/> : <Video size={18}/> }
        </Button>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Button content="Copy Room Link" onClickHandler={handleShare} active={false}>
          <Share2 size={18}/>
        </Button>
        <Button content="Leave Room" onClickHandler={handleLeave} active={false} danger={true}>
          <LogOut size={18}/>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar