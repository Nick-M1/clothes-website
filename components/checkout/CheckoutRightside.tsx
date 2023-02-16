'use client'
import React, {useEffect, useState} from 'react';
import {useStoreBasket, useStoreCurrency} from "../../src/store";
import {shallow} from "zustand/shallow";
import Link from "next/link";
import Image from "next/image";

export const useHasHydrated = () => {
    const [hasHydrated, setHasHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
};

export default function CheckoutRightside({showCart}: {showCart: boolean}) {
    const currencySymbol = useStoreCurrency.getState().currency.symbol

    const cart = useStoreBasket(
        (state) => state.cart,
        shallow
    )

    const totalPrice = cart.length == 0
        ? 0
        : cart
            .map(p => p.product.price * p.quantity)
            .reduce((a, b) => a + b )

    const hasHydrated = useHasHydrated();

    return hasHydrated
        ? <aside className="px-6 md:px-0 pb-10 md:pl-0 md:pb-0 w-full md:w-1/3">
            <article className="text-gray-600 mt-7 md:max-w-[350px]">
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                    <li className="flex justify-between mb-1">
                        <span>Subtotal:</span>
                        <span>{currencySymbol}{totalPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between mb-1">
                        <span>Shipping:</span>
                        <span>{currencySymbol}34.00</span>
                    </li>
                    <li className="flex justify-between mb-1">
                        <span>Tax estimate:</span>
                        <span>{currencySymbol}34.00</span>
                    </li>
                    <li className="border-t flex justify-between mt-3 pt-3">
                        <span>Total Amount:</span>
                        <span className="text-gray-900 font-bold">{currencySymbol}{(totalPrice + 35 + 30).toFixed(2)}</span>
                    </li>
                </ul>

                <hr className="my-4" />

                { showCart
                    ? <div>
                        <h2 className="text-lg font-semibold mb-3">Items in cart</h2>
                        { cart.map( (item, index) =>
                            <figure className="flex items-center mb-4 leading-5">
                                <div>
                                    <div className="block relative p-1 h-20 w-20 flex-shrink-0 rounded-md border border-gray-200">
                                        <Image
                                            fill
                                            src={item.product.images[0].src}
                                            alt={item.product.images[0].alt}
                                            className='rounded-md'
                                        />
                                        <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                </div>
                                <figcaption className="ml-3">
                                    <p>{item.product.name} {item.size.name}</p>
                                    <p className="mt-1 text-gray-400">{currencySymbol}{item.product.price.toFixed(2)}</p>
                                </figcaption>
                            </figure>
                        )}
                    </div>

                    : <div className="flex justify-start space-x-2 mt-10">
                        <div className={`group ${cart.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            <Link
                                href='/deliveryinfo'
                                className={`px-5 py-2 inline-block btn-primary ${cart.length === 0 ? 'pointer-events-none' : 'pointer-events-auto'}`}

                            >
                                Delivery options
                                <span className={`absolute w-44 -top-8 left-0 scale-0 transition-all rounded bg-red-500 p-2 text-xs text-white group-hover:scale-100 ${cart.length === 0 ? '' : 'hidden'}`}>
                                    No items in basket!
                                </span>
                            </Link>

                        </div>
                        <Link
                            href="/"
                            className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                        >
                            Back
                        </Link>
                    </div>
                }
            </article>
        </aside>
        : <div></div>
}