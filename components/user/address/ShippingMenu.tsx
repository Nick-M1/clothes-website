'use client'
import Link from "next/link";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, query, where} from "@firebase/firestore";
import {db} from "../../../firebase";
import React, {useEffect, useState} from "react";
import NewAddress from "./NewAddress";
import {checkout} from "../../../lib/stripe/checkout";
import {ShippingAddress, StripeCheckoutItem} from "../../../typings";
import {useStoreBasket} from "../../../src/store";
import {shallow} from "zustand/shallow";
import CheckoutRightside from "../../checkout/CheckoutRightside";

export default function ShippingMenu() {
    const customerId = 'test_123456789'             // todo: useSession
    const [deliveryinfo, setDeliveryinfo] = useState(-1)
    const [addNewAddressPopup, setAddNewAddressPopup] = useState(false)

    const [addressesSnapshot, loading, error] = useCollection(
        query(
            collection(db, 'customers'),
            where("customerId", "==", customerId)
        )
    )
    const addresses: ShippingAddress[] = addressesSnapshot?.docs.map(d => d.data().addresses)[0]

    const cart = useStoreBasket(
        (state) => state.cart,
        shallow
    )


    const paymentHandler = async (e: any) => {
        e.preventDefault();

        if (deliveryinfo === -1 || addresses.length <= deliveryinfo || cart.length === 0)
            return

        await fetch('/api/postDefaultAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deliveryinfo, customerId })
        })

        await checkout({
            lineItems: cart.map( item => {
                const stripe_id = item.product.stripe_ids.find(p => p.size === item.size.name && p.color === item.color.name)
                if (typeof stripe_id === 'undefined')
                    throw new Error("Stripe-id couldn't be found")

                return {
                    price: stripe_id.stripe_id,
                    quantity: item.quantity
                } as unknown as StripeCheckoutItem
            } )
        })
    };

    return (
        <div>
            <section className="min-h-screen">
                <div className="container max-w-screen-xl mx-auto px-2">
                    <div className="flex flex-col md:flex-row gap-4 lg:gap-10">
                        <main className="md:w-2/3">
                            <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 md:mb-5">
                                <h2 className="text-2xl font-semibold mb-5">Select delivery address</h2>

                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                    { typeof addresses !== 'undefined'
                                        ? addresses.map( (address, index) =>
                                            <div key={index}>
                                                <label className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                                                <span>
                                                    <input
                                                        name="shipping"
                                                        type="radio"
                                                        className="h-4 w-4 mt-1"
                                                        onChange={() => setDeliveryinfo(index)}
                                                    />
                                                </span>
                                                    <p className="ml-2">
                                                        <span>{address.address}</span>
                                                        <small className="block text-sm text-gray-400">
                                                            {address.city}, {address.state}
                                                            <br />
                                                            {address.country}
                                                            <br />
                                                            {address.postcode}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                        )
                                        : <div></div>
                                    }
                                </div>

                                <button
                                    type='button'
                                    onClick={() => setAddNewAddressPopup(!addNewAddressPopup)}
                                    className={`px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100 ${addNewAddressPopup ? 'bg-gray-50' : ''}`}
                                >
                                    <i className="mr-1 fa fa-plus"></i> Add new address
                                </button>

                                <div className={`${addNewAddressPopup ? 'block' : 'hidden'}`}>
                                    <NewAddress setAddNewAddressPopup={setAddNewAddressPopup}/>
                                </div>

                                <div className="flex justify-end space-x-2 mt-10">
                                    <Link
                                        href="/basketview"
                                        className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                                    >
                                        Back
                                    </Link>
                                    <div className='group'>
                                        <button
                                            onClick={paymentHandler}
                                            className={`px-5 py-2 inline-block btn-primary ${deliveryinfo === -1 || addresses.length <= deliveryinfo || cart.length === 0  ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                            disabled={deliveryinfo === -1 || addresses.length <= deliveryinfo || cart.length === 0}
                                        >
                                            Checkout
                                            <span className={`absolute w-[121px] -top-12 left-0 scale-0 transition-all rounded bg-red-500 p-2 text-xs text-white group-hover:scale-100 ${deliveryinfo === -1 || addresses.length <= deliveryinfo ? '' : 'hidden'}`}>
                                                Please select a delivery address
                                            </span>
                                            <span className={`absolute w-[121px] -top-12 left-0 scale-0 transition-all rounded bg-red-500 p-2 text-xs text-white group-hover:scale-100 ${cart.length === 0 ? '' : 'hidden'}`}>
                                                Your cart is empty
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </main>
                        <CheckoutRightside showCart={true}/>
                    </div>
                </div>
            </section>
        </div>
    );
};