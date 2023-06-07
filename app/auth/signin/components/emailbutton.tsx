"use client";
import { toast } from "react-hot-toast";
const EmailButton = () => {
  return (
    <button className="py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm font-mono"  onClick={()=>toast.error("This feature has not been added yet.")}>
      Login with Email
    </button>
  )
}

export default EmailButton