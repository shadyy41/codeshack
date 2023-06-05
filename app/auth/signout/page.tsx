import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOutButton from "./components/signoutbutton"

export default async function SignOut() {
  const session = await getServerSession(authOptions)

  if(session===null) redirect('/')

  return (
    <>
      <h2 className="text-lg font-medium font-mono text-slate-300">Are you sure you want to sign out?</h2>
      <SignOutButton/>
    </>
  )
}