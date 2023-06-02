"use client";
import AuthForm from "@/app/components/authform";
import Logo from "@/app/components/logo";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className='svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6'>
        <div className="h-fit w-full max-w-lg border rounded-sm border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 backdrop-blur-md">
          <Logo showText={false}/>
          <h2 className="text-xl font-medium font-mono text-slate-300">Loading...</h2>
        </div>
      </div>
    )
  }

  if (status === "authenticated") {
    router.push("/")
  }

{/* @ts-expect-error Server Component */}

  return <AuthForm/>
}