'use client'

import React, {FormEvent, Fragment, useEffect, useState} from "react";
import {useStoreBasket, useStoreCurrency} from "../../../src/store";
import {shallow} from "zustand/shallow";
import _, {cloneDeep} from "lodash";
import {getProductById, getByIdOrThrow} from "../../../lib/databases/DATABASE_API";
import {BasketItem, Product, StripeCheckoutItem} from "../../../typings";
import DisplayPrice from "../../DisplayPrice";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import DisplayBasketTotal from "../../DisplayBasketTotal";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {MAX_QUANTITY} from "../../../lib/DATABASE_CATEGORIES";
import {classNames} from "../../../lib/utils";
import {useRouter} from "next/navigation";
import {checkout} from "../../../lib/stripe/checkout";
import Link from "next/link";
import Image from "next/image";


export const useHasHydrated = () => {
    const [hasHydrated, setHasHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
};


export default function BasketView() {
    const currencySymbol = useStoreCurrency.getState().currency.symbol

    const [cart, updateCart, updateNewestItemAdded] = useStoreBasket(
        (state) => [state.cart, state.updateCart, state.updateNewestItemAdded],
        shallow
    )

    const totalPrice = cart.length == 0
        ? 0
        : cart
            .map(p => p.product.price * p.quantity)
            .reduce((a, b) => a + b )


    const setQuantity = (itemIdx: number, newQuantity: number) => {
        updateNewestItemAdded(null)
        const newCart = cloneDeep(useStoreBasket.getState().cart)

        if (newQuantity == 0)
            newCart.splice(itemIdx, 1)          //todo: popup are u sure u want to remove item
        else
            newCart[itemIdx].quantity = newQuantity

        updateCart(newCart)
    }

    const hasHydrated = useHasHydrated();

    return (
        <>
            <div className="flex md:flex-row flex-col justify-center" id="cart">
                <div className="px-10 lg:pl-28 lg:pr-20 w-full lg:overflow-y-auto lg:overflow-x-hidden lg:h-[80vh] scrollbar" id="scroll">
                    <Link className="flex items-center text-blue-600 hover:text-blue-400 cursor-pointer" href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="15 6 9 12 15 18" />
                        </svg>
                        <p className="text-sm pl-2 leading-none">Back</p>
                    </Link>
                    <p className="text-3xl font-black leading-10 text-gray-800 pt-3">Shopping Cart</p>

                    {/* Displays list of items - duplicate of 'SlideOver' */}
                    { hasHydrated ?
                    <div className="flow-root pt-3">
                        <hr className='h-px my-6 bg-gray-200 border-0'/>
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            { cart.map( (basketitem, index) => (

                                    <li key={index} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 drop-shadow-sm">
                                            <Image
                                                width={500} height={500}
                                                src={basketitem.product.images[0].src}
                                                alt={basketitem.product.images[0].alt}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link href={`/product/${basketitem.product.id}`} className='hover:text-gray-600 smooth-transition'>{basketitem.product.name}</Link>
                                                    </h3>
                                                    <DisplayPrice price={basketitem.product.price} cssClass={"mr-10"}/>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{`${basketitem.color.name}  ${basketitem.size.name}`}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div>
                                                    { basketitem.size.inStock
                                                        ? <p className="text-gray-700 pt-3 flex"><span className='text-green-400 mr-1'><CheckIcon width={18} height={18}/></span>In stock</p>
                                                        : <p className="text-gray-700 pt-3 flex"><span className='text-red-400 mr-1'><XMarkIcon width={18} height={18}/></span>Not in stock</p>
                                                    }

                                                </div>

                                                <div className="custom-number-input h-10">
                                                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 drop-shadow-sm">



                                                        <Menu as="div" className="relative inline-block text-left">
                                                            <div>
                                                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 smooth-transition hover:text-gray-900">
                                                                    Qty: {basketitem.quantity}
                                                                    <ChevronDownIcon
                                                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group smooth-transition-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                </Menu.Button>
                                                            </div>

                                                            {/* SORTING */}
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items
                                                                    className="overflow-y-scroll scrollbar max-h-28 z-10 absolute right-0 mt-2 w-16 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <div className="py-1">
                                                                        {_.range(0, MAX_QUANTITY).map( (newQuantity, quantityIndex) => (
                                                                            <Menu.Item key={quantityIndex}>
                                                                                {({active}) => (
                                                                                    <a
                                                                                        onClick={() => setQuantity(index, newQuantity)}
                                                                                        className={
                                                                                            classNames(
                                                                                                newQuantity == basketitem.quantity ? 'font-semibold text-gray-800' : 'text-gray-500',
                                                                                                active ? 'bg-gray-100' : '',
                                                                                                'block px-4 py-2 text-sm smooth-transition'
                                                                                            )}
                                                                                    >
                                                                                        {newQuantity}
                                                                                    </a>
                                                                                )}
                                                                            </Menu.Item>
                                                                        ))}
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                        :<div></div>
                    }

                </div>
                <div className="md:w-2/3 w-full h-full">
                    <div className="flex flex-col md:h-screen md:px-14 pt-10 md:pt-20 pb-5 justify-between overflow-y-auto">
                        <div className='bg-gray-100 rounded-lg drop-shadow-sm px-9 md:px-12 py-5'>
                            <p className="text-xl font-semibold leading-9 text-black">Order Summary</p>

                            <div className="flex items-center justify-between pt-6">
                                <p className="text-sm leading-none text-gray-600">Subtotal</p>
                                { hasHydrated
                                    ? <p className="text-sm font-medium leading-none text-black">{currencySymbol}{totalPrice.toFixed(2)}</p>
                                    : <p className='text-sm opacity-0'></p>
                                }

                            </div>
                            <hr className='h-px my-4 bg-gray-300 border-0'/>
                            <div className="flex items-center justify-between">
                                <p className="text-sm leading-none text-gray-600">Shipping</p>
                                { hasHydrated
                                    ? <p className="text-sm font-medium leading-none text-black">{currencySymbol}30.00</p>
                                    : <p className='text-sm opacity-0'></p>
                                }
                            </div>
                            <hr className='h-px my-4 bg-gray-200 border-0'/>
                            <div className="flex items-center justify-between">
                                <p className="text-sm leading-none text-gray-600">Tax</p>
                                { hasHydrated
                                    ? <p className="text-sm font-medium leading-none text-black">{currencySymbol}35.00</p>
                                    : <p className='text-sm opacity-0'></p>
                                }
                            </div>
                            <hr className='h-px my-4 bg-gray-300 border-0'/>
                            <div className="flex items-center pb-6 justify-between">
                                <p className="text-base font-semibold leading-normal text-gray-800">Order total</p>
                                { hasHydrated
                                    ? <p className="text-base font-semibold leading-normal text-right text-black">{currencySymbol}{(totalPrice + 35 + 30).toFixed(2)}</p>
                                    : <p className='text-sm opacity-0'></p>
                                }
                            </div>

                            <Link href='/deliveryinfo' className="text-base leading-none w-full py-3 btn-primary">
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {` 
                    /* width */
                    #scroll::-webkit-scrollbar {
                        width: 1px;
                    }
    
                    /* Track */
                    #scroll::-webkit-scrollbar-track {
                        background: #f1f1f1;
                    }
    
                    /* Handle */
                    #scroll::-webkit-scrollbar-thumb {
                        background: rgb(133, 132, 132);
                    }
                    
         
                    
                    .custom-number-input input:focus {
                      outline: none !important;
                    }
                    
                    .custom-number-input button:focus {
                      outline: none !important;
                    }
                `}
            </style>
        </>
    );
}
