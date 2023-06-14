"use client";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Spinner from "./spinner";

const CreateRoom = ({ authenticated }:{ authenticated: Boolean }) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)

  const createRoom = async () =>{
    if(!authenticated){
      router.push("/auth/signin")
      toast.error("You need to be signed in first.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/room/create")
      if(res.status!==200) throw new Error()
      const data = await res.json()
      if(!data) throw new Error()
      router.push(`/room/join?room=${data.roomId}`)
      toast.success("Room created successfully")
    } catch (error) {
      toast.error("Error in creating room")
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <button onClick={createRoom} className={`text-sm sm:text-base w-full py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline ${isLoading ? 'cursor-progress' : ''} flex items-center justify-center`} disabled={isLoading}>{isLoading ? <Spinner/> : 'Create Room'}</button>
  )
}

export default CreateRoom