import dynamic from "next/dynamic"
import ListBox from "./listbox"
import useRoomStore from "@/app/lib/roomstore"
import Button from "./sidebarbutton"
import { Trash } from "lucide-react"

const Editor = dynamic(()=>import("./editor"), {ssr: false})

const EditorPanel = () => {
  const running = useRoomStore((s:any)=>s.running)
  const setRunning = useRoomStore((s:any)=>s.setRunning)

  const output = useRoomStore((s:any)=>s.output)
  const setOutput = useRoomStore((s:any)=>s.setOutput)

  return (
    <div className="w-full h-full flex flex-col">
      <header className="px-2 py-2 w-full flex-shrink-0 flex items-center justify-between border-b border-white border-opacity-10 z-30">
        <ListBox/>
        <button type="submit" className={`text-xs w-['34px'] py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline flex items-center justify-center ${running ? 'cursor-wait' : 'cursor-pointer'}`} disabled={running} onClick={()=>setRunning(true)}>
          {running? "Running..." : "Run Code"}
        </button>
      </header>
      <Editor/>
      { output.length>0 && 
        <div className="text-slate-300 flex justify-between items-center gap-2 text-sm flex-shrink-0 z-30 w-full border-t border-white border-opacity-10 p-2">
          <div>
            <h2>Output</h2>
            {output}
          </div>
          <div className="flex-shrink-0">
            <Button content="Clear Output" active={false} onClickHandler={()=>setOutput("")} danger={true}> <Trash size={18}/> </Button>
          </div>
        </div>
      }
    </div>
  )
}

export default EditorPanel