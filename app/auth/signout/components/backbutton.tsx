"use client";
import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()
  return (
    <button className="py-3 rounded-md border border-white border-opacity-10 text-white hover:bg-neutral-900 transition-colors custom-outline w-full max-w-sm" onClick={()=>router.back()}>
      Go Back
    </button>
  )
}

export default BackButton