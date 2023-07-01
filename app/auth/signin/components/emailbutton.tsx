"use client";
import { toast } from "react-hot-toast";
const EmailButton = () => {
  return (
    <button className="text-sm py-3 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm cursor-not-allowed"  onClick={()=>toast.error("This feature has not been added yet.")}>
      Submit
    </button>
  )
}

export default EmailButton