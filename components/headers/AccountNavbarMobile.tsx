'use client'
import React, {Fragment} from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import { Menu, Transition } from '@headlessui/react';
import {classNames} from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function AccountNavbarMobile() {
    const { status, data: session } = useSession()

    // if (status === 'loading') {
    //     return (
    //         <div className='w-[44px] flex justify-end lg:opacity-0 lg:w-[230px] '>
    //             <Image src={'/social_media/unknown-profilepic.png'} alt={'profile pic'} height={200} width={200} className="h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 smooth-transition" priority/>
    //         </div>
    //     )
    // }

    // if (!session || typeof session.user === 'undefined') {
    //     return (
    //         <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 lg:w-[230px]">
    //             <button onClick={() => signIn()} className="border-b-2 py-5 mt-1 navbar-text">
    //                 Sign in
    //             </button>
    //             <span className="h-6 w-px bg-gray-200" aria-hidden="true"/>
    //             <Link href={`/createaccount`} className="border-b-2 py-5 mt-1 navbar-text">
    //                 Create account
    //             </Link>
    //         </div>
    //     )
    // }


    return (
        <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3 lg:pl-10 lg:w-[230px]">

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
                <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:ring-1 hover:ring-offset-1 hover:ring-offset-gray-800 smooth-transition">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src={ status !== 'authenticated' ? '/social_media/unknown-profilepic.png' : session?.user?.image!  }
                            alt="user profile pic"
                            height={200} width={200}
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

                    { status === 'authenticated'
                        ? <Menu.Items className="smooth-transition absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

                        : <Menu.Items className="smooth-transition absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href='#'
                                        onClick={() => signIn()}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 smooth-transition')}
                                    >
                                        Sign in
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/createaccount"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 smooth-transition')}
                                    >
                                        Create Account
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    }
                </Transition>
            </Menu>
        </div>
    );
}