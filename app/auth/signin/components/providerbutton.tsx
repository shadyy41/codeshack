"use client";
import { ClientSafeProvider } from "next-auth/react"
import { signIn } from "next-auth/react"

export interface Props {
  provider: ClientSafeProvider
}

const ProviderButton = ({ provider } : Props) => {
  return (
    <button key={provider.name} className="text-sm py-3 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm"  onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
      Continue with { provider.name }
    </button>
  )
}

export default ProviderButton