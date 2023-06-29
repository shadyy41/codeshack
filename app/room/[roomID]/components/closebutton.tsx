import { X } from "lucide-react"

const CloseButton = ({ setSidepanel }: { setSidepanel: any }) => {
  return (
    <button onClick={()=>setSidepanel(0)} className="custom-outline rounded-sm text-slate-300 hover:text-white transition-colors p-1">
      <X size={19}/>
    </button>
  )
}

export default CloseButton