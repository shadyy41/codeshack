"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom"

const Button = () => {
  const { pending } = useFormStatus()
  return (
    <button>{pending ? 'Wait' : 'Send'}</button>
  )
}

export default Button