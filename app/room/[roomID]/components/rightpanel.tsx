import { ChevronDoubleLeftIcon, ShareIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import Divider from "@/app/components/divider"

const peersInfo = [
  {
    name: "shady41",
    image: "/dicebear/avataaarsNeutral-0.svg",
    email: "abhinavjha2512@gmail.com"
  },
  {
    name: "john pork",
    image: "/dicebear/avataaarsNeutral-2.svg",
    email: "abhinavjha2512@gmail.com"
  },
  {
    name: "paan parag",
    image: "/dicebear/avataaarsNeutral-3.svg",
    email: "abhinavjha2512@gmail.com"
  },
  {
    name: "this name is tooooooooooooooo long",
    image: "/dicebear/avataaarsNeutral-1.svg",
    email: "abhinavjha2512@gmail.com"
  }
]

const RightPanel = ( { roomID } : { roomID:string } ) => {
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
      <div className={`${expanded ? 'text-sm' : 'text-xs'} font-bold px-2 h-12 flex items-center justify-center border-b border-white border-opacity-20 w-full flex-shrink-0`}>
        In room
      </div>
      <div className="h-full w-full overflow-hidden faded-after">
        <div className={`w-full h-full flex flex-col gap-2 overflow-x-auto px-2 snap-y scroll-py-2 pb-4 no-scrollbar`}>
          {
            peersInfo.map((e, idx)=>{
              return <div key={idx} className="snap-start w-full border rounded-md border-white border-opacity-10 hover:border-opacity-40 transition bg-neutral-900/50 flex justify-start">
                <div className="flex-shrink-0 w-12 aspect-square relative rounded-md overflow-hidden">
                  <Image src={e.image} alt="peer image" fill/>
                </div>
                { 
                  expanded &&
                  <div className={`h-12 overflow-hidden flex flex-col px-2 py-1 gap-1`}>
                    <p className="text-slate-300 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {e.name}
                    </p>
                    <p className="text-slate-400 text-xs w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {e.email}
                    </p>
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
          <ShareIcon height={20} width={20}/>
        </button>

        <button className={`text-slate-300 custom-outline border rounded-md border-white border-opacity-10 hover:border-opacity-40 transition bg-neutral-900/50 w-full h-12 flex justify-center items-center`} onClick={handleExpand}>
          <ChevronDoubleLeftIcon height={26} width={26} className={`${expanded ? 'rotate-180' : ''} transition-transform`}/>
        </button>
      </div>
    </aside>
  )
}

export default RightPanel