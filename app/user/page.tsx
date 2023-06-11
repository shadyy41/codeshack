import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { revalidatePath } from "next/cache"
import prisma from "../lib/prismaclient"
import Divider from "../components/divider"
import UsernameForm from "./components/usernameform"
import UserimageForm from "./components/userimageform"
import { redirect } from "next/navigation"

const User = async () => {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name
  const userImage = session?.user?.image
  const isPremium = session?.user?.isPremium

  if(!session) redirect('/')

  const editUserimage = async (data: FormData) => {
    "use server";
    if(!session) return
    const img = data.get('userimage')
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { image: img },
    })
    revalidatePath('/')
  }

  const editUsername = async (data: FormData) => {
    "use server";
    if(!session) return
    const name = data.get('name')
    if(!name || !name.length || name.length>20) return
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { name: name },
    })
    revalidatePath('/')
  }

  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-md border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start py-4 px-4 bg-zinc-950 gap-4">
        <h1 className="flex-shrink-0 text-xl font-bold sm:text-2xl">Edit Profile</h1>
        <Divider text="Update username"/>
        <form action={editUsername} className="w-full flex flex-col items-center justify-center gap-2">
          <UsernameForm name={ name } userImage = { userImage } isPremium = { isPremium }/>
        </form>
        <Divider text="Choose a profile picture"/>
        <form action={editUserimage} className="w-full flex flex-col items-center justify-center gap-4">
          <UserimageForm name={ name } userImage = { userImage } isPremium = { isPremium }/>
        </form>
      </div>
    </div>
  )
}

export default User