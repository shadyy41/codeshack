import { EditorView, basicSetup } from "codemirror"
import { EditorState, Compartment } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { cpp } from '@codemirror/lang-cpp'
import { myTheme } from "@/app/lib/myTheme"

import * as Y from 'yjs'
import { yCollab } from 'y-codemirror.next'
import { WebsocketProvider } from 'y-websocket'

import { useRef, useEffect, useState } from 'react'
import { useParams } from "next/navigation"
import useRoomStore from "@/app/lib/roomstore"
import ListBox from "./listbox"
import { languages } from "@/app/lib/languagelist"

const Editor = () => {
  const { roomID } = useParams()

  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView>()
  const langCompRef = useRef<Compartment>()
  const providerRef = useRef<WebsocketProvider>()

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

    const ydoc = new Y.Doc()
    
    const ytext = ydoc.getText('codemirror')
    const undoManager = new Y.UndoManager(ytext)

    providerRef.current = new WebsocketProvider("wss://codeshack-ws-server.onrender.com/", roomID, ydoc)

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

    viewRef.current = new EditorView({ state, parent: editorRef.current })

    return ()=>{
      viewRef.current?.destroy()
      providerRef.current?.destroy()
    }
  }, [userData])

  return (
    <>
      <div className="w-full h-full flex text-lg font-serif" ref={editorRef}></div>
    </>
  )
}

export default Editor