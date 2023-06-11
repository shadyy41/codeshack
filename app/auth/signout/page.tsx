import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOutButton from "./components/signoutbutton"
import BackButton from "../components/backbutton"
import Divider from "@/app/components/divider"

export default async function SignOut() {
  const session = await getServerSession(authOptions)
  if(session===null) redirect('/')

  return (
    <>
      <h1 className="w-full text-xl font-bold sm:text-2xl">Sign Out</h1>
      <Divider text="Are you sure?"/>
      <SignOutButton/>
      <BackButton/>
    </>
  )
}