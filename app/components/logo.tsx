import Link from "next/link"
import Image from "next/image"
import logoSvg from "../../public/logo.svg"

export interface Props {
  showText: boolean;
}

import { Josefin_Sans as FontFamily } from "next/font/google"

const font = FontFamily({
  subsets: ['latin'],
  display: 'swap',
})

const Logo = ({ showText }:Props) => {
  return (
    <Link href={"/"} className={`custom-outline ${font.className} text-2xl`}>
      <span className="text-blue-600">{"<"}</span>{ showText ? "codeshack" : ""}<span className="text-blue-600">{"/>"}</span>
      {/* <Image src={logoSvg} alt="codeshack-logo" height={28}/> */}
    </Link>
  )
}

export default Logo