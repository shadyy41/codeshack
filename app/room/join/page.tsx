import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import BackButton from '@/app/auth/components/backbutton'
import ClientSide from './components/clientside'
import Divider from '@/app/components/divider'
import FormHeader from '@/app/components/formheader'

export default async function Room() {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name

  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-sm border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 bg-neutral-950">
        <FormHeader text="Join Room"/>
        <Divider text="Enter Room Details"/>
        <ClientSide name={name}/>
        <BackButton/>
      </div>
    </div>
  )
}