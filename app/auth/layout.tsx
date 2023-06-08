export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <div className="h-fit w-full max-w-sm border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 bg-neutral-950">
        {children}
      </div>
    </div>
  )
}