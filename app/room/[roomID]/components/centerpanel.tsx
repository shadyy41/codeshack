import useRoomStore from "@/app/lib/roomstore"
import ListBox from "./listbox"

const CenterPanel = () => {
  const sidepanel = useRoomStore((s:any)=>s.sidepanel)

  return (
    <div className={`${sidepanel ? 'hidden sm:flex' : 'flex'} h-full flex-grow bg-neutral-950 flex flex-col overflow-hidden gap-2  border rounded-md border-white border-opacity-10`}>
      <div className="flex-grow w-full flex flex-col">
        <header className="px-2 py-2 w-full flex-shrink-0 flex items-center justify-between border-b border-white border-opacity-10">
          <ListBox/>
          <button type="submit" className={`text-xs py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline flex items-center justify-center`}>
            Run Code
          </button>
        </header>
      </div>
    </div>
  )
}

export default CenterPanel