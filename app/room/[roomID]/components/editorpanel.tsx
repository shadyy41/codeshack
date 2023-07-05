import dynamic from "next/dynamic"
import ListBox from "./listbox"

const Editor = dynamic(()=>import("./editor"), {ssr: false})

const EditorPanel = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="px-2 py-2 w-full flex-shrink-0 flex items-center justify-between border-b border-white border-opacity-10 z-30">
        <ListBox/>
        <button type="submit" className={`text-xs py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline flex items-center justify-center`}>
          Run Code
        </button>
      </header>
      <Editor/>
    </div>
  )
}

export default EditorPanel