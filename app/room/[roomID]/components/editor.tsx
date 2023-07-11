import { EditorView, basicSetup } from "codemirror"
import { EditorState, Compartment } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { cpp } from '@codemirror/lang-cpp'
import { myTheme } from "@/app/lib/myTheme"
import uniqolor from 'uniqolor'

import * as Y from 'yjs'
import { yCollab } from 'y-codemirror.next'
import { WebsocketProvider } from 'y-websocket'

import { useRef, useEffect } from 'react'
import { useParams } from "next/navigation"
import useRoomStore from "@/app/lib/roomstore"
import { languages } from "@/app/lib/languagelist"
import { toast } from "react-hot-toast"

const Editor = () => {
  const { roomID } = useParams()

  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView>()
  const langCompRef = useRef<Compartment>()
  const providerRef = useRef<WebsocketProvider>()

  const lang = useRoomStore((s:any)=>s.lang)
  const userData = useRoomStore((s:any)=>s.userData)

  const running = useRoomStore((s:any)=>s.running)
  const setRunning = useRoomStore((s:any)=>s.setRunning)

  const setOutput = useRoomStore((s:any)=>s.setOutput)

  const outputAction = useRoomStore((s:any)=>s.outputAction)

  const editorConnected = useRoomStore((s:any)=>s.editorConnected)
  const setEditorConnected = useRoomStore((s:any)=>s.setEditorConnected)

  useEffect(()=>{
    const get_details = async(p:any)=> {
      const payload = new URLSearchParams({
        id: p.id,
        api_key: 'guest'
      })

      const querystring = payload.toString()
      const raw = await fetch(`https://api.paiza.io/runners/get_details?${querystring}`)
      const res = await raw.json()

      return res
    }

    const create = async(source_code: any)=>{
      const data = JSON.stringify(
        {
          api_key: "guest",
          language: lang.value,
          source_code,
          longpoll: true
        }
      )

      const options = {
        body: data,
        method: "POST",
        headers : { 'Content-Type': 'application/json' }
      }

      const raw = await fetch('https://api.paiza.io/runners/create', options)

      const res = await raw.json()

      return get_details(res)
    }
    const handleRun = async() => {
      const source_code = viewRef.current?.state.doc.toString()
      try {
        const res = await create(source_code)
        const {stdout, build_result, build_stderr, build_stdout, result, stderr, time} = res
        let message
        if(build_result==='failure'){ //compilation error
          message = build_stderr + "\n" + build_stdout
        }
        else{
          if(result==="success"){
            message = stdout
          }
          else if(result==="timeout"){
            message = "Code took longer than 1.00 secs to run"
          }
          else{
            message = stderr + "\n" + stdout
          }
        }

        setOutput(message)
        outputAction[0]({result: message})
      } catch(e){
        toast.error("An error occured")
      }
      finally{
        setRunning(false)
      }
    }
    if(running){
      handleRun()
    }
  }, [running, lang])

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

    const color = uniqolor(userData.name).color

    providerRef.current.awareness.setLocalStateField('user', {
      name: userData.name,
      color: color,
      colorLight: color,
    })

    providerRef.current.on("status", (s:any)=>{
      if(s.status==="connected"){
        setEditorConnected(true)
        toast.success("Editor connected.")
      }
    })

    providerRef.current.on("connection-error", ()=>{
      toast.error("Editor connection failed.")
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
      <div className={`w-full ${editorConnected ? "flex" : "hidden"} flex-grow text-sm font-serif scroll-pb-10 overflow-auto`} ref={editorRef}></div>
      {!editorConnected && <div className="w-full flex-grow flex items-center justify-center"><h2 className="text-slate-300 text-lg sm:text-xl">Connecting editor...</h2></div>}
    </>
  )
}

export default Editor