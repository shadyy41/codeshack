import './globals.css'
import Navbar from '@/app/components/navbar'
import NextTopLoader from 'nextjs-toploader'
import AuthContext from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import { Chivo as FontFamily } from "next/font/google"

/* 
Rubik
Inter
Lexend
Chivo
Golos_Text
*/

const font = FontFamily({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'CodeShack',
    template: '%s | CodeShack',
  },
  description: 'P2P Video calling app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full ${font.className}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png"sizes="180x180"/>
      </head>
      <body className="bg-zinc-950 text-slate-100 h-full">
        <AuthContext>
          <NextTopLoader showSpinner={false} shadow={false} height={3} color='#2563EB'/>
          <div className="flex flex-col h-full">
            {/* @ts-ignore */}
            <Navbar/>
            <Toaster toastOptions={{
              duration: 3000,
              style: {
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fbf8f8',
                background: 'rgb(10, 10, 10)',
                fontSize: '14px'
              },
              success: {
                iconTheme: {
                  primary: '#2563EB',
                  secondary: '#fbf8f8',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fbf8f8',
                },
              },
            }}/>
            <main className="flex-grow overflow-hidden">
              {children}
            </main>
          </div>
        </AuthContext>
      </body>
    </html>
  )
}
