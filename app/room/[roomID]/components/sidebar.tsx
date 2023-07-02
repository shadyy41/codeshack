import { Code, LayoutGrid, LogOut, MessagesSquare, Mic, MonitorUp, Share2, Users, Video } from "lucide-react"
import { toast } from "react-hot-toast"
import useRoomStore from "@/app/lib/roomstore"
import { useParams, useRouter } from "next/navigation"
import Button from "./sidebarbutton"

const Sidebar = () => {
  const { roomID } = useParams()
  const sidepanel = useRoomStore((s:any)=>s.sidepanel)
  const setSidepanel = useRoomStore((s:any)=>s.setSidepanel)
  const router = useRouter()

  const handlePanelChange = ( panel: number ) => {
    if(sidepanel===panel){
      setSidepanel(0)
      return
    }
    setSidepanel(panel)
  }

  const handleLeave = () => {
    router.replace("/")
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

  return (
    <div className={`${sidepanel ? 'hidden sm:flex' : 'flex'} bg-neutral-950 border h-full border-white border-opacity-10 flex flex-col items-center justify-between gap-2 py-2 px-2 text-slate-300 rounded`}>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Button content="View Chat" onClickHandler={()=>handlePanelChange(1)} active={sidepanel===1}>
          <MessagesSquare size={18}/>
        </Button>
        <Button content="View Participants" onClickHandler={()=>handlePanelChange(2)} active={sidepanel===2}>
         <Users size={18}/>
        </Button>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Button content="Open Editor" onClickHandler={()=>{}} active={false}>
          <Code size={18}/>
        </Button>
        <Button content="Open Video Grid" onClickHandler={()=>{}} active={false}>
          <LayoutGrid size={18}/>
        </Button>
        <Button content="Present Screen" onClickHandler={()=>{}} active={false}>
          <MonitorUp size={18}/>
        </Button>
        <Button content="Toggle Mic" onClickHandler={()=>{}} active={false}>
          <Mic size={18}/>
        </Button>
        <Button content="Toggle Camera" onClickHandler={()=>{}} active={false}>
          <Video size={18}/>
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