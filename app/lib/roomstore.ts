import { create } from 'zustand'

const useRoomStore = create((set) => ({
  sidepanel: 0,
  centerpanel: 1, /* 1 2 3 : 1-> video grid, 2-> present, 3-> editor */
  userVideo: null,
  userAudio: null,
  peerCamStreams: [], 
  peerMicStreams: [],
  setSidepanel: (s:number) => set(() => ({ sidepanel:  s})),
  setCenterpanel: (s:number) => set(() => ({ centerpanel:  s})),
  setUserVideo: (s:any) => set(() => ({ userVideo:  s})),
  setUserAudio: (s:any) => set(() => ({ userAudio:  s})),
  setPeerCamStreams: (s: any)=> set((state:any)=> ({peerCamStreams: s})),
  setPeerMicStreams: (s: any)=> set((state:any)=> ({peerMicStreams: s}))
}))

export default useRoomStore