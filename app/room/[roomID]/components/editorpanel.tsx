import { EditorView, basicSetup } from "codemirror"
import { EditorState, Compartment } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { cpp } from '@codemirror/lang-cpp'
import { myTheme } from "@/app/lib/myTheme"

import * as Y from 'yjs'
import { yCollab } from 'y-codemirror.next'
import { WebrtcProvider } from 'y-webrtc'

import { useRef, useEffect, useState } from 'react'
import { useParams } from "next/navigation"
import useRoomStore from "@/app/lib/roomstore"
import ListBox from "./listbox"
import { languages } from "@/app/lib/languagelist"

const EditorPanel = () => {
  const { roomID } = useParams()

  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView>()
  const langCompRef = useRef<Compartment>()
  const providerRef = useRef<WebrtcProvider>()

  const lang = useRoomStore((s:any)=>s.lang)
  const userData = useRoomStore((s:any)=>s.userData)

  useEffect(()=>{
    for(let l of languages){
      if(lang.name===l.name){
        viewRef.current?.dispatch({
          effects: langCompRef.current?.reconfigure(l.func())
        })
        break
      }
    }
  }, [lang])

  useEffect(()=>{
    if(!userData || !editorRef.current){
      return
    }

    const createState = () => {
      const ydoc = new Y.Doc()
      providerRef.current = new WebrtcProvider(roomID, ydoc, {signaling: ['wss://yjs-signalling-shady41.onrender.com/']})
      const ytext = ydoc.getText('codemirror')
      const undoManager = new Y.UndoManager(ytext)
  
      providerRef.current.awareness.setLocalStateField('user', {
        name: userData.name,
        color: "#2563EB",
        colorLight: "#2563EB",
      })
      
      const extensions = [basicSetup, keymap.of([indentWithTab]), myTheme, EditorView.lineWrapping, yCollab(ytext, providerRef.current.awareness, { undoManager })]

      langCompRef.current = new Compartment
      extensions.push(langCompRef.current.of(cpp()))
  
      const state = EditorState.create({
        doc: ytext.toString(),
        extensions
      })
      
      console.log(ydoc)

      return state
    }

    viewRef.current = new EditorView({ state: createState(), parent: editorRef.current })

    return ()=>{
      viewRef.current?.destroy()
      providerRef.current?.destroy()
    }
  }, [userData])

  return (
    <div className="w-full h-full flex flex-col">
      <header className="px-2 py-2 w-full flex-shrink-0 flex items-center justify-between border-b border-white border-opacity-10 z-30">
        <ListBox/>
        <button type="submit" className={`text-xs py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors custom-outline flex items-center justify-center`}>
          Run Code
        </button>
      </header>
      <div className="w-full h-full flex text-lg font-serif" ref={editorRef}></div>
    </div>
  )
}

export default EditorPanel