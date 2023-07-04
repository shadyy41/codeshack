export const metadata = {
  title: 'Auth'
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-sm border rounded border-white border-opacity-10 flex flex-col items-center justify-start gap-2 p-2 bg-zinc-950">
        {children}
      </div>
    </div>
  )
}