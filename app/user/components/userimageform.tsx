"use client";
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Spinner from "@/app/components/spinner"

export interface Props {
  name?: string | null | undefined,
  userImage?: string | null | undefined,
  isPremium?: boolean | null | undefined
}

const UserimageForm = ({ name, userImage, isPremium }: Props) => {
  const [selected, setSelected] = useState<string>("/dicebear/avataaarsNeutral-0.svg")
  const [pending, setPending] = useState<boolean>(false)
  const [count, setCount] = useState<number>(5)

  const router = useRouter()

  const handleChangeLabel = (e: any) : void => {
    if(e.key==="Enter") setSelected(e.target.id)
  }
  const handleChange = (e: any) : void => {
    setSelected(e.target.value)
  }
  const handleSubmit = async() =>{
    setPending(true)
    const res = await fetch("/api/user/avatar", { method: "POST", body: JSON.stringify({ userimage: selected })})
    setPending(false)
    if(res.ok) router.refresh()
  }

  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <div className="grid grid-cols-5 gap-2 w-full">
        {[...Array(count)].map((im, idx)=><label key={`avataars-${idx}`} id={`/dicebear/avataaarsNeutral-${idx}.svg`} className={`overflow-hidden custom-outline cursor-pointer border-blue-600 border-4 border-opacity-30 bg-neutral-950 aspect-square relative ${ selected===`/dicebear/avataaarsNeutral-${idx}.svg` ? 'border-opacity-80' : 'hover:border-opacity-80' } rounded-lg`} tabIndex={0} onKeyUp={handleChangeLabel}>
          <Image src={`/dicebear/avataaarsNeutral-${idx}.svg`} alt="profile image" fill sizes="1rem"/>
          <input type="radio" name="userimage" value={`/dicebear/avataaarsNeutral-${idx}.svg`} checked={selected===`/dicebear/avataaarsNeutral-${idx}.svg`} onChange={handleChange} className="hidden" aria-hidden="true"/>
        </label>)}
      </div>
      <div className="grid grid-cols-5 gap-2 w-full">
        {[...Array(count)].map((im, idx)=><label key={`thumbs-${idx}`} id={`/dicebear/thumbs-${idx}.svg`} className={`overflow-hidden custom-outline cursor-pointer border-blue-600 border-4 border-opacity-30 bg-neutral-950 aspect-square relative ${ selected===`/dicebear/thumbs-${idx}.svg` ? 'border-opacity-80' : 'hover:border-opacity-80' } rounded-lg`} tabIndex={0} onKeyUp={handleChangeLabel}>
          <Image src={`/dicebear/thumbs-${idx}.svg`} alt="profile image" fill sizes="1rem"/>
          <input type="radio" name="userimage" value={`/dicebear/thumbs-${idx}.svg`} checked={selected===`/dicebear/thumbs-${idx}.svg`} onChange={handleChange} className="hidden" aria-hidden="true"/>
        </label>)}
      </div>
      <div className="w-full flex gap-2">
        <button className="text-sm py-3 rounded border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-1/2" onClick={()=>setCount(count=>count===5 ? 10 : 5)}>
          { count===5 ? "View More" : "View Less" }
        </button>
        <button disabled={ !isPremium || pending } className={`text-sm py-3 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-1/2 ${ (!isPremium) && 'cursor-not-allowed' } ${ pending && 'cursor-wait' } flex items-center justify-center`} onClick={ handleSubmit }>
          {pending ? <Spinner/> : 'Update'}
        </button>
      </div>
    </div>
  )
}
export default UserimageForm