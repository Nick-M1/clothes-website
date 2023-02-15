import React from 'react';
import OrderSummary from "../../../components/checkout/OrderSummary";
import {__getProductByStripeId_MOCK} from "../../../lib/databases/mock_database";
import {Product, ShippingAddress} from "../../../typings";
import ResetCart from "../../../components/checkout/ResetCart";
import {adminDb} from "../../../firebaseAdmin";
import {uploadToStripe} from "../../../lib/stripe/upload_to_stripe";
import {collection, getDocs, query, where} from "@firebase/firestore";
import {db} from "../../../firebase";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page({searchParams}: any) {

    if ( !Object.hasOwn(searchParams, 'session_id') )
        return <p>session_id is undefined</p>               //todo: page for canceled order (to retry?)

    const session_id: string = searchParams.session_id
    const response_cart = await uploadToStripe(session_id)      //todo: error handling page if uploadToStripe failes

    const basket: {productId: number, color: string, size: string, quantity: number, product: Product}[] = []       //todo: make DBs store sizeOptions & colorOptions instead of just the string

    // @ts-ignore
    for (const [index, priceId] of response_cart.basket.entries()) {
        const product = await __getProductByStripeId_MOCK(priceId, response_cart.quantities[index])
        basket.push(product)
    }

    // Get selected address
    const customerId = 'test_123456789'             // todo: useSession
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
            <ResetCart/>
            <OrderSummary
                basket={basket}
                amount_subtotal={response_cart.amount_subtotal}
                amount_total={response_cart.amount_total}
                payment_method_type={response_cart.payment_method_type}
                currencySymbol={response_cart.currencySymbol}
                deliveryinfo={deliveryinfo}
            />
        </div>
    );
}