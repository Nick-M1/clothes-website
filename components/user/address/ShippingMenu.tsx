'use client'
import Link from "next/link";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, query, where} from "@firebase/firestore";
import {db} from "../../../firebase";
import {useEffect, useState} from "react";
import NewAddress from "./NewAddress";
import {checkout} from "../../../lib/stripe/checkout";
import {ShippingAddress, StripeCheckoutItem} from "../../../typings";
import {useStoreBasket} from "../../../src/store";
import {shallow} from "zustand/shallow";

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

        if (deliveryinfo === -1 || addresses.length <= deliveryinfo)            // todo: popup for 'please select an address;
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
            <section className="py-10 bg-gray-50">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                        <main className="md:w-2/3">
                            <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
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
                                    className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                                >
                                    <i className="mr-1 fa fa-plus"></i> Add new address
                                </button>

                                <div className={`${addNewAddressPopup ? 'block' : 'hidden'}`}>
                                    <NewAddress setAddNewAddressPopup={setAddNewAddressPopup}/>
                                </div>

                                <div className="flex justify-end space-x-2 mt-10">
                                    <Link
                                        href="/checkout"
                                        className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                                    >
                                        Back
                                    </Link>
                                    <button
                                        onClick={paymentHandler}
                                        className="px-5 py-2 inline-block btn-primary cursor-pointer">
                                        Checkout
                                    </button>
                                </div>
                            </article>
                        </main>
                        <aside className="md:w-1/3">
                            <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                                <ul>
                                    <li className="flex justify-between mb-1">
                                        <span>Amount:</span>
                                        <span>$343</span>
                                    </li>
                                    <li className="flex justify-between mb-1">
                                        <span>Est TAX:</span>
                                        <span>$34</span>
                                    </li>
                                    <li className="border-t flex justify-between mt-3 pt-3">
                                        <span>Total Amount:</span>
                                        <span className="text-gray-900 font-bold">$343</span>
                                    </li>
                                </ul>

                                <hr className="my-4" />

                                <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

                                <figure className="flex items-center mb-4 leading-5">
                                    <div>
                                        <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                                            <img
                                                width="50"
                                                height="50"
                                                src={"/logo192.png"}
                                                alt="Title"
                                            />
                                            <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                                                3
                                            </span>
                                        </div>
                                    </div>
                                    <figcaption className="ml-3">
                                        <p> product name</p>
                                        <p className="mt-1 text-gray-400">Total: $34</p>
                                    </figcaption>
                                </figure>
                            </article>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};