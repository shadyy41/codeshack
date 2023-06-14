import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import BackButton from '@/app/auth/components/backbutton'
import ClientSide from './components/clientside'
import Divider from '@/app/components/divider'

export default async function Room() {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name

  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-sm border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 bg-neutral-950">
        <h1 className="w-full text-xl font-bold sm:text-2xl">Join Room</h1>
        <Divider text="Enter room details"/>
        <ClientSide name={name}/>
        <BackButton/>
      </div>
    </div>
  )
}