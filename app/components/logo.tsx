import Link from "next/link"
import Image from "next/image"
import logoSvg from "../../public/logo.svg"

export interface Props {
  showText: boolean;
}

const Logo = ({ showText }:Props) => {
  return (
    <Link href={"/"} className="custom-outline">
      {/* <span className="text-blue-600">{"<"}</span>{ showText ? "codeshack" : ""}<span className="text-blue-600">{"/>"}</span> */}
      <Image src={logoSvg} alt="codeshack-logo"/>
    </Link>
  )
}

export default Logo