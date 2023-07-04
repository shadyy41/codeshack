import React, { useEffect, useRef } from 'react'

const CamVideo = ( { stream }: { stream: any } ) => {
  const videoRef = useRef<any>(null)

  useEffect(()=>{
    videoRef.current.srcObject = stream
  }, [stream])

  return (
    <div className="flex-shrink-0 aspect-video overflow-hidden border rounded border-white border-opacity-20 bg-neutral-950 flex items-center justify-center">
      <video className={`aspect-video w-full`} ref={videoRef} autoPlay playsInline muted={true}/>
    </div>
  )
}

export default CamVideo