"use client";
import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()
  return (
    <button className="py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm" onClick={()=>router.back()}>
      Go Back
    </button>
  )
}

export default BackButton