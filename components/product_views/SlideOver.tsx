'use client';

import React, { Fragment, useState } from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {BasketItem, Product} from "../../typings";
import {useStoreBasket, useStoreSlideover} from "../../src/store";
import {shallow} from "zustand/shallow";
import {getProductById, getByIdOrThrow} from "../../lib/databases/DATABASE_API";
import DisplayPrice from "../DisplayPrice";
import DisplayBasketTotal from "../DisplayBasketTotal";
import _, {cloneDeep} from "lodash";
import {CheckIcon} from "@heroicons/react/24/solid";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {MAX_QUANTITY} from "../../lib/DATABASE_CATEGORIES";
import {classNames} from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import ItemRemovedFromBasket from "./ItemRemovedFromBasket";

export default function SideOver() {
    const [openItemRemovedPopup, setOpenItemRemovedPopup] = useState(false)
    const [itemRemovedIndex, setItemRemovedIndex] = useState(0)
    const [itemRemovedName, setItemRemovedName] = useState('')

    const [cart, updateCart, updateNewestItemAdded] = useStoreBasket(
        (state) => [state.cart, state.updateCart, state.updateNewestItemAdded],
        shallow
    )

    const [slideoverOpen, updateSlideover] = useStoreSlideover(
        (state) => [state.open, state.updateOpen],
        shallow
    )

    const setQuantity = (itemIdx: number, newQuantity: number) => {
        updateNewestItemAdded(null)

        if (newQuantity == 0) {
            setItemRemovedIndex(newQuantity)
            setItemRemovedName(`${cart[itemIdx].product.name} ${cart[itemIdx].color.name} ${cart[itemIdx].size.name}`)
            setOpenItemRemovedPopup(true)

        } else {
            const newCart = cloneDeep(useStoreBasket.getState().cart)
            newCart[itemIdx].quantity = newQuantity
            updateCart(newCart)
        }
    }




    const products = [
        {
            id: 1,
            name: 'Throwback Hip Bag',
            href: '#',
            color: 'Salmon',
            price: '$90.00',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        },
        {
            id: 2,
            name: 'Medium Stuff Satchel',
            href: '#',
            color: 'Blue',
            price: '$32.00',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        },
    ]

    return (
        <Transition.Root show={slideoverOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={updateSlideover}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => updateSlideover(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="fixed flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Panel title
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )

    // return (
    //     <>
    //         <ItemRemovedFromBasket open={openItemRemovedPopup} setOpen={setOpenItemRemovedPopup} itemRemovedIndex={itemRemovedIndex} itemRemovedName={itemRemovedName} updateCart={updateCart} />
    //         <Transition.Root show={slideoverOpen} as={Fragment}>
    //             <Dialog as="div" className="relative z-10" onClose={updateSlideover}>
    //                 <Transition.Child
    //                     as={Fragment}
    //                     enter="ease-in-out duration-500"
    //                     enterFrom="opacity-0"
    //                     enterTo="opacity-100"
    //                     leave="ease-in-out duration-500"
    //                     leaveFrom="opacity-100"
    //                     leaveTo="opacity-0"
    //                 >
    //                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //                 </Transition.Child>
    //
    //                 <div className="fixed inset-0 overflow-hidden">
    //                     <div className="absolute inset-0">
    //                         <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
    //                             <Transition.Child
    //                                 as={Fragment}
    //                                 enter="transform transition ease-in-out duration-500 sm:duration-700"
    //                                 enterFrom="translate-x-full"
    //                                 enterTo="translate-x-0"
    //                                 leave="transform transition ease-in-out duration-500 sm:duration-700"
    //                                 leaveFrom="translate-x-0"
    //                                 leaveTo="translate-x-full"
    //                             >
    //                                 <Dialog.Panel className="pointer-events-auto w-screen-withmobile max-w-md h-screen-withmobile">
    //                                     <div className="flex h-full flex-col bg-white shadow-xl">
    //                                         <div className="flex-1 overflow-y-auto h-[60dvh] py-6 px-4 sm:px-6 scrollbar overscroll-none">
    //                                             <div className="flex items-start justify-between">
    //                                                 <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
    //                                                 <div className="ml-3 flex h-7 items-center">
    //                                                     <button
    //                                                         type="button"
    //                                                         className="-m-2 p-2 text-gray-400 hover:text-gray-500"
    //                                                         onClick={() => updateSlideover(false)}
    //                                                     >
    //                                                         <span className="sr-only">Close panel</span>
    //                                                         <XMarkIcon className="h-6 w-6" aria-hidden="true" />
    //                                                     </button>
    //                                                 </div>
    //                                             </div>
    //
    //                                             {/* Displays list of items - duplicate of 'BasketView' */}
    //                                             <div className="mt-8">
    //                                                 <div className="flow-root">
    //                                                     <ul role="list" className="-my-6 divide-y divide-gray-200">
    //                                                         { cart.map( (basketitem, index) => (
    //
    //                                                             <li key={basketitem.product.id} className="flex py-6">
    //                                                                 <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
    //                                                                     <Image
    //                                                                         height={200} width={200}
    //                                                                         src={basketitem.product.images[0].src}
    //                                                                         alt={basketitem.product.images[0].alt}
    //                                                                         className="h-full w-full object-cover object-center"
    //                                                                     />
    //                                                                 </div>
    //
    //                                                                 <div className="ml-4 flex flex-1 flex-col">
    //                                                                     <div>
    //                                                                         <div className="flex justify-between text-base font-medium text-gray-900">
    //                                                                             <h3>
    //                                                                                 <Link href={`/product/${basketitem.product.id}`} onClick={() => updateSlideover(false)}>{basketitem.product.name}</Link>
    //                                                                             </h3>
    //                                                                             <DisplayPrice price={basketitem.product.price} cssClass={"mr-10"}/>
    //                                                                         </div>
    //                                                                         <p className="mt-1 text-sm text-gray-500">{`${basketitem.color.name}  ${basketitem.size.name}`}</p>
    //                                                                     </div>
    //                                                                     <div className="flex flex-1 items-end justify-between text-sm">
    //                                                                         <div>
    //                                                                             { basketitem.size.inStock
    //                                                                                 ? <p className="text-gray-700 pt-3 flex"><span className='text-green-400 mr-1'><CheckIcon width={18} height={18}/></span>In stock</p>
    //                                                                                 : <p className="text-gray-700 pt-3 flex"><span className='text-red-400 mr-1'><XMarkIcon width={18} height={18}/></span>Not in stock</p>
    //                                                                             }
    //                                                                         </div>
    //
    //                                                                         <div className="custom-number-input h-10">
    //                                                                             <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 drop-shadow-sm z-30">
    //
    //
    //
    //                                                                                 <Menu as="div" className="relative inline-block text-left">
    //                                                                                     <div>
    //                                                                                         <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 smooth-transition hover:text-gray-900">
    //                                                                                             Qty: {basketitem.quantity}
    //                                                                                             <ChevronDownIcon
    //                                                                                                 className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group smooth-transition-hover:text-gray-500"
    //                                                                                                 aria-hidden="true"
    //                                                                                             />
    //                                                                                         </Menu.Button>
    //                                                                                     </div>
    //
    //                                                                                     {/* Quantity selector */}
    //                                                                                     <Transition
    //                                                                                         as={Fragment}
    //                                                                                         enter="transition ease-out duration-100"
    //                                                                                         enterFrom="transform opacity-0 scale-95"
    //                                                                                         enterTo="transform opacity-100 scale-100"
    //                                                                                         leave="transition ease-in duration-75"
    //                                                                                         leaveFrom="transform opacity-100 scale-100"
    //                                                                                         leaveTo="transform opacity-0 scale-95"
    //                                                                                     >
    //                                                                                         <Menu.Items
    //                                                                                             className="overflow-y-scroll scrollbar max-h-28 z-30 absolute right-0 mt-2 w-16 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                                                                                             <div className="py-1">
    //                                                                                                 {_.range(0, MAX_QUANTITY).map( newQuantity => (
    //                                                                                                     <Menu.Item key={index}>
    //                                                                                                         {({active}) => (
    //                                                                                                             <a
    //                                                                                                                 onClick={() => setQuantity(index, newQuantity)}
    //                                                                                                                 className={
    //                                                                                                                     classNames(
    //                                                                                                                         newQuantity == basketitem.quantity ? 'font-semibold text-gray-800' : 'text-gray-500',
    //                                                                                                                         active ? 'bg-gray-100' : '',
    //                                                                                                                         'block px-4 py-2 text-sm smooth-transition'
    //                                                                                                                     )}
    //                                                                                                             >
    //                                                                                                                 {newQuantity}
    //                                                                                                             </a>
    //                                                                                                         )}
    //                                                                                                     </Menu.Item>
    //                                                                                                 ))}
    //                                                                                             </div>
    //                                                                                         </Menu.Items>
    //                                                                                     </Transition>
    //                                                                                 </Menu>
    //
    //                                                                             </div>
    //                                                                         </div>
    //                                                                     </div>
    //                                                                 </div>
    //                                                             </li>
    //                                                         ))}
    //                                                     </ul>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //
    //                                         <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
    //                                             <div className="flex justify-between text-base font-medium text-gray-900">
    //                                                 <p>Subtotal</p>
    //                                                 <DisplayBasketTotal cssClass={'mr-10'}/>
    //                                             </div>
    //                                             <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
    //                                             <div className="mt-6">
    //                                                 <Link
    //                                                     href="/basketview" onClick={() => updateSlideover(false)}
    //                                                     className="flex items-center justify-center px-6 py-3 btn-primary"
    //                                                 >
    //                                                     Checkout
    //                                                 </Link>
    //                                             </div>
    //                                             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    //                                                 <p>
    //                                                     or {' '}
    //                                                     <button
    //                                                         type="button"
    //                                                         className="font-medium text-indigo-600 hover:text-indigo-500"
    //                                                         onClick={() => updateSlideover(false)}
    //                                                     >
    //                                                         Continue Shopping
    //                                                         <span aria-hidden="true"> &rarr;</span>
    //                                                     </button>
    //                                                 </p>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </Dialog.Panel>
    //                             </Transition.Child>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </Dialog>
    //         </Transition.Root>
    //     </>
    // )
}