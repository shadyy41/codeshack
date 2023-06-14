"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { useState, useEffect } from "react"
import Image from "next/image"
import Divider from "@/app/components/divider"
import { useRouter } from "next/navigation";

export interface Props {
  name?: string | null | undefined,
  userImage?: string | null | undefined,
  isPremium?: boolean | null | undefined
}

const ClientSide = ({ name, userImage, isPremium }: Props) => {
  const { pending } = useFormStatus()
  const router = useRouter()
  const [canSubmit, setCanSubmit] = useState<boolean>(true)
  const [selected, setSelected] = useState<string>("/dicebear/avataaarsNeutral-0.svg")

  useEffect(()=>{

  }, [selected])

  const handleChangeLabel = (e: any) : void => {
    if(e.key==="Enter") setSelected(e.target.id)
  }
  const handleChange = (e: any) : void => {
    setSelected(e.target.value)
  }

  return (
    <>
      <Divider text="Avataars Collection"/>
      <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full">
        {[...Array(10)].map((im, idx)=><label key={idx} id={`/dicebear/avataaarsNeutral-${idx}.svg`} className={`overflow-hidden custom-outline cursor-pointer border-blue-600 border-4 border-opacity-30 bg-neutral-950 aspect-square relative ${ selected===`/dicebear/avataaarsNeutral-${idx}.svg` ? 'border-opacity-80' : 'hover:border-opacity-80' } rounded-lg`} tabIndex={0} onKeyUp={handleChangeLabel}>
          <Image src={`/dicebear/avataaarsNeutral-${idx}.svg`} alt="profile image" fill sizes="1rem"/>
          <input type="radio" name="userimage" value={`/dicebear/avataaarsNeutral-${idx}.svg`} checked={selected===`/dicebear/avataaarsNeutral-${idx}.svg`} onChange={handleChange} className="hidden" aria-hidden="true"/>
        </label>)}
      </div>
      <Divider text="Thumbs Collection"/>
      <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full">
        {[...Array(10)].map((im, idx)=><label key={idx} id={`/dicebear/thumbs-${idx}.svg`} className={`overflow-hidden custom-outline cursor-pointer border-blue-600 border-4 border-opacity-30 bg-neutral-950 aspect-square relative ${ selected===`/dicebear/thumbs-${idx}.svg` ? 'border-opacity-80' : 'hover:border-opacity-80' } rounded-lg`} tabIndex={0} onKeyUp={handleChangeLabel}>
          <Image src={`/dicebear/thumbs-${idx}.svg`} alt="profile image" fill sizes="1rem"/>
          <input type="radio" name="userimage" value={`/dicebear/thumbs-${idx}.svg`} checked={selected===`/dicebear/thumbs-${idx}.svg`} onChange={handleChange} className="hidden" aria-hidden="true"/>
        </label>)}
      </div>
      <div className="w-full flex gap-2">
        <button onClick={(e)=>{
          e.preventDefault()
          router.back()
        }} className={`text-sm sm:text-base py-3 rounded-md border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-1/2`}>
          Back
        </button>
        <button type="submit" disabled={ !isPremium || pending || !canSubmit } className={`text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-1/2 ${ (!isPremium || !canSubmit) && 'cursor-not-allowed' } ${ pending && 'cursor-wait' }`}>
          {pending ? 'Updating...' : 'Update'}
        </button>
      </div>
    </>
  )
}
export default ClientSide