import Link from "next/link"

export interface Props {
  showText: boolean;
}

const Logo = ({ showText }:Props) => {
  return (
    <span className="font-logo text-3xl">
      <Link href={"/"} className="custom-outline">
        <span className="text-blue-600">{"<"}</span>{ showText ? "codeshack" : ""}<span className="text-blue-600">{"/>"}</span>
      </Link>
    </span>
  )
}

export default Logo