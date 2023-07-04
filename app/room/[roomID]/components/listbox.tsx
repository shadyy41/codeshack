import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import useRoomStore from '@/app/lib/roomstore'

const languages = [
  { name: 'C++' },
  { name: 'JavaScript' },
  { name: 'Java' },
  { name: 'Python' }
]

const ListBox = () => {
  const lang = useRoomStore((s:any)=>s.lang)
  const setLang = useRoomStore((s:any)=>s.setLang)

  useEffect(()=>{
    console.log(lang)
  }, [lang])

  return (
    <div className="w-32">
      <Listbox value={lang} onChange={setLang}>
        <div className="relative">
          <Listbox.Button className="w-full border border-white border-opacity-20 cursor-pointer pl-3 pr-2 rounded py-2 custom-outline text-xs flex items-center justify-between bg-neutral-900/50 hover:bg-neutral-900 transition-colors">
            <span>{lang.name}</span>
            <span className="">
              <ChevronDown aria-hidden="true" size={18}/>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded py-1 text-xs text-slate-300 border border-white border-opacity-20 bg-neutral-950 focus:outline-none transition-colors">
              {languages.map((l, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative select-none py-2 px-3 cursor-pointer custom-outline ${
                      active ? 'bg-neutral-900/50' : ''
                    }`
                  }
                  value={l}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {l.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default ListBox