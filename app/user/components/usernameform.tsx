"use client";
import Spinner from "@/app/components/spinner"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export interface Props {
  name: string | null | undefined,
  isPremium: boolean | null | undefined,
  email: string
}

const UsernameForm = ({ name, isPremium, email }: Props) => {
  const router = useRouter()
  const [name_s, setName_s] = useState(name)
  const [pending, setPending] = useState<boolean>(false)

  const handleChange = (e:any) =>{
    if(!isPremium || pending) return
    setName_s(e.target.value)
  }
  const handleSubmit = async() =>{
    if(!name_s || !name_s.length || name===name_s) return
    setPending(true)
    const res = await fetch("/api/user/username", { method: "POST", body: JSON.stringify({ username: name_s })})
    setPending(false)
    if(res.ok) router.refresh()
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <p>Email</p>
        <p className="text-sm text-slate-300 w-full py-3 px-4 rounded border border-white border-opacity-20 hover:border-opacity-40 transition-colors">{ email }</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p>Username</p>
        <div className="flex w-full gap-2">
          {/*@ts-ignore*/}
          <input type="text" name="name" value={name_s} onChange={handleChange} placeholder="Edit Username"  disabled={ !isPremium || pending } className={`text-sm w-full text-slate-300 py-3 px-4 rounded border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm ${ !isPremium && 'cursor-not-allowed' } ${ pending && 'cursor-wait' }`}/>
          <button disabled={ !isPremium || pending || name===name_s } className={`text-sm py-3 w-28 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline ${ (!isPremium || name===name_s) && 'cursor-not-allowed bg-blue-500' } ${ pending && 'cursor-wait' } flex items-center justify-center`} onClick={handleSubmit}>
            {pending ? <Spinner/> : 'Update'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsernameForm