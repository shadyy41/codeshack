import Tippy from "@tippyjs/react"
import 'tippy.js/animations/scale-subtle.css'

const Button = ({ children, content, onClickHandler }: { children: React.ReactNode, content: string, onClickHandler?: any }) => {
  return (
    <Tippy content={content} className="bg-neutral-950 text-slate-300 border border-white border-opacity-20 p-2 rounded text-xs" placement="right" animation="scale-subtle" hideOnClick={false}>
      <button className={`custom-outline flex items-center justify-center p-2 border border-white border-opacity-20 rounded bg-neutral-900/50 hover:bg-neutral-900 transition-colors`} onClick={onClickHandler}>
        {children}
      </button>
    </Tippy>
  )
}

export default Button