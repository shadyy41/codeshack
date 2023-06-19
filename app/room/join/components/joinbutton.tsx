"use client";
import Link from "next/link"
import { toast } from "react-hot-toast"

const JoinButton = ({ roomID, disabled } : { roomID: string | null, disabled?: boolean } ) => {
  const handleDisabled = () =>{ /* Only runs when roomID is empty */
    toast.error("Enter a room ID")
  }
  if(!roomID || disabled){
    return (
      <button className={`text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm cursor-not-allowed flex items-center justify-center`} onClick={handleDisabled} disabled={disabled}>
        Join Room
      </button>
    )
  }

  return (
    <Link className={`text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm flex items-center justify-center`} href={`/room/${roomID}`} prefetch={false}>
      Join Room
    </Link>
  )
}

export default JoinButton