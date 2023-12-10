import Divider from "../components/divider"
import Links from "./components/links"
import UserData from "./components/userdata"

export const metadata = {
  title: 'Profile'
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="w-full flex flex-col sm:flex-row items-start justify-center gap-1 px-1 text-center py-1">
      <div className="w-full sm:max-w-xs border rounded border-white border-opacity-10 flex flex-col items-center justify-start bg-zinc-950 gap-2">
        {/*@ts-ignore*/}
        <UserData/>
        <Divider/>
        <div className="w-full flex flex-col text-start text-slate-300 text-lg font-light pb-4 gap-1">
          <Links/>
        </div>
      </div>
      <div className="w-full max-w-xl border rounded border-white border-opacity-10">
        { children }
      </div>
    </div>
  )
}