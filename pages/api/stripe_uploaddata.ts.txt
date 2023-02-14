import { NextApiRequest, NextApiResponse } from 'next'
import {adminDb} from "../../firebaseAdmin";

export type PostResponse = {
    basket: string[]
    quantities: number[]

    amount_subtotal: number
    amount_total: number
    currencySymbol: string
    payment_method_type: string
}

const stripeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const session_id: string = req.body

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.retrieve( session_id );
    const lineItems = await stripe.checkout.sessions.listLineItems( session_id );

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


    const response_cart: PostResponse = {
        basket:     lineItems.data.map((item: any) => item.price.id),
        quantities: lineItems.data.map((item: any) => item.quantity),

        amount_subtotal: session.amount_subtotal / 100,
        amount_total: session.amount_total / 100,
        currencySymbol: session.currencySymbol,
        payment_method_type: session.payment_method_types[0]
    }

    res.status(200).json( response_cart )

}

export default stripeHandler
