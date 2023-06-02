'use client';

export default function Home() {
  const handleCreate = () =>{
    console.log("Nambardar")
  }
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-8 sm:px-0 svg-background">
      <div>
        <h2 className="text-4xl font-medium font-mono text-slate-300 sm:text-5xl">Welcome to</h2>
        <h1 className="text-5xl font-extrabold sm:font-bold sm:text-7xl">Code Shack<span className="text-blue-600">.</span></h1>
      </div>
      <p className="text-slate-400 text-3xl max-w-xl">Peer to peer video calls, collaborative coding, and much more!</p>
      <br/>
      <div className="flex flex-col w-full text-xl gap-3 text-slate-300 max-w-xs">
        <input type="text" placeholder="Enter your name" className="py-3 px-4 rounded-md border-2 border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm"/>
        <button className="py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline" onClick={handleCreate}>Create Room</button>
      </div>
    </div>
  )
}
