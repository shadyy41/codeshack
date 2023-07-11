import useRoomStore from "@/app/lib/roomstore"
import { ArrowRightToLine } from "lucide-react"

const PanelHeader = ({ content }: { content: string }) => {
  const setSidepanel = useRoomStore((s:any)=>s.setSidepanel)

  return (
    <header className="px-2 py-2 w-full flex-shrink-0 flex items-center justify-between border-b border-white border-opacity-10 gap-2">
      <div className="text-white text-xs font-normal rounded border border-white border-opacity-20 flex-grow py-2 px-2 bg-neutral-900/50">{ content }</div>
      <button className={`custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors`} onClick={()=>setSidepanel(0)}>
        <ArrowRightToLine size={18}/>
      </button>
    </header>
  )
}

export default PanelHeader