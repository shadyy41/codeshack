import Image from "next/image"
import banner from "../public/banner.png"
import Link from "next/link"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import CreateRoom from "./components/createroom"
import { AlertCircle, ArrowRightCircle, CheckCircle2 } from "lucide-react"
import FeatureCard from "./components/featurecard"

const features = [
  {
    title: "Online Compilation",
    content: "Run your code remotely, with support for upto 4 languages.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Video Chat",
    content: "Supports secure P2P video and audio streams.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Realtime Collaboration",
    content: "Realtime code editor powered by CodeMirror6 and Yjs.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Text Chat",
    content: "Send messages to peers via a P2P connection.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Languages",
    content: "Supports C++, Java, JavaScript and Python.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Screen Sharing",
    content: "Work in progress.",
    icon: <AlertCircle size={18} className="inline text-yellow-400"/>
  }
]

export default async function Home() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const isPremium = session?.user?.isPremium

  return (
    <div className="w-full h-full px-8 pt-8 sm:pt-16 overflow-auto text-center">
      <div className="w-full flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col items-center justify-center gap-5 text-center">
          {!isPremium && <Link href="/premium" className="drop-shadow-[0_0_8px_rgba(37,99,235,0.3)] custom-outline text-slate-300 mb-2 text-xs px-2 py-1 rounded-md bg-zinc-950 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <span className="premium-text mr-1">&#x25CF;</span> Checkout Premium Features <span className="text-white opacity-50"><ArrowRightCircle size={16} className="inline" strokeWidth="1.5"/></span>
          </Link>}
          <h1 className="text-4xl sm:text-5xl font-semibold max-w-3xl">
            Realtime Collaborative Coding, Video Calls and More!
          </h1>
          <p className="text-slate-300 text-xl max-w-3xl w-full break-words">
            CodeShack supports collaborative coding, peer to peer video calls, online code compilation and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center w-full text-md gap-3 text-slate-300 max-w-lg sm:pt-4">
            <CreateRoom authenticated={ session !==null }/>
            <Link className="text-base py-3 rounded border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-full max-w-sm text-center" href="/room/join">
              Join Room
            </Link>
          </div>
        </div>
        <div className="w-full sm:py-16 py-8 flex items-center justify-center">
          <div className="border border-white border-opacity-20 rounded overflow-hidden w-full max-w-7xl aspect-[16/10] flex-shrink-0 flex bg-neutral-950 relative drop-shadow-[0_0_16px_rgba(37,99,235,0.3)]">
            <Image src={banner} alt="banner image" placeholder="blur" fill={true}/>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 sm:gap-8 items-center justify-center max-w-5xl">
          <h2 className="text-4xl font-semibold">
            Features
          </h2>
          <div className="w-full grid md:grid-cols-3 md:grid-rows-2 grid-rows-6 grid-cols-1 gap-4 lg:gap-8 text-center">
            {features.map((f, idx)=>{
              return <FeatureCard title={f.title} key={idx} content={f.content} icon={f.icon}/>
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 items-center justify-center max-w-5xl">
          <h2 className="text-4xl font-semibold">
            Contribute
          </h2>
          <p className="text-slate-300 text-xl max-w-3xl w-full break-words">
            CodeShack is an open source project, checkout the <a className="custom-outline underline decoration-blue-600 decoration-wavy hover:text-white transition-colors" href="https://github.com/shadyy41/codeshack" target="_blank" rel="noopener noreferrer">Github repo</a> for contributing. There is list of pending features in README.md, any help is appreciated.
          </p>
        </div>

        <div className="w-full max-w-5xl flex items-center justify-center pb-8 pt-8 text-slate-300">
          <p className="text-base">Built with Nextjs by <a className="custom-outline underline decoration-blue-600 decoration-wavy hover:text-white transition-colors" href="https://shady41.netlify.app/" target="_blank" rel="noopener noreferrer">Abhinav Anand</a></p>
        </div>
      </div>
    </div>
  )
}