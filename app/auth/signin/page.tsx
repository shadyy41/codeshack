import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import ProviderButton from "@/app/auth/signin/components/providerbutton"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if(session!==null) redirect('/')
  const providers = await getProviders()

  return (
    <>
      {Object.values(providers).map((provider) => (
        <ProviderButton provider={provider}/>
      ))}
    </>
  ) 
}