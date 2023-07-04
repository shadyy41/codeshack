import useRoomStore from "@/app/lib/roomstore"
import CamVideo from "./camvideo"
import { PeerStreamData } from "./clientside"

const VideoGrid = () => {
  const userVideo = useRoomStore((s:any)=>s.userVideo)
  const peerCamStreams:Array<PeerStreamData> = useRoomStore((s:any)=>s.peerCamStreams)


  return (
    <div className="flex-grow h-full flex flex-col lg:flex-row gap-2 p-2 flex-wrap items-center justify-center overflow-auto">
      { userVideo && <CamVideo stream={userVideo}/> }
      { peerCamStreams.length>0 && peerCamStreams.map(d=>{
        return <CamVideo stream={d.stream} key={d.peerID}/>
      }) }

      { !userVideo && peerCamStreams.length===0 && <h2 className="text-slate-300 text-lg sm:text-xl">Camera streams unavailable.</h2> }
    </div>
  )
}

export default VideoGrid