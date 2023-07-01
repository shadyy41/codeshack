import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check } from 'lucide-react'
import { ChevronDown } from 'lucide-react'

const people = [
  { name: 'C++' },
  { name: 'JavaScript' },
  { name: 'Java' },
  { name: 'Python' }
]

const ListBox = () => {
  const [selected, setSelected] = useState(people[0])

  return (
    <div className="w-32">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="w-full border border-white border-opacity-20 cursor-pointer pl-3 pr-2 rounded py-2 custom-outline text-xs flex items-center justify-between bg-neutral-900/50 hover:bg-neutral-900 transition-colors">
            <span>{selected.name}</span>
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
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative select-none py-2 px-3 cursor-pointer custom-outline ${
                      active ? 'bg-neutral-900/50' : ''
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
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