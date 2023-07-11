import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import PanelHeader from "./panelheader"
import { User } from "./clientside"
import useRoomStore from "@/app/lib/roomstore"

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
//   },
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
//   },
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
//   },
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
//   },
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

const UsersPanel = ( { peersInfo, user } : { peersInfo: any[], user: User } ) => {
  const sidepanel = useRoomStore((s:any)=>s.sidepanel)

  return (
    <aside className={`${sidepanel!==2 ? 'hidden' : ''} h-full w-full sm:w-80  border rounded border-white border-opacity-10 bg-neutral-950 flex flex-col items-center justify-between flex-wrap-wrap flex-shrink-0`}>
      <PanelHeader content={`Participants (${peersInfo.length+1})`}/>
      <div className="flex-grow w-full flex flex-col justify-start gap-2 overflow-hidden">
        <div className="overflow-auto snap-y flex flex-col gap-2 px-2 py-2 scroll-pt-2">
          <div className="snap-start w-full border rounded border-white border-opacity-10 flex justify-start">
            <div className="flex-shrink-0 w-12 aspect-square relative rounded overflow-hidden">
              <Image src={user.image} alt="peer image" fill/>
            </div>
            <div className={`h-12 overflow-hidden flex flex-col px-2 py-1 gap-1 flex-grow`}>
              <p className="text-slate-300 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">
                {user.name}<span className="text-slate-400"> (you)</span>
              </p>
              <p className="text-slate-400 text-xs w-full text-ellipsis overflow-hidden whitespace-nowrap">
                {user.email}
              </p>
            </div>
          </div>
          {
            peersInfo?.map((e, idx)=>{
              return (
                <div key={e.peerID} className="snap-start w-full border rounded border-white border-opacity-10 flex justify-between items-center">
                  <div className="flex-shrink-0 w-12 aspect-square relative rounded overflow-hidden">
                    <Image src={e.image} alt="peer image" fill/>
                  </div>
                  <div className={`h-12 overflow-hidden flex flex-col px-2 py-1 gap-1 flex-grow`}>
                    <p className="text-slate-300 text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {e.name}
                    </p>
                    <p className="text-slate-400 text-xs w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {e.email}
                    </p>
                  </div>
                  {
                    user.creator &&
                    <div className="flex-shrink-0 h-full flex items-center mr-2">
                      <button onClick={()=>console.log("Hi!!!")}>
                        <MoreHorizontal size={20} className="text-slate-300 hover:text-white transition-colors"/>
                      </button>
                    </div>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </aside>
  )
}

export default UsersPanel