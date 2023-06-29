import { Users, MoreHorizontal, MessagesSquare, X, Mic, Camera } from "lucide-react"

const CenterPanel = ({ sidepanel, setSidepanel } : { sidepanel: number, setSidepanel: any }) => {

  const handlePanelChange = ( panel: number ) => {
    if(sidepanel===panel){
      setSidepanel(0)
      return
    }
    setSidepanel(panel)
  }

  return (
    <div className={`${sidepanel ? 'hidden sm:flex' : 'flex'} h-full flex-grow border rounded-sm border-white border-opacity-10 bg-neutral-950 flex flex-col items-center justify-end`}>
      <div className="flex-grow w-full">
        
      </div>
      <div className="border-t border-white border-opacity-10 w-full flex items-center justify-center gap-2 py-2 text-slate-300">
        <button className="custom-outline flex items-center justify-center px-3 py-3 border border-white border-opacity-20 rounded-full bg-neutral-900/50 hover:bg-neutral-900 transition-colors"><Mic size={20}/></button>
        <button className="custom-outline flex items-center justify-center px-3 py-3 border border-white border-opacity-20 rounded-full bg-neutral-900/50 hover:bg-neutral-900 transition-colors"><Camera size={20}/></button>
        <button className="custom-outline flex items-center justify-center px-3 py-3 border border-white border-opacity-20 rounded-full bg-neutral-900/50 hover:bg-neutral-900 transition-colors" onClick={()=>handlePanelChange(1)}><MessagesSquare size={20}/></button>
        <button className="custom-outline flex items-center justify-center px-3 py-3 border border-white border-opacity-20 rounded-full bg-neutral-900/50 hover:bg-neutral-900 transition-colors" onClick={()=>handlePanelChange(2)}><Users size={20}/></button>
      </div>
    </div>
  )
}

export default CenterPanel