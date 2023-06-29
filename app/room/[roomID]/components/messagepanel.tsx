import { useState } from "react"
import { toast } from "react-hot-toast"
import CloseButton from "./closebutton"
import type { User, Message } from "./clientside"

const MessagePanel = ( { roomID, peersInfo, user, setSidepanel, sidepanel, messages, handleMessage } : { roomID: string, peersInfo: any[], user: User, setSidepanel: any, sidepanel: number,  messages: Array<Message>, handleMessage: any} ) => {
  const [currMessage, setCurrMessage] = useState<string>("")

  return (
    <aside className={`${sidepanel!==1 ? 'hidden' : ''} h-full w-full sm:w-96  border rounded-sm border-white border-opacity-10 bg-neutral-950 flex flex-col items-center justify-between flex-wrap-wrap`}>
      <header className="px-3 py-2 w-full flex-shrink-0 flex items-center justify-between border-b border-white border-opacity-10">
        <h2 className="text-slate-300 text-md font-normal">Messages</h2>
        <CloseButton setSidepanel={setSidepanel}/>
      </header>
      <div className="flex-grow flex flex-col justify-end overflow-hidden w-full">
        <div className="overflow-auto snap-y flex flex-col-reverse gap-2 px-2 py-2 scroll-pb-2">
          {
            messages.map((e:any, idx:number)=>{
              return (
                <div key={idx} className="snap-end w-full flex flex-col justify-start py-2 px-2 rounded-sm bg-neutral-900/50 text-slate-300">
                  <div className="overflow-hidden flex gap-2">
                    <p className="font-medium text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {e.you ? "You" : e.username}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {e.timestamp}
                    </p>
                  </div>
                  <p className="text-sm">
                    {e.data}
                  </p>
                </div>
              )
            })
          }
        </div>
        <form className="w-full flex-shrink-0 flex px-2 gap-2 py-2 border-t border-white border-opacity-10">
          <input className="text-sm w-full text-slate-300 py-3 px-2 rounded-sm border border-white border-opacity-10 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm" type="text" placeholder="Type here..." value={currMessage} onChange={e=>setCurrMessage(e.target.value)}/>
          <button type="submit" className={`text-sm py-3 px-4 rounded-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline flex items-center justify-center`} onClick={(e:any)=>{
            e.preventDefault()
            handleMessage(currMessage)
            setCurrMessage("")
          }}>
            Send
          </button>
        </form>
      </div>
    </aside>
  )
}

export default MessagePanel