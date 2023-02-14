import {adminDb} from "../../firebaseAdmin";

export type PostStripeResponse = {
    basket: string[]
    quantities: number[]

    amount_subtotal: number
    amount_total: number
    currencySymbol: string
    payment_method_type: string
}

export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export async function uploadToStripe(session_id: string) {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

    await adminDb.collection('checkout_payments').doc(session_id).set({
        session: session,
        lineItems: lineItems
    });

    // Get currency symbol from currency
    let currencySymbol: string
    switch (session.currency) {
        case 'gbp':
            currencySymbol = '£'
            break
        case 'usd':
            currencySymbol = '$'
            break
        case 'eur':
            currencySymbol = '€'
            break
        default:
            currencySymbol = '?'
    }


    const response_cart: PostStripeResponse = {
        basket: lineItems.data.map((item: any) => item.price.id),
        quantities: lineItems.data.map((item: any) => item.quantity),

        amount_subtotal: session.amount_subtotal / 100,
        amount_total: session.amount_total / 100,
        currencySymbol: currencySymbol,
        payment_method_type: session.payment_method_types[0]
    }
    return response_cart
}