import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import Image from "next/image"
import FormHeader from "@/app/components/formheader"
import { redirect } from "next/navigation"

const UserData = async () => {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name
  const userImage = session?.user?.image
  const isPremium = session?.user?.isPremium
  if(!session) redirect('/')

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center pt-4 px-4">
      <div className="w-1/2 aspect-square relative rounded-full overflow-hidden border-4 border-blue-600">
        <Image src={userImage ? userImage : "/default-user.png"} alt="Profile Picture" priority={true} fill/>
      </div>
      <div>
      <FormHeader text={ name ? name : "Username" }/>
      { isPremium ? <p className="text-sm w-full px-4 premium-text font-medium">Premium User</p> : <p className="text-sm w-full px-4 text-slate-300 font-medium">{ isPremium ? "Premium User" : "Free User"}</p>}
      </div>
    </div>
  )
}

export default UserData