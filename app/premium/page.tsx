"use client";
import Script from "next/script"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Premium = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const makePayment = async () => {
    if(loading) return

    setLoading(true)
    const data = await fetch("/api/payment", { method: "POST" }).then((t) => t.json()).catch((e)=>{
      console.log("Error", e)
      return
    })
    const options = {
      name: data.name,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Testing Description",
      handler: async (response) => {
        const body = {
          signature: response.razorpay_signature,
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id
        }
        const data = await fetch("/api/payment/verify", { method: "POST", body: JSON.stringify(body)}).then((t) => t.json())
        console.log(response)
        router.replace('/')
        router.refresh()
      },
      prefill: {
        name: "John Doe",
        email: "jdoe@example.com",
        contact: "9876543210",
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help")
    })

    setLoading(false)
  }

  return (
    <div className="svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center py-6">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="h-fit w-full max-w-sm border rounded-lg border-white border-opacity-10 flex flex-col items-center justify-start gap-4 py-4 px-4 backdrop-blur-md">
        <h2 className="text-lg font-medium font-mono text-slate-300">Premium Features</h2>
        <button className={`py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 ${loading ? 'bg-blue-300 hover:bg-blue-300 cursor-wait' : ''} transition-colors custom-outline w-full max-w-sm font-mono`} onClick={makePayment}>
          Unlock Premium
        </button>
      </div>
    </div>
  )
}

export default Premium
