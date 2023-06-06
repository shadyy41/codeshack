import Logo from "./logo"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserMenu from "./usermenu"

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name
  const userImage = session?.user?.image
  const isPremium = session?.user?.isPremium

  return (
    <nav className="px-8 py-6 flex items-center justify-between sm:px-16 flex-shrink-0 border-b border-white border-opacity-10">
      <Logo showText={true}/>
      <UserMenu authenticated={ session!==null } name={ name } userImage = { userImage } isPremium = { isPremium }/>
    </nav>
  )
}

export default Navbar