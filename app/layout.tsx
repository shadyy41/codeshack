import './globals.css'
import Navbar from '@/app/components/navbar'
import NextTopLoader from 'nextjs-toploader'
import AuthContext from './context/AuthContext'

export const metadata = {
  title: 'CodeShack',
  description: 'P2P Video calling app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-primary-dark text-primary-light h-full">
        <AuthContext>
          <NextTopLoader showSpinner={false} shadow={false} height={3} color='#2563EB'/>
          <div className="flex flex-col h-full">
            <Navbar/>
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </AuthContext>
      </body>
    </html>
  )
}
