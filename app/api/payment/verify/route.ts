import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismaclient"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if(!session) return NextResponse.json({message: "Unauthenticated"}, {status: 401})

  const { RZP_SECRET } = process.env
  if(!RZP_SECRET) return NextResponse.json({ message: "Server Error" }, { status: 500 })
  const { order_id,  payment_id, signature} = await request.json()

  if(validatePaymentVerification({order_id, payment_id}, signature, RZP_SECRET)){
    try {
      await prisma.user.update({
        where: { id: session.user?.id },
        data: { isPremium: true },
      })
    } catch (error) {
      console.log(error, "COULD NOT UPDATE PREMIUM STATUS", session.id)
    }
    return NextResponse.json({ message: "Payment verified" }, { status: 200 })
  }
  else return NextResponse.json({ message: "Payment could not be verified" }, { status: 402 })
}
