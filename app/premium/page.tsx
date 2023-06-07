import { getServerSession } from "next-auth"
import ClientSide from "./components/clientside"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

const Premium = async () => {
  const session = await getServerSession(authOptions)
  const isPremium = session?.user?.isPremium

  return <ClientSide authenticated={ session!==null } isPremium={isPremium}/>
}

export default Premium
