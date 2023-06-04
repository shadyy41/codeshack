import Logo from "@/app/components/logo"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOutButton from "./components/signoutbutton"

export default async function SignOut() {
  const session = await getServerSession(authOptions)

  if(session===null) redirect('/')

  return (
    <div className='svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6'>
      <div className="h-fit w-full max-w-lg border rounded-sm border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 backdrop-blur-md">
        <Logo showText={false}/>
        <h2 className="text-xl font-medium font-mono text-slate-300">Are you sure you want to sign out?</h2>
        <SignOutButton/>
      </div>
    </div>
  )
}
// "use client";
// import Logo from "@/app/components/logo";
// import { signOut } from "next-auth/react"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"

// export default function SignIn() {
//   const router = useRouter()
//   const session = useSession()

//   if (session?.status === "unauthenticated") {
//     router.push("/")
//   }

//   return (
//     <div className='svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6'>
//       <div className="h-fit w-full max-w-lg border rounded-sm border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 backdrop-blur-md">
//         <Logo showText={false}/>
//         <h2 className="text-xl font-medium font-mono text-slate-300">Are you sure you want to sign out?</h2>
//         <button className="py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-xs font-mono" onClick={() => signOut( { callbackUrl: '/' } )}>
//             Sign Out
//         </button>
//       </div>
//     </div>
//   )
// }