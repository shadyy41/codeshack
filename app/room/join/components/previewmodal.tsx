import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import Divider from "@/app/components/divider"
import Spinner from "@/app/components/spinner"

const PreviewModal = ({ isOpen, setIsOpen, joinRoom, isLoading } : any) => {
  const streamRef = useRef<any>()
  const videoRef = useRef<any>()
  const [videoLoading, setVideoLoading] = useState<boolean>(true)

  useEffect(()=>{
    if(!navigator.mediaDevices){
      toast.error("Media devices unavailable")
      setIsOpen(false)
      return
    }
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream=>{
      videoRef.current.srcObject = stream
      streamRef.current = stream
      setVideoLoading(false)
    }).catch(()=>{
      toast.error("Permissions denied.")
      setIsOpen(false)
    })

    return ()=>{
      //Unmount
      streamRef?.current?.getTracks().forEach(function(track:any) {
        track.stop()
      })
    }
  }, [])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900 bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden border rounded-lg border-white border-opacity-10 bg-zinc-950 p-4 text-center flex flex-col gap-4 transition-all">
                  <Dialog.Title
                    as="h3"
                    className="w-full text-xl font-bold sm:text-2xl text-white"
                  >
                    Video Preview
                  </Dialog.Title>
                  <Divider/>
                  <div className="w-full aspect-video overflow-hidden border rounded-lg border-white border-opacity-20 bg-neutral-950 flex items-center justify-center">
                    {videoLoading && <Spinner/>} 
                    <video className={`w-full aspect-video ${videoLoading ? 'hidden' : 'block'}`} ref={videoRef} autoPlay playsInline />
                  </div>
                  <Divider/>

                  <div className="flex gap-2">
                    <button type="button" className="text-sm sm:text-base py-3 rounded-md border border-white border-opacity-20 text-white hover:bg-neutral-900 bg-neutral-950 transition-colors custom-outline w-full max-w-sm" onClick={()=>setIsOpen(false)}>
                      Close
                    </button>
                    <button className={`text-sm sm:text-base py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline w-full max-w-sm ${isLoading ? 'cursor-progress' : ''} flex items-center justify-center`} onClick={joinRoom} disabled={isLoading}>
                      {isLoading ? <Spinner/> : 'Join Room'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default PreviewModal