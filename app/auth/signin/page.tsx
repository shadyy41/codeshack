import Logo from "@/app/components/logo"
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
    <div className='svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6'>
      <div className="h-fit w-full max-w-sm border rounded-sm border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 backdrop-blur-md">
        <Logo showText={false}/>
        {Object.values(providers).map((provider) => (
          <ProviderButton provider={provider}/>
        ))}
      </div>
    </div>
  ) 
}