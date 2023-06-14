import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOutButton from "./components/signoutbutton"
import BackButton from "../components/backbutton"
import Divider from "@/app/components/divider"
import FormHeader from "@/app/components/formheader"

export default async function SignOut() {
  const session = await getServerSession(authOptions)
  if(session===null) redirect('/')

  return (
    <>
      <FormHeader text="Sign Out"/>
      <Divider text="Are you sure?"/>
      <SignOutButton/>
      <BackButton/>
    </>
  )
}