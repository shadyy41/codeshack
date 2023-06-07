import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import ProviderButton from "@/app/auth/signin/components/providerbutton"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import EmailButton from "./components/emailbutton"


export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if(session!==null) redirect('/')
  const providers = await getProviders()

  return (
    <>
      <p className="text-sm font-medium font-mono text-slate-300">Sign in / Sign up</p>
      <div className="w-full flex flex-col gap-2">
        <input type="text" placeholder="Enter your email" className="w-full text-slate-300 py-3 px-4 rounded-md border border-white border-opacity-10 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm font-mono"/>
        <EmailButton/>
      </div>
      <div className="w-full flex gap-3 items-center justify-center">
        <div className="flex-grow h-px bg-white opacity-10"></div>
        <p className="text-sm font-medium font-mono text-slate-300">or</p>
        <div className="flex-grow h-px bg-white opacity-10"></div>
      </div>
      {Object.values(providers).map((provider) => (
        <ProviderButton provider={provider}/>
      ))}
    </>
  ) 
}