import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import Razorpay from "razorpay"
import { nanoid } from "nanoid"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if(!session) return NextResponse.json({message: "Unauthenticated"}, {status: 401})

  const { RZP_ID, RZP_SECRET } = process.env
  if(!RZP_ID || !RZP_SECRET) return NextResponse.json({ message: "Server Error" }, { status: 500 })

  const razorpay = new Razorpay({
    key_id: RZP_ID,
    key_secret: RZP_SECRET,
  })

  const payment_capture = 1
  const amount = 2
  const currency = "INR"
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: nanoid(),
    payment_capture,
  }

  try {
    const res= await razorpay.orders.create(options);
    console.log(res)
    return NextResponse.json({ id: res.id, currency: res.currency, amount: res.amount }, { status: 200 })
  } catch (err) {
    console.log("Payment catch block: ", err)
    return NextResponse.json({ message: "Error occured during payment" }, { status: 400 })
  }
}
