import React from 'react';
import OrderSummary from "../../../components/checkout/OrderSummary";
import {__getProductByStripeId_MOCK} from "../../../lib/databases/mock_database";
import {Product, ShippingAddress} from "../../../typings";
import ResetCart from "../../../components/checkout/ResetCart";
import {uploadToStripe} from "../../../lib/stripe/upload_to_stripe";
import {collection, getDocs, query, where} from "@firebase/firestore";
import {db} from "../../../firebase";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page({ searchParams }: any) {
    const sessionAuth = await getServerSession(authOptions)

    if ( !Object.hasOwn(searchParams, 'session_id') )
        return <p className='p-12 px-36 h-screen'> session_id is undefined </p>

    const resetCart = Object.hasOwn(searchParams, 'reset_cart') && searchParams.reset_cart === 'true'

    const stripe_session_id: string = searchParams.session_id
    const response_cart = await uploadToStripe(stripe_session_id, sessionAuth!)

    if ( response_cart == null )
        return <p className='p-12 px-36 h-screen'> unauthorised </p>

    const basket: {productId: number, color: string, size: string, quantity: number, product: Product}[] = []       //todo: make DBs store sizeOptions & colorOptions instead of just the string

    // @ts-ignore
    for (const [index, priceId] of response_cart.basket.entries()) {
        const product = await __getProductByStripeId_MOCK(priceId, response_cart.quantities[index])
        basket.push(product)
    }

    // Get selected address
    const customerId = sessionAuth != null && sessionAuth.user != null ? sessionAuth.user.email! : 'test_123456789'
    const querySnapshot = await getDocs(
        query(
            collection(db, "customers"),
            where('customerId', '==', customerId)
        )
    );

    let deliveryinfoJSON: any = null
    querySnapshot.forEach((doc) => {
        deliveryinfoJSON = doc.data()
    });

    const deliveryinfo: ShippingAddress = deliveryinfoJSON.addresses[ deliveryinfoJSON.defaultAddress ]

    return (
        <div>
            { resetCart ? <ResetCart/> : <></> }
            <OrderSummary
                basket={basket}
                amount_subtotal={response_cart.amount_subtotal}
                amount_total={response_cart.amount_total}
                payment_method_type={response_cart.payment_method_type}
                currencySymbol={response_cart.currencySymbol}
                deliveryinfo={deliveryinfo}
                stripe_session_id={stripe_session_id}
            />
        </div>
    );
}