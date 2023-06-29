import { Code, LayoutGrid, LogOut, MessagesSquare, Mic, MonitorUp, Share2, Users, Video } from "lucide-react"
import Link from "next/link"
import { toast } from "react-hot-toast"


const Sidebar = ({ sidepanel, setSidepanel, roomID } :  { sidepanel: number, setSidepanel: any, roomID: string }) => {

  const handlePanelChange = ( panel: number ) => {
    if(sidepanel===panel){
      setSidepanel(0)
      return
    }
    setSidepanel(panel)
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
    <div className="bg-neutral-950 border h-full border-white border-opacity-10 flex flex-col items-center justify-between gap-2 py-2 px-2 text-slate-300 rounded">
      <div className="text-slate-200">
        <Link href="/" className="custom-outline flex items-center justify-center p-2 rounded bg-red-700 hover:bg-red-500 transition-colors"><LogOut size={18}/></Link>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <button className={`custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors`}><Code size={18}/></button>
        <button className={`custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors`}><LayoutGrid size={18}/></button>
        <button className={`custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors`}><MonitorUp size={18}/></button>
        <button className={`custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors`} onClick={()=>handlePanelChange(1)}><MessagesSquare size={18}/></button>
        <button className="custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors" onClick={()=>handlePanelChange(2)}><Users size={18}/></button>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <button className="custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors"><Mic size={18}/></button>
        <button className="custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors"><Video size={18}/></button>
        <button className="custom-outline flex items-center justify-center p-2 border border-white border-opacity-20  rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors" onClick={handleShare}><Share2 size={18}/></button>
      </div>
    </div>
  )
}

export default Sidebar