import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import ProviderButton from "@/app/auth/signin/components/providerbutton"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import EmailButton from "./components/emailbutton"
import Divider from "@/app/components/divider"
import BackButton from "../components/backbutton"
import FormHeader from "@/app/components/formheader"


export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if(session!==null) redirect('/')
  const providers = await getProviders()

  return (
    <>
      <FormHeader text="Sign In"/>
      <Divider text="With Email"/>
      <div className="w-full flex flex-col gap-2">
        <input type="text" placeholder="Enter your email" className="text-sm w-full text-slate-300 py-3 px-4 rounded border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm cursor-not-allowed" disabled/>
        <EmailButton/>
      </div>
      <Divider text="Or"/>
      {/*@ts-ignore*/}
      {Object.values(providers).map((provider) => (
        <ProviderButton provider={provider}/>
      ))}
      <BackButton/>
    </>
  ) 
}