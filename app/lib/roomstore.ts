import { create } from 'zustand'

const useRoomStore = create((set) => ({
  sidepanel: 1,
  centerpanel: 1,
  setSidepanel: (s:number) => set(() => ({ sidepanel:  s})),
  setCenterpanel: (s:number) => set(() => ({ centerpanel:  s}))
}))

export default useRoomStore