import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { revalidatePath } from "next/cache"
import prisma from "../lib/prismaclient"
import Button from "./components/button"

const User = async () => {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name
  const userImage = session?.user?.image
  const isPremium = session?.user?.isPremium

  const editUsername = async () => {
    "use server";
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { isPremium: false },
    })
    revalidatePath('/')
  }

  return (
    <div className="svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-md border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start py-4 px-4 bg-zinc-950 gap-4">
        <h1 className="w-full text-left text-xl font-bold sm:text-2xl">Edit Profile</h1>
        <form action={editUsername}>
          <Button/>
        </form>
      </div>
    </div>
  )
}

export default User
