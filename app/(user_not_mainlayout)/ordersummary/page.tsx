import React from 'react';
import OrderSummary from "../../../components/checkout/OrderSummary";
import {__getProductByStripeId_MOCK} from "../../../lib/databases/mock_database";
import {PostResponse} from "../../../pages/api/stripe_uploaddata";
import {Product} from "../../../typings";

// type PageProps = {
//     searchParams: {
//         session_id?: string
//     }
// }

export default async function Page({searchParams}: any) {
    if ( !Object.hasOwn(searchParams, 'session_id') )
        return <p>session_id is undefined</p>               //todo: page for canceled order (to retry?)

    const session_id: string = searchParams.session_id

    const response = await fetch(`${process.env.VERCEL_URL}/api/stripe_uploaddata`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(session_id),
    })

    const data: PostResponse = await response.json()
    const basket: {productId: number, color: string, size: string, quantity: number, product: Product}[] = []       //todo: make DBs store sizeOptions & colorOptions instead of just the string

    // @ts-ignore
    for (const [index, priceId] of data.basket.entries()) {
        const product = await __getProductByStripeId_MOCK(priceId, data.quantities[index])
        basket.push(product)
    }

    return (
        <OrderSummary
            basket={basket}
            amount_subtotal={data.amount_subtotal}
            amount_total={data.amount_total}
            payment_method_type={data.payment_method_type}
            currencySymbol={data.currencySymbol}
        />
    );
}