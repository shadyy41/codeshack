const Divider = ({ text }: { text?: string }) => {
  return (
    text ? 
    <div className="w-full flex gap-3 items-center justify-center text-xs">
      <div className="flex-grow h-px bg-white opacity-10"></div>
      <p className="text-slate-300">{ text }</p>
      <div className="flex-grow h-px bg-white opacity-10"></div>
    </div>
    :
    <div className="w-full flex gap-3 items-center justify-center text-xs">
      <div className="flex-grow h-px bg-white opacity-10"></div>
    </div>
  )
}

export default Divider