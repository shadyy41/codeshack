'use client';

const RoomForm = () => {
  const handleCreate = () =>{

  }
  return (
    <div className="flex flex-col w-full text-md sm:text-lg gap-3 text-slate-300 max-w-xs">
      <input type="text" placeholder="Enter your name" className="w-full py-3 px-4 rounded-md border-2 border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm"/>
      <button className="w-full py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline" onClick={handleCreate}>Create Room</button>
    </div>
  )
}

export default RoomForm