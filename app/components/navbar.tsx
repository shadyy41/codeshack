'use client';

import Logo from "./logo"
import { Fragment } from "react"
import Link from 'next/link'
import { Menu, Transition } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/20/solid"
import { useSession } from "next-auth/react"

const Navbar = () => {
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email

  if (status === "loading") {
    return <nav className="px-8 py-6 flex items-center justify-between sm:px-16 flex-shrink-0 border-b border-white border-opacity-10">
      <Logo showText={true}/>
    </nav>
  }

  if (status === "authenticated") {
    return (
      <nav className="px-8 py-6 flex items-center justify-between sm:px-16 flex-shrink-0 border-b border-white border-opacity-10">
        <Logo showText={true}/>
        <p>Signed in as {userEmail}</p>
        <Link href="/auth/signout">Sign out</Link>
      </nav>
    )
  }

  return (
    <nav className="px-8 py-6 flex items-center justify-between sm:px-16 flex-shrink-0 border-b border-white border-opacity-10">
      <Logo showText={true}/>
      <ul className="hidden text-lg sm:flex gap-2 font-mono items-center">
        <Link className="custom-outline px-4 py-1 rounded-lg transition-colors" href="/auth/signin">
          <li>
            Login
          </li>
        </Link>
        <Link href="/signup" className="custom-outline px-4 py-1 rounded-lg bg-blue-600 hover:cursor-pointer hover:bg-blue-500 transition-colors">
          <li>
            Sign Up
          </li>
        </Link>
      </ul>

      <Menu as="div" className="sm:hidden relative inline-block text-left">
        <div>
          <Menu.Button className="sm:hidden custom-outline">
          <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right  rounded-md bg-primary-dark shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
            <div className="py-1 text-slate-300 font-mono">
              <Menu.Item>
                <div className="block py-2 text-slate-400 border-b border-white border-opacity-5">
                  <p className= 'w-full px-4 text-sm'>
                    Signed in as
                  </p>
                  <p className= 'w-full px-4 font-mono'>
                    shady41
                  </p>
                </div>
              </Menu.Item>
              <Menu.Item>
                <button className= 'block w-full px-4 py-2 text-left'>
                  Log in
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className= 'block w-full px-4 py-2 text-left'>
                  Sign up
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  )
}

export default Navbar