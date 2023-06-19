"use client";
import { useParams, redirect } from "next/navigation"
import LeftPanel from "./leftpanel"
import RightPanel from "./rightpanel"
import CenterPanel from "./centerpanel"

const ClientSide = async () => {
  const { roomID } = useParams()

  return (
    <div className="h-full w-full flex items-center justify-center p-2 gap-2">
      <LeftPanel/>
      <CenterPanel/>
      <RightPanel/>
    </div>
  )
}

export default ClientSide


{/* <div className="h-full w-full border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 bg-neutral-950">
        <ClientSide/>
      </div> */}