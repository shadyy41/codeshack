const Divider = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex gap-3 items-center justify-center">
      <div className="flex-grow h-px bg-white opacity-10"></div>
      <p className="text-slate-300">{ text }</p>
      <div className="flex-grow h-px bg-white opacity-10"></div>
    </div>
  )
}

export default Divider