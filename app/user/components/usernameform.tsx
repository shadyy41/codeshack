"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { useState, useEffect } from "react"
import Spinner from "@/app/components/spinner"

export interface Props {
  name: string | null | undefined,
  userImage: string | null | undefined,
  isPremium: boolean | null | undefined
}

const UsernameForm = ({ name, userImage, isPremium }: Props) => {
  const { pending } = useFormStatus()
  const [name_s, setName_s] = useState(name)
  const [canSubmit, setCanSubmit] = useState<boolean>(true)

  useEffect(()=>{
    if(!name_s || !name_s.length) setCanSubmit(false)
    else setCanSubmit(true)
  }, [name_s])


  return (
    <>
      <div className="w-full flex gap-2">
        {/*@ts-ignore*/}
        <input type="text" name="name" value={name_s} onChange={e=>setName_s(e.target.value)} placeholder="Edit Username"  disabled={ !isPremium || pending } className={`text-sm sm:text-base w-4/6 text-slate-300 py-3 px-4 rounded-md border border-white border-opacity-20 hover:border-opacity-40 transition-colors custom-outline bg-transparent backdrop-blur-sm ${ !isPremium && 'cursor-not-allowed' } ${ pending && 'cursor-wait' }`}/>

        <button type="submit" disabled={ !isPremium || pending || !canSubmit } className={`text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-2/6 ${ (!isPremium || !canSubmit) && 'cursor-not-allowed' } ${ pending && 'cursor-wait' } flex items-center justify-center`}>
          {pending ? <Spinner/> : 'Update'}
        </button>
      </div>
    </>
  )
}

export default UsernameForm