"use client";
import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()
  return (
    <button className="py-3 rounded-md border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-full max-w-sm" onClick={()=>router.back()}>
      Back
    </button>
  )
}

export default BackButton