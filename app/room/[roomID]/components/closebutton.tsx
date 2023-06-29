import { ArrowRightToLine } from "lucide-react"

const CloseButton = ({ setSidepanel }: { setSidepanel: any }) => {
  return (
    <button onClick={()=>setSidepanel(0)} className="custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors">
      <ArrowRightToLine size={18}/>
    </button>
  )
}

export default CloseButton