"use client";
import Script from "next/script"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"
import Divider from "@/app/components/divider"
import Spinner from "@/app/components/spinner"
import BackButton from "@/app/auth/components/backbutton"

export interface Props {
  authenticated: boolean,
  isPremium: boolean | null | undefined
}

const ClientSide = ({ authenticated, isPremium }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const makePayment = async () => {
    if(!authenticated){
      router.push("/auth/signin")
      toast.error("You need to be signed in first.")
      return
    }
    if(isPremium){
      toast.error("You are already a premium user.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/payment", { method: "POST" })
      if(res.status!==200) throw new Error()
      const data = await res.json()
      if(!data) throw new Error()
      const options = {
        name: data.name,
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Testing Description",
        //@ts-ignore
        handler: async (response) => {
          setLoading(true)
          const body = {
            signature: response.razorpay_signature,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id
          }
          try {
            const res = await fetch("/api/payment/verify", { method: "POST", body: JSON.stringify(body)})
            if(res.status!==200) throw new Error()
            toast.success('Payment Successful!', {duration: 5000})

            router.replace('/')
            router.refresh()
          } catch (error) {
            toast.error("Unable to verify payment")
          }  
          finally {
            setLoading(false)
          }
        },
        prefill: {
          name: "John Doe",
          email: "jdoe@example.com",
          contact: "9876543210",
        },
      }
      //@ts-ignore
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      //@ts-ignore
      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.")
        toast.error("Payment failed. Please try again.")
      })
    } catch (error) {
      toast.error("Unable to initialize payment")
      return
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="h-fit w-full max-w-sm border rounded border-white border-opacity-10 flex flex-col items-center justify-start p-2 bg-zinc-950 gap-2">
        <h1 className="text-xl font-bold sm:text-2xl premium-text">Premium</h1>
        <Divider text="Lifetime Access"/>
        <div className="flex gap-1 flex-col w-full py-3">
          <p className="text-slate-200 text-4xl font-medium">
            <span className="font-thin">&#36;</span>4.99
          </p>
          <p className="text-lg text-slate-300 w-full flex flex-col">
            Customized username, profile pictures, and more.
          </p>
        </div>
        <Divider text="Powered by Razorpay"/>
        <button className={`text-sm py-3 rounded bg-blue-600 text-white hover:bg-blue-500 ${loading ? 'cursor-wait' : ''} transition-colors custom-outline w-full max-w-sm flex items-center justify-center`} onClick={makePayment} disabled={loading}>
          {loading ?  <Spinner/>  : 'Join Premium'}
        </button>
        <BackButton/>
      </div>
    </div>
  )
}

export default ClientSide