"use client";
import { Fragment } from "react"
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/20/solid"
import Image from "next/image";

export interface Props {
  authenticated: boolean,
  name: string | null | undefined,
  userImage: string | null | undefined,
  isPremium: boolean | null | undefined
}

const UserMenu = ({authenticated, name, userImage, isPremium} : Props) => {
  return (
    authenticated ? 
    <Menu as="div" className="relative inline-block text-left">
      <div className="w-8 h-8">
        <Menu.Button className="w-full h-full rounded-full relative overflow-hidden custom-outline bg-blue-600">
          {userImage ? <Image src={userImage} alt="Profile Picture" priority={true} height={32} width={32}/> : <UserCircleIcon height={36} width={36} color="#fbf8f8"/>}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-zinc-950 shadow-lg ring-1 ring-white ring-opacity-10 focus:outline-none">
          <div className="py-1 text-slate-300">
            <Menu.Item>
              <div className="block py-2 border-b border-white border-opacity-5">
                <p className= 'w-full px-4 text-xs text-slate-400'>
                  Signed in as
                </p>
                <p className="w-full px-4">
                  {name}
                </p>
                {isPremium && <p className="text-sm w-full px-4 premium-text">Premium User</p>}
              </div>
            </Menu.Item>
            {!isPremium && <Menu.Item>
              <Link href="/premium" className="block w-full px-4 py-2 text-left hover:from-yellow-600 hover:to-yellow-300 transition-colors premium-text">Buy Premium</Link>
            </Menu.Item>}
            <Menu.Item>
              <Link href="/user" className="block w-full px-4 py-2 text-left hover:text-white transition-colors">Edit profile</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/auth/signout" className="block w-full px-4 py-2 text-left hover:text-white transition-colors">Sign out</Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    : 
    <>
      <ul className="hidden text-md sm:flex gap-2 items-center">
        <Link className="custom-outline px-4 py-1 rounded-lg hover:text-white transition-colors" href="/auth/signin">
          <li>
            Login
          </li>
        </Link>
        <Link href="/auth/signin" className="custom-outline px-4 py-1 rounded-lg bg-blue-600 hover:cursor-pointer hover:bg-blue-500 transition-colors">
          <li>
            Sign Up
          </li>
        </Link>
      </ul>
      <Menu as="div" className="sm:hidden relative inline-block text-left">
        <div className="w-8 h-8">
          <Menu.Button className="sm:hidden custom-outline w-full h-full">
            <Bars3Icon height={32} width={32} aria-hidden="true"/>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right  rounded-md bg-zinc-950 shadow-lg ring-1 ring-white ring-opacity-10 focus:outline-none">
            <div className="py-1 text-slate-300">
              <Menu.Item>
                <Link href="/auth/signin" className="block w-full px-4 py-2 text-left hover:text-white transition-colors">Log in</Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/auth/signin" className="block w-full px-4 py-2 text-left hover:text-white transition-colors">Sign up</Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default UserMenu