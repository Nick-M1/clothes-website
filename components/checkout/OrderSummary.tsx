'use client'

import React, {Fragment, useEffect, useState} from 'react';
import {useStoreBasket, useStoreCurrency} from "../../src/store";
import {shallow} from "zustand/shallow";
import {BasketItem, Product} from "../../typings";
import DisplayPrice from "../DisplayPrice";
import {ArrowRightIcon, CheckIcon, CreditCardIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import _ from "lodash";
import {MAX_QUANTITY} from "../../lib/DATABASE_CATEGORIES";
import {classNames} from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import ResetCart from "./ResetCart";

type Prop = {
    basket: {productId: number, color: string, size: string, quantity: number, product: Product}[],         //todo: use BasketItem[] instead (need sizeOptions & colorOptions in DBs)

    amount_subtotal: number
    amount_total: number
    currencySymbol: string
    payment_method_type: string
}

const tracking_number = '515478785554584512'


// todo: add shipping & tax prices to stripe & use here
// todo: implement payment_method_type (card, googlepay??)
export default function OrderSummary({ basket, amount_subtotal, amount_total, payment_method_type, currencySymbol }: Prop) {

    return (
        <div className="flex md:flex-row flex-col">
            <div className='hidden md:block w-2/5 h-screen overflow-y-hidden'>
                <Image width={1000} height={1000} src='/clothes_imgs/vertical/order-summary-img1.jpg' alt='side-pic'/>
            </div>

            <ResetCart/>

            <div className='py-10 md:overflow-y-scroll md:h-screen md:scrollbar'>
                <div className='px-12 md:px-20'>
                    <p className="font-semibold text-sm text-blue-800">Payment successful</p>
                    <h2 className="text-4xl tracking-tight font-black leading-10 text-gray-800 py-2">Thank you for ordering</h2>
                    <p className='font-[500] text-sm text-gray-500'> We appreciate your order, we're currently processing it. So hang tight and we'll send you confirmation very soon!</p>

                    <p className='font-semibold tracking-tight text-sm text-gray-800 pt-10'>Tracking number</p>
                    <p className='text-sm tracking-wide text-blue-800'>{tracking_number}</p>
                </div>
                {/* Displays list of items */}
                <div className="flow-root scale-90 px-7">
                    <hr className='h-px my-6 bg-gray-200 border-0'/>
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        { basket.map( (basketitem, index) => (

                                <li key={index} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 drop-shadow-sm">
                                        <Image
                                            width={200} height={200}
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
                                                <DisplayPrice price={basketitem.product.price} cssClass={"mr-10 text-sm font-semibold"}/>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{`${basketitem.color}  ${basketitem.size}`}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="mt-1 text-sm text-gray-500">{`Qty.  ${basketitem.quantity}`}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="flex flex-col py-5 justify-between scale-90 px-6 md:px-10">
                    <hr className='h-px my-4 bg-gray-300 border-0'/>

                    <div className="flex items-center justify-between pt-6">
                        <p className="text-sm leading-none text-gray-600">Subtotal</p>
                        <p className="text-sm font-medium leading-none text-black">{currencySymbol}{amount_subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <p className="text-sm leading-none text-gray-600">Shipping</p>
                        <p className="text-sm font-medium leading-none text-black">{currencySymbol}30.00</p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <p className="text-sm leading-none text-gray-600">Tax</p>
                        <p className="text-sm font-medium leading-none text-black">{currencySymbol}35.00</p>
                    </div>
                    <div className="flex items-center mt-5 pb-6 justify-between">
                        <p className="text-base font-semibold leading-normal text-gray-800">Order total</p>
                        <p className="text-base font-semibold leading-normal text-right text-black">{currencySymbol}{(amount_total + 35 + 30).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center mt-10 justify-between">
                        <p className="text-sm text-gray-600">
                            <span className='font-semibold text-base leading-normal text-gray-800'> Shipping address </span>
                            <br/>
                            Kristin Watson
                            <br/>
                            7363 Cynthia Pass
                            <br/>
                            Toronto, ON7 4DP
                        </p>
                        <div>
                            <span className='font-semibold text-base leading-normal text-gray-800'> Payment </span>
                            <p className="text-sm text-gray-600 grid grid-cols-3">
                                <span className='col-start-1 col-span-1 text-blue-700'>
                                    <CreditCardIcon width={40}/>
                                </span>

                                <span className='col-start-2 col-span-2'>
                                    Ending with 4242
                                    <br/>
                                    <span className='font-light'>Expires 12 / 21</span>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className='pt-10'>
                        <hr className='h-px mb-6 bg-gray-300 border-0'/>
                        <Link href='/' className="flex justify-end font-medium tracking-tight text-indigo-600 hover:text-indigo-500">
                            <span className='mr-1'>Continue Shopping</span>
                            <ArrowRightIcon width={20}/>
                        </Link>
                    </div>
                </div>



            </div>
        </div>
    );
}