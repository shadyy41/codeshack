"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"

const options = [
  {
    name: "General",
    href: "/user"
  },
  {
    name: "Rooms",
    href: "/user/rooms"
  }
]

const Links = () => {
  const path = usePathname()

  return (
    <>
      {
        options.map((e, idx)=><Link className={`custom-outline px-4 py-2 hover:bg-zinc-900 transition-colors ${e.href===path && "border-blue-600 border-r-4 bg-zinc-900"}`} href={e.href} key={idx}>{e.name}</Link>)
      }
    </>
  )
}

export default Links