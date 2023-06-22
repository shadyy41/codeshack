import Image from "next/image"
import banner from "../public/banner.png"
import Link from "next/link"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import CreateRoom from "./components/createroom"
import { ArrowRightCircle } from "lucide-react"

export default async function Home() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const isPremium = session?.user?.isPremium

  return (
    <div className="h-full w-full flex px-8 sm:px-16 items-center justify-center lg:justify-between lg:gap-16">
      <div className="h-full w-full sm:w-fit flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start flex-shrink-0">
        {!isPremium && <Link href="/premium" className="drop-shadow-[0_0_8px_rgba(37,99,235,0.3)] custom-outline text-slate-300 text-xs px-2 py-1 rounded-md bg-zinc-950 border border-white border-opacity-30 hover:border-opacity-40 transition">
          <span className="premium-text mr-1">&#x25CF;</span> Checkout Premium Features <span className="text-white opacity-50"><ArrowRightCircle size={16} className="inline"/></span>
        </Link>}
        <div>
          <h2 className="text-3xl font-medium text-slate-300">Welcome to</h2>
          <h1 className="text-5xl font-extrabold sm:font-bold sm:text-6xl">Code Shack<span className="text-blue-600">.</span></h1>
        </div>
        <p className="text-slate-400 text-2xl max-w-sm w-full break-words">Peer to peer video calls, collaborative coding, and much more!</p>
        <br />
        <div className="flex flex-col w-full text-md gap-3 text-slate-300 max-w-xs text-center">
          <CreateRoom authenticated={ session !==null }/>
          <Link className="text-sm sm:text-base py-3 rounded-md border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-full max-w-sm" href="/room/join">
            Join Room
          </Link>
        </div>
      </div>
      <div className="border border-white border-opacity-10 rounded-lg overflow-hidden flex-grow aspect-[16/10] hidden lg:flex backdrop-blur-md relative">
        <Image src={banner} alt="banner image" placeholder="blur" fill={true}/>
      </div>
    </div>
  )
}