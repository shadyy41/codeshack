import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/app/lib/prismaclient"
import ClientSide from "./components/clientside"
import { redirect } from "next/navigation"
import FormHeader from "@/app/components/formheader"

const Collections = async () => {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name
  const userImage = session?.user?.image
  //@ts-ignore

  const isPremium = session?.user?.isPremium

  if(!session || !isPremium) redirect('/')

  const editUserimage = async (data: FormData) => {
    "use server";
    if(!session) return
    const img = data.get('userimage')
    await prisma.user.update({
    //@ts-ignore
      where: { id: session?.user?.id },
      data: { image: img },
    })
    revalidatePath('/')
  }

  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-xl border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start py-4 px-4 bg-zinc-950 gap-4">
        <FormHeader text="Edit User Image"/>
        <form action={editUserimage} className="w-full flex flex-col items-center justify-center gap-4">
          <ClientSide name={ name } userImage = { userImage } isPremium = { isPremium }/>
        </form>
      </div>
    </div>
  )
}

export default Collections