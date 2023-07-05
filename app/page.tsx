import Image from "next/image"
import banner from "../public/banner.png"
import Link from "next/link"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import CreateRoom from "./components/createroom"
import { ArrowRightCircle, GithubIcon } from "lucide-react"

export default async function Home() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const isPremium = session?.user?.isPremium

  return (
    <div className="w-full h-full px-8 pt-8 sm:pt-16 block overflow-auto text-center">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center gap-5 text-center">
          {!isPremium && <Link href="/premium" className="drop-shadow-[0_0_8px_rgba(37,99,235,0.3)] custom-outline text-slate-300 mb-2 text-xs px-2 py-1 rounded-md bg-zinc-950 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <span className="premium-text mr-1">&#x25CF;</span> Checkout Premium Features <span className="text-white opacity-50"><ArrowRightCircle size={16} className="inline" strokeWidth="1.5"/></span>
          </Link>}
          <h1 className="text-4xl font-semibold max-w-3xl">
            Realtime Collaborative Coding, Video Calls and More!
          </h1>
          <p className="text-slate-300 text-xl max-w-3xl w-full break-words">
            CodeShack is a collaborative coding which supports peer to peer video calls, online code compilation and screen sharing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center w-full text-md gap-3 text-slate-300 max-w-lg sm:pt-4">
            <CreateRoom authenticated={ session !==null }/>
            <Link className="text-base py-3 rounded border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-full max-w-sm text-center" href="/room/join">
              Join Room
            </Link>
          </div>
        </div>
        <div className="w-full sm:py-16 py-8 flex items-center justify-center">
          <div className="border border-white border-opacity-10 rounded overflow-hidden w-full max-w-7xl aspect-[16/10] flex-shrink-0 flex backdrop-blur-md relative drop-shadow-[0_0_16px_rgba(37,99,235,0.3)]">
            <Image src={banner} alt="banner image" placeholder="blur" fill={true}/>
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 items-center justify-center max-w-4xl">
          <h2 className="text-4xl font-semibold">
            Features
          </h2>
          <div className="w-full grid sm:grid-cols-3 sm:grid-rows-1 grid-rows-3 gap-4 text-center">
            <div className="flex flex-col items-center justify-center gap-2 border border-white border-opacity-20 rounded py-2 ">
              <h3 className="text-xl">Online Compilation</h3>
              <p className="text-md text-slate-300">Run your code remotely, with support for upto 5 languages.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border border-white border-opacity-20 rounded py-3 ">
              <h3 className="text-xl">Video Chat</h3>
              <p className="text-md text-slate-300">Supports secure P2P video streams.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border border-white border-opacity-20 rounded py-3 ">
              <h3 className="text-xl">Realtime Collaboration</h3>
              <p className="text-md text-slate-300">Realtime code editor powered by CodeMirror 6 and Yjs.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl flex items-center justify-between pb-8 sm:pt-8 text-slate-300">
          <p className="text-sm">Built with Nextjs by <a className="custom-outline text-slate-200" href="https://shady41.netlify.app/" target="_blank" rel="noopener noreferrer">Abhinav Anand</a></p>
          <div>
            <a className="custom-outline block" href="https://github.com/shadyy41/codeshack" target="_blank" rel="noopener noreferrer"><GithubIcon size={18}/></a>
          </div>
        </div>
      </div>
    </div>
  )
}