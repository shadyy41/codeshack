import Image from "next/image"
import banner from "../public/banner.png"
import Link from "next/link"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import CreateRoom from "./components/createroom"
import { AlertCircle, CheckCircle2, RotateCcw, XCircle } from "lucide-react"
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
    title: "Multiple Languages",
    content: "Supports C++, Java, JavaScript and Python.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Screen Sharing",
    content: "Work in progress.",
    icon: <AlertCircle size={18} className="inline text-yellow-400"/>
  }
]

const premium_features = [
  {
    title: "Room Capacity",
    content: "Rooms support 16 concurrent peers.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Profile Customization",
    content: "Edit username and profile picture.",
    icon: <CheckCircle2 size={18} className="inline text-green-400"/>
  },
  {
    title: "Custom Username Color",
    content: "Work in progress.",
    icon: <AlertCircle size={18} className="inline text-yellow-400"/>
  },
]

export default async function Home() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const isPremium = session?.user?.isPremium

  return (
    <div className="w-full h-full px-8 pt-8 sm:pt-16 overflow-auto text-center">
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <div className="w-full flex flex-col items-center justify-center gap-5 text-center">
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
        <div className="shadow-[5px_5px_0px_0px_#2563eb] w-full max-w-7xl sm:my-16 my-8 flex flex-col items-center justify-center border border-white border-opacity-20 rounded overflow-hidden">
          <div className="w-full border-b border-white border-opacity-20 h-10 bg-black hidden md:flex items-center justify-center relative">
            <div className="flex items-center justify-center gap-2 p-3 absolute left-0">
              <span className="h-3.5 w-3.5 bg-[#ff5f56] rounded-full"></span>
              <span className="h-3.5 w-3.5 bg-[#ffbd2e] rounded-full"></span>
              <span className="h-3.5 w-3.5 bg-[#27c93f] rounded-full"></span>
            </div>
            <div className="h-full w-full max-w-[260px] p-1.5 relative">
              <div className="w-full h-full bg-green-600 rounded-md bg-opacity-10 text-green-600 text-opacity-90 flex items-center justify-center text-xs relative">
                <p>codeshack.vercel.app</p>
                <RotateCcw className="absolute right-2" size={13}/>
              </div>
            </div>
          </div>
          <div className="w-full aspect-[16/10] flex-shrink-0 flex bg-neutral-950 relative">
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
        <div className="flex w-full flex-col gap-6 sm:gap-8 items-center justify-center max-w-4xl">
          <h2 className="text-4xl font-semibold">
            Pricing
          </h2>
          <div className="w-full grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1 gap-4 lg:gap-8 text-center">
            <div className="border cursor-pointer border-white border-opacity-20 hover:bg-neutral-900 hover:border-opacity-40 transition-colors rounded flex flex-col items-center justify-center gap-4 bg-neutral-900/20 p-4">
              <div className="w-full">
                <h3 className="text-2xl">Freemium</h3>
                <p className="text-4xl font-bold">Free</p>
                <p className="text-sm text-slate-300">Forever</p>
              </div>
              <ul className="flex flex-col gap-2 items-center justify-center text-xl">
                <li className="flex items-center justify-center gap-1"><XCircle size={18} className="inline text-red-400"/>Default username</li>
                <li className="flex items-center justify-center gap-1"><XCircle size={18} className="inline text-red-400"/>6 Concurrent users in rooms</li>
                <li className="flex items-center justify-center gap-1"><XCircle size={18} className="inline text-red-400"/>Default profile picture</li>
              </ul>
            </div>
            <Link href="/premium" className="border border-white border-opacity-20 hover:bg-neutral-900 hover:border-opacity-40 transition-colors rounded flex flex-col items-center justify-center gap-4 bg-neutral-900/20 p-4">
              <div className="w-full">
                <h3 className="text-2xl premium-text">Premium</h3>
                <p className="text-4xl font-bold"><span className="font-normal">&#36;</span> 4.99</p>
                <p className="text-sm text-slate-300">Lifetime membership</p>
              </div>
              <ul className="flex flex-col gap-2 items-center justify-center text-xl">
                <li className="flex items-center justify-center gap-1"><CheckCircle2 size={18} className="inline text-green-400"/>Customizable username</li>
                <li className="flex items-center justify-center gap-1"><CheckCircle2 size={18} className="inline text-green-400"/>16 Concurrent users in rooms</li>
                <li className="flex items-center justify-center gap-1"><CheckCircle2 size={18} className="inline text-green-400"/>Customizable profile picture</li>
              </ul>
            </Link>
          </div>
          <p className="text-xl text-slate-300">
            Premium is free for all as I dont have access to the Razorpay production API.
          </p>
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