import { getServerSession } from "next-auth"
import ClientSide from "./components/clientside"
import { authOptions } from "../api/auth/[...nextauth]/route"

const Premium = async () => {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const isPremium = session?.user?.isPremium

  return <ClientSide authenticated={ session!==null } isPremium={isPremium}/>
}

export default Premium
