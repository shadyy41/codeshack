import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/lib/prismaclient"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout'
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user, trigger }) {
      session.user.id = user.id
      session.user.isPremium = user.isPremium
      return session
    }
  }
}

const handler = NextAuth(
  authOptions
)

export { handler as GET, handler as POST }