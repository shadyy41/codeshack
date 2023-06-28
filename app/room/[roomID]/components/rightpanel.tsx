import { useState } from "react"
import { ArrowLeftFromLine, Share2, Users, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import Divider from "@/app/components/divider"
import { User } from "./clientside"

// const peersInfo = [
//   {
//     name: "shady41",
//     image: "/dicebear/avataaarsNeutral-0.svg",
//     email: "abhinavjha2512@gmail.com"
//   },
//   {
//     name: "john pork",
//     image: "/dicebear/avataaarsNeutral-2.svg",
//     email: "abhinavjha2512@gmail.com"
//   },
//   {
//     name: "paan parag",
//     image: "/dicebear/avataaarsNeutral-3.svg",
//     email: "abhinavjha2512@gmail.com"
//   },
//   {
//     name: "this name is tooooooooooooooo long",
//     image: "/dicebear/avataaarsNeutral-1.svg",
//     email: "abhinavjha2512@gmail.com"
//   }
// ]

const RightPanel = ( { roomID, peersInfo, user } : { roomID:string, peersInfo: any[], user: User } ) => {
  const url = "https://codeshack.vercel.app/room/join?roomID=" + roomID
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = () => {
    if(expanded){

    }
    setExpanded(!expanded)
  }

  const handleShare = () => {
    if(!navigator.clipboard){
      toast.error("Failed to copy room URL")
      return
    }
    navigator.clipboard.writeText(url)
    toast.success(`Copied room URL`)
  }

  return (
    <aside className={`h-full flex-shrink-0 ${expanded ? "w-72" : "w-fit"} border rounded-md border-white border-opacity-10 bg-neutral-950 flex flex-col items-center justify-between h-full gap-2 flex-wrap-wrap overflow-hidden`}>
      <div className={`text-sm font-medium px-3 h-12 flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-2 border-b border-white border-opacity-10 w-full flex-shrink-0 text-slate-300`}>
        {!expanded && <Users size={22}/>}
        {expanded && <p>Participants ({peersInfo.length + 1})</p>}
      </div>
      <div className="h-full w-full overflow-hidden faded-after">
        <div className={`w-full h-full flex flex-col gap-2 overflow-x-auto px-2 snap-y scroll-py-2 pb-4 no-scrollbar`}>
          {
            <div className="snap-start w-full border rounded-md border-white border-opacity-10 bg-neutral-900/50 flex justify-start">
              <div className="flex-shrink-0 w-12 aspect-square relative rounded-md overflow-hidden">
                <Image src={user.image} alt="peer image" fill/>
              </div>
              { 
                expanded &&
                <div className={`h-12 overflow-hidden flex flex-col px-2 py-1 gap-1`}>
                  <p className="text-slate-300 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    {user.name}<span className="text-slate-400"> (you)</span>
                  </p>
                  <p className="text-slate-400 text-xs w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    {user.email}
                  </p>
                </div>
              }
            </div>
          }
          {
            peersInfo?.map((e, idx)=>{
              return <div key={e.peerID} className="snap-start w-full border rounded-md border-white border-opacity-10 bg-neutral-900/50 flex justify-between items-center">
                <div className="flex-shrink-0 w-12 aspect-square relative rounded-md overflow-hidden">
                  <Image src={e.image} alt="peer image" fill/>
                </div>
                { 
                  expanded &&
                  <div className={`h-12 overflow-hidden flex flex-col px-2 py-1 gap-1 flex-grow`}>
                    <p className="text-slate-300 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {e.name}
                    </p>
                    <p className="text-slate-400 text-xs w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {e.email}
                    </p>
                  </div>
                }
                {
                  (expanded && user.creator) &&
                  <div className="flex-shrink-0 h-full flex items-center mr-2">
                    <button onClick={()=>console.log("Hi!!!")}>
                      <MoreHorizontal size={20} className="text-slate-300 hover:text-white transition-colors"/>
                    </button>
                  </div>
                }
              </div>
            })
          }
        </div>
      </div>
      <Divider/>

      <div className={`w-full h-fit px-2 pb-2 flex ${expanded ? 'flex-row' : 'flex-col'} gap-2 flex-shrink-0`}>
        <button className={`text-slate-300 custom-outline border rounded-md border-white border-opacity-10 hover:border-opacity-40 transition bg-neutral-900/50 w-full h-12 flex justify-center items-center`} onClick={handleShare}>
          <Share2 size={22}/>
        </button>

        <button className={`text-slate-300 custom-outline border rounded-md border-white border-opacity-10 hover:border-opacity-40 transition bg-neutral-900/50 w-full h-12 flex justify-center items-center`} onClick={handleExpand}>
          <ArrowLeftFromLine className={`${expanded ? 'rotate-180' : ''} transition-transform`} size={22}/>
        </button>
      </div>
    </aside>
  )
}

export default RightPanel