import { create } from 'zustand'
import { languages } from './languagelist'

const useRoomStore = create((set) => ({
  sidepanel: 0,
  centerpanel: 2, /* 1 2 3 : 1-> video grid, 2-> editor, 3-> present */
  userVideo: null,
  userAudio: null,
  peerCamStreams: [], 
  peerMicStreams: [],
  lang: languages[0],
  langAction: null,
  output: "",
  outputAction: null,
  userData: null,
  running: false,
  setRunning: (s:boolean) => set(() => ({ running:  s })),
  setOutput: (s:any) => set(() => ({ output:  s })),
  setOutputAction: (s:any) => set(() => ({ outputAction:  s })),
  setUserData: (s:any) => set(() => ({ userData: s })),
  setLang: (s:string) => set(() => ({ lang:  s})),
  setLangAction: (s:any) => set(() => ({ langAction:  s })),
  setSidepanel: (s:number) => set(() => ({ sidepanel:  s })),
  setCenterpanel: (s:number) => set(() => ({ centerpanel:  s })),
  setUserVideo: (s:any) => set(() => ({ userVideo:  s })),
  setUserAudio: (s:any) => set(() => ({ userAudio:  s })),
  setPeerCamStreams: (s: any)=> set((state:any)=> ({peerCamStreams: s })),
  setPeerMicStreams: (s: any)=> set((state:any)=> ({peerMicStreams: s }))
}))

export default useRoomStore