'use client'
import React, {Fragment} from 'react';
import {signIn, signOut} from "next-auth/react";
import { Menu, Transition } from '@headlessui/react';
import {classNames} from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import {Session} from "next-auth";
import {
    ArrowRightOnRectangleIcon,
    HomeIcon,
    ArrowLeftOnRectangleIcon,
    UserPlusIcon, UserIcon
} from "@heroicons/react/24/outline";

function menuitemClassname( divideTop: boolean, { active, disabled }: { active: boolean, disabled: boolean }) {
    return classNames(
        divideTop ? 'mt-1 border-t border-gray-100' : '',
        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
        disabled ? 'cursor-not-allowed opacity-50' : '',
        "block w-full text-left py-2.5 px-4 text-sm smooth-transition"
    )
}

const userNavigation_signedin = [
    { isButton: false, name: "My Profile",      to: "#",                        icon: UserIcon,                      divideTop: false },
    { isButton: false, name: "Your Orders",       to: "/allorders",               icon: HomeIcon,                      divideTop: false },
    // { isButton: false, name: "My recipes",      to: "/myrecipes",               icon: PencilSquareIcon,              divideTop: false },
    // { isButton: false, name: "Create recipes",  to: "/create",                  icon: DocumentPlusIcon,              divideTop: false },
    // { isButton: false, name: "Saved recipes",   to: "/bookmarkedrecipes",       icon: BookmarkIcon,                  divideTop: false },
    { isButton: true,  name: "Sign Out",          func: () => signOut(),          icon: ArrowRightOnRectangleIcon,      divideTop: true },
];
const userNavigation_notsignedin = [
    { isButton: true,  name: "Sign in",         func: () => signIn(),           icon: ArrowLeftOnRectangleIcon,      divideTop: false },
    { isButton: false, name: "Create account",  to: "/createaccount",           icon: UserPlusIcon,      divideTop: false },
];

type Props = {
    sessionAuth: Session | null
}

export default function ProfileDropdown({ sessionAuth }: Props) {
    return (
        <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3 lg:pl-10 lg:max-w-[230px]">

            { sessionAuth == null ? (
                <button onClick={() => signIn()} className="hidden lg:block border-b-2 px-2 mr-4 py-5 mt-1 navbar-text">
                    Sign in
                </button>
            ) : (
                <p className='hidden lg:block w-32 text-right border-none py-5 pr-4 mt-1 navbar-text hover:border-none text-gray-600'>
                    Welcome <br/> {sessionAuth?.user?.name}
                </p>
            ) }

            <Menu as="div" className="flex-shrink-0 relative ml-5">
                <div>
                    <Menu.Button
                        className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-indigo-400 hover:ring-1 hover:ring-offset-1 hover:ring-offset-indigo-300 smooth-transition">
                        <span className="sr-only">Open user menu</span>
                        <Image
                            width={30} height={30}
                            className="h-8 w-8 rounded-full"
                            src={ sessionAuth == null || sessionAuth.user?.image == null ? "/social_media/unknown-profilepic.png" : sessionAuth.user.image }
                            alt=""
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
                    <Menu.Items className="smooth-transition origin-top-right absolute z-10 right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">

                        <Menu.Item>
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm leading-5">{ sessionAuth == null ? 'Not signed in' : 'Signed in as'}</p>
                                <p className="truncate text-sm font-medium leading-5 text-gray-900 font-semibold">
                                    { sessionAuth != null && sessionAuth.user?.email}
                                </p>
                            </div>
                        </Menu.Item>


                        { ( sessionAuth == null ? userNavigation_notsignedin : userNavigation_signedin )
                            .map(item => (
                                <Menu.Item key={item.name}>
                                    {( itemrenderPropArgs) => (

                                        item.isButton
                                            ? (
                                                <button
                                                    type='button'
                                                    onClick={item.func}
                                                    className={`${menuitemClassname(item.divideTop, itemrenderPropArgs)} flex`}
                                                >
                                                    <item.icon className='h-5 w-5 mr-2.5'/>
                                                    <span>{item.name}</span>
                                                </button>
                                            )
                                            : (
                                                <Link
                                                    href={item.to!}
                                                    className={`${menuitemClassname(item.divideTop, itemrenderPropArgs)} flex`}
                                                >
                                                    <item.icon className='h-5 w-5 mr-2.5'/>
                                                    <span>{item.name}</span>
                                                </Link>
                                            )
                                    )}
                                </Menu.Item>
                            ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}