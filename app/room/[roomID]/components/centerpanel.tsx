import useRoomStore from "@/app/lib/roomstore"
import EditorPanel from "./editorpanel"
import VideoGrid from "./videogrid"

const CenterPanel = () => {
  const sidepanel = useRoomStore((s:any)=>s.sidepanel)
  const centerpanel = useRoomStore((s:any)=>s.centerpanel)

  return (
    <div className={`${sidepanel ? 'hidden sm:flex' : 'flex'} h-full flex-grow bg-neutral-950 flex overflow-hidden gap-2  border rounded border-white border-opacity-10`}>
      { centerpanel===1 ? <VideoGrid/> : <EditorPanel/> }
    </div>
  )
}

export default CenterPanel