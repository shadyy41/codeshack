import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOutButton from "./components/signoutbutton"

export default async function SignOut() {
  const session = await getServerSession(authOptions)

  if(session===null) redirect('/')

  return (
    <div className='svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6'>
      <div className="h-fit w-full max-w-sm border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 backdrop-blur-md">
        <h2 className="text-lg font-medium font-mono text-slate-300">Are you sure you want to sign out?</h2>
        <SignOutButton/>
      </div>
    </div>
  )
}