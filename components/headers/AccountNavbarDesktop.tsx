'use client'
import React, {Fragment} from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import { Menu, Transition } from '@headlessui/react';
import {classNames} from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function AccountNavbarDesktop() {
    const { status, data: session } = useSession()

    if (status === 'loading')
        return <div className='w-[44px] opacity-0 lg:w-[230px] '> - </div>

    if (!session || typeof session.user === 'undefined') {
        return (
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 lg:w-[230px]">
                <button onClick={() => signIn()} className="border-b-2 py-5 mt-1 navbar-text">
                    Sign in
                </button>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true"/>
                <Link href={`/createaccount`} className="border-b-2 py-5 mt-1 navbar-text">
                    Create account
                </Link>
            </div>
        )
    }


    return (
        <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3 lg:pl-10 lg:w-[230px]">
            <p className='hidden lg:block w-32 text-right border-none py-5 mr-2 mt-1 navbar-text hover:border-none text-gray-600'> Welcome <br/> {session.user.name} </p>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
                <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:ring-1 hover:ring-offset-1 hover:ring-offset-gray-800 smooth-transition">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src={session.user.image!}
                            alt="user profile pic"
                        />
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
                    <Menu.Items className="smooth-transition absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 smooth-transition')}
                                >
                                    Your Profile
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/allorders"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 smooth-transition')}
                                >
                                    Your Orders
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    onClick={() => signOut()}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 smooth-transition')}
                                >
                                    Sign out
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}