import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import UsernameForm from "./components/usernameform"
import { redirect } from "next/navigation"
import FormHeader from "../components/formheader"
import UserimageForm from "./components/userimageform"
import Link from "next/link"
import Divider from "../components/divider"

export const metadata = {
  title: 'Edit Profile',
}

const User = async () => {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name
  const email = session?.user?.email
  const isPremium = session?.user?.isPremium

  if(!session) redirect('/')

  return (
    <div className="h-full w-full flex flex-col items-start justify-start bg-zinc-950 gap-4 px-3 py-3 text-start">
      {
        !isPremium && <div className="text-slate-300 w-full text-center">
        Join <Link href="/premium" className="premium-text font-bold">Premium</Link> to enable profile customization!
        </div>
      }
      <Divider/>
      <FormHeader text="Account Information"/>
      <UsernameForm name={ name } isPremium = { isPremium } email={ email }/>
      <FormHeader text="Edit Avatar"/>
      <UserimageForm isPremium={ isPremium }/>
    </div>
  )
}

export default User