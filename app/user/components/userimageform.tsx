"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export interface Props {
  name?: string | null | undefined,
  userImage?: string | null | undefined,
  isPremium?: boolean | null | undefined
}

const UserimageForm = ({ name, userImage, isPremium }: Props) => {
  const { pending } = useFormStatus()
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
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
        {[...Array(6)].map((im, idx)=><label key={idx} id={`/dicebear/avataaarsNeutral-${idx}.svg`} className={`overflow-hidden custom-outline cursor-pointer hover:border-opacity-40 bg-neutral-950 aspect-square relative ${ selected===`/dicebear/avataaarsNeutral-${idx}.svg` ? 'backg' : 'border-opacity-10' } rounded-lg`} tabIndex={0} onKeyUp={handleChangeLabel}>
          <Image src={`/dicebear/avataaarsNeutral-${idx}.svg`} alt="profile image" fill sizes="1rem"/>
          <input type="radio" name="userimage" value={`/dicebear/avataaarsNeutral-${idx}.svg`} checked={selected===`/dicebear/avataaarsNeutral-${idx}.svg`} onChange={handleChange} className="hidden" aria-hidden="true"/>
        </label>)}
      </div>
      <div className="w-full flex gap-2 text-sm">
        <Link href={"/user/collections"} className={`py-3 rounded-md border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-1/2`}>
          View More
        </Link>
        <button type="submit" disabled={ !isPremium || pending || !canSubmit } className={`py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-1/2 ${ (!isPremium || !canSubmit) && 'cursor-not-allowed' } ${ pending && 'cursor-wait' }`}>
          {pending ? 'Updating...' : 'Update'}
        </button>
      </div>
    </>
  )
}
export default UserimageForm