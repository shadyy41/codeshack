import Link from "next/link"
import { Josefin_Sans } from "next/font/google"

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export interface Props {
  showText: boolean;
}

const Logo = ({ showText }:Props) => {
  return (
    <span className={`text-3xl ${josefin.className}`}>
      <Link href={"/"} className="custom-outline">
        <span className="text-blue-600">{"<"}</span>{ showText ? "codeshack" : ""}<span className="text-blue-600">{"/>"}</span>
      </Link>
    </span>
  )
}

export default Logo