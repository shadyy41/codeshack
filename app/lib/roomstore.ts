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
  userData: null,
  setUserData: (s:any) => set(() => ({ userData: s })),
  setLang: (s:string) => set(() => ({ lang:  s})),
  setLangAction: (s:any) => set(() => ({ langAction:  s})),
  setSidepanel: (s:number) => set(() => ({ sidepanel:  s})),
  setCenterpanel: (s:number) => set(() => ({ centerpanel:  s})),
  setUserVideo: (s:any) => set(() => ({ userVideo:  s})),
  setUserAudio: (s:any) => set(() => ({ userAudio:  s})),
  setPeerCamStreams: (s: any)=> set((state:any)=> ({peerCamStreams: s})),
  setPeerMicStreams: (s: any)=> set((state:any)=> ({peerMicStreams: s}))
}))

export default useRoomStore