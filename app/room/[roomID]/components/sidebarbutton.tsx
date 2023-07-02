import Tippy from "@tippyjs/react"
import 'tippy.js/animations/scale-subtle.css'

const Button = ({ children, content, onClickHandler, active, danger }: { children: React.ReactNode, content: string, onClickHandler?: any, active: boolean, danger?: boolean }) => {

  if(danger){
    return (
      <Tippy content={content} className="bg-neutral-950 text-slate-300 border border-white border-opacity-20 p-2 rounded text-xs" placement="right" animation="scale-subtle" hideOnClick={false}>
        <button className={`custom-outline text-red-600 text-opacity-80 flex items-center justify-center p-2 border border-red-600 border-opacity-50 rounded hover:bg-neutral-900 transition-colors ${ active ? 'bg-neutral-900' : 'bg-neutral-900/50' }`} onClick={onClickHandler}>
          {children}
        </button>
      </Tippy>
    )
  }

  return (
    <Tippy content={content} className="bg-neutral-950 text-slate-300 border border-white border-opacity-20 p-2 rounded text-xs" placement="right" animation="scale-subtle" hideOnClick={false}>
      <button className={`custom-outline flex items-center justify-center p-2 border border-white ${ active ? 'border-opacity-50' : 'border-opacity-20' } rounded hover:bg-neutral-900 transition-colors ${ active ? 'bg-neutral-900' : 'bg-neutral-900/50' }`} onClick={onClickHandler}>
        {children}
      </button>
    </Tippy>
  )
}

export default Button