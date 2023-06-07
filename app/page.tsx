'use client';
import Image from "next/image"
import banner from "../public/banner.png"

export default function Home() {
  const handleCreate = () =>{

  }
  return (
    <div className="h-full w-full flex px-8 sm:px-16 svg-background items-center justify-center lg:justify-between lg:gap-16">
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start flex-shrink-0">
        <div>
          <h2 className="text-4xl font-medium font-mono text-slate-300">Welcome to</h2>
          <h1 className="text-5xl font-extrabold sm:font-bold sm:text-6xl">Code Shack<span className="text-blue-600">.</span></h1>
        </div>
        <p className="text-slate-400 text-2xl max-w-sm">Peer to peer video calls, collaborative coding, and much more!</p>
        <br />
        <div className="flex flex-col w-full text-lg gap-3 text-slate-300 max-w-xs">
          <input type="text" placeholder="Enter your name" className="py-3 px-4 rounded-md border-2 border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm"/>
          <button className="py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline" onClick={handleCreate}>Create Room</button>
        </div>
      </div>
      <div className="border border-white border-opacity-10 rounded-lg overflow-hidden flex-grow aspect-[16/10] hidden lg:flex backdrop-blur-md relative">
        <Image src={banner} alt="banner image" placeholder="blur" fill={true}/>
      </div>
    </div>
  )
}