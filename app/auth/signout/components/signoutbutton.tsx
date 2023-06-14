"use client";
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  return (
    <button className="text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm" onClick={() => signOut( { callbackUrl: '/' } )}>
      Sign Out
    </button>
  )
}

export default SignOutButton