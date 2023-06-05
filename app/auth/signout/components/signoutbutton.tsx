"use client";
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  return (
    <button className="py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm font-mono" onClick={() => signOut( { callbackUrl: '/' } )}>
      Sign Out
    </button>
  )
}

export default SignOutButton