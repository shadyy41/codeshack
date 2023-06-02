import React from 'react'
import Logo from './logo'
import { getProviders, signIn } from "next-auth/react"

const AuthForm = async () => {
  let providers = await getProviders()
  if(!providers){
    throw new Error("Failed to fetch auth providers")
  }
  return (
    <div className='svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6'>
      <div className="h-fit w-full max-w-sm border rounded-sm border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 backdrop-blur-md">
        <Logo showText={false}/>
        {Object.values(providers).map((provider) => (
          <button key={provider.name} className="py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-xs font-mono"  onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Log In with { provider.name }
          </button>
        ))}
      </div>
    </div>
  )
}

export default AuthForm