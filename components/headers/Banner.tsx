'use client'

import React, {Fragment, useEffect, useState} from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {getCategories, getNavPages} from "../../lib/DATABASE_CATEGORIES";
import { useStoreBasket, useStoreCurrency, useStoreSlideover} from "../../src/store";
import {shallow} from "zustand/shallow";
import Searchbar from "../Searchbar";
import {convertToSlug} from "../../lib/utils";
import CurrencySelector from "../CurrencySelector";
import {BasketItem} from "../../typings";
import Link from "next/link";
import Image from "next/image";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function convertToSlugWrapper(text: string) {
    if (text === 'Browse All')
        return ''

    return convertToSlug(text)
}


const useHasHydrated = () => {
    const [hasHydrated, setHasHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
};


export default function Banner() {
    const categories = getCategories()
    const pages = getNavPages()

    const calcTotalQuantity = (cart: BasketItem[]) => {
        return cart.length == 0
            ? 0
            : cart.map(p => p.quantity).reduce((a, b) => a + b)
    }

    const [totalQuantity, setTotalQuantity] = useState(calcTotalQuantity(useStoreBasket.getState().cart))
    const [categoriesOpen, setCategoriesOpen] = useState(false);        // For mobile side-panel

    const updateSlideover = useStoreSlideover(
        (state) => state.updateOpen,
        shallow
    )

    useStoreBasket.subscribe((state) => {
        setTotalQuantity(
            calcTotalQuantity(state.cart)
        )
    })


    const hasHydrated = useHasHydrated()








    return (
        <div className="bg-white dark:border-gray-600">
            {/* Mobile menu */}
            <Transition.Root show={categoriesOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setCategoriesOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setCategoriesOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="border-t border-gray-200 py-6 px-4 z-20">
                                    <CurrencySelector/>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                                            'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div key={item.name} className="group relative text-sm">
                                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                <Image height={200} width={200} src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                            </div>
                                                            <Link href={`/search/${convertToSlugWrapper(category.name)}/${convertToSlugWrapper(item.name)}`} onClick={() => setCategoriesOpen(false)} className="mt-6 block font-medium text-gray-900">
                                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                {item.name}
                                                            </Link>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <Link href={`/search/${convertToSlugWrapper(category.name)}/${convertToSlugWrapper(item.name)}`} onClick={() => setCategoriesOpen(false)} className="-m-2 block p-2 text-gray-500">
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                    {pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900 smooth-transition">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                    <div className="flow-root">
                                        <Link href={`/signin`} className="-m-2 block p-2 font-medium text-gray-900 smooth-transition">
                                            Sign in
                                        </Link>
                                    </div>
                                    <div className="flow-root">
                                        <Link href={`/createaccount`} className="-m-2 block p-2 font-medium text-gray-900 smooth-transition">
                                            Create account
                                        </Link>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-white dark:border-gray-600">
                <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over
                    { hasHydrated ? <span className={'ml-1 w-6'}> {useStoreCurrency.getState().currency.symbol}100 </span> : <span className={'ml-1 w-6 opacity-0'}> $100 </span> }
                </p>

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="rounded-md bg-white dark:border-gray-600 p-2 text-gray-400 lg:hidden"
                                onClick={() => setCategoriesOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 lg:ml-0">
                                <Link href={`/`}>
                                    <Image
                                        height={100} width={100}
                                        className="h-8 w-auto"
                                        src="/brand-logo.png"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <span className="hidden sm:block lg:hidden ml-3 text-l font-semibold whitespace-nowrap dark:text-white">Shopping Website</span>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'border-transparent text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white hover:border-gray-300 smooth-transition',
                                                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 smooth-transition">
                                                                                        <Image
                                                                                            height={300} width={300}
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <a href={`/search/${convertToSlugWrapper(category.name)}/${convertToSlugWrapper(item.name)}`} className="mt-6 block font-medium text-gray-900">
                                                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={`/search/${convertToSlugWrapper(category.name)}/${convertToSlugWrapper(section.name)}/${convertToSlugWrapper(item.name)}`} className="hover:text-gray-800 smooth-transition">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white border-b-2 py-5 mt-1 border-transparent hover:border-gray-300 smooth-transition"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link href={`/signin`} className="border-b-2 py-5 mt-1 navbar-text">
                                        Sign in
                                    </Link>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    <Link href={`/createaccount`} className="border-b-2 py-5 mt-1 navbar-text">
                                        Create account
                                    </Link>
                                </div>

                                <div className="hidden lg:ml-8 lg:flex smooth-transition">
                                    <CurrencySelector/>
                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6 smooth-transition">
                                    <Searchbar/>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6 cursor-pointer group relative flex justify-center">
                                    <a onClick={() => updateSlideover(true)} className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-blue-700 dark:text-gray-400 dark:hover:text-white smooth-transition"
                                            aria-hidden="true"
                                        />
                                        <span className="absolute w-20 top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Open Cart</span>

                                        { hasHydrated
                                            ? <span className="ml-2 text-sm font-medium w-4 text-gray-700 group-hover:text-gray-900">{totalQuantity}</span>
                                            : <span className='ml-2 text-sm font-medium w-4 opacity-0'>0</span> }

                                        <span className="sr-only">items in cart, view bag</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}