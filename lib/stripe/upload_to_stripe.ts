import {adminDb} from "../../firebaseAdmin";
import {Session} from "next-auth";
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;
import {CustomersDB} from "../firebase/getAllOrders";

export type PostStripeResponse = {
    basket: string[]
    quantities: number[]

    amount_subtotal: number
    amount_total: number
    currencySymbol: string
    payment_method_type: string
}

export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export async function uploadToStripe(session_id: string, sessionAuth: Session) {
    const sessionStripe = await stripe.checkout.sessions.retrieve(session_id);
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

    if (sessionStripe.customer_email !== sessionAuth.user?.email)
        return null

    const customerData = await adminDb.collection('customers')
        .doc(sessionAuth.user?.email!)
        .get()
        .then(doc => doc.data()) as CustomersDB

    await adminDb.collection('customers')
        .doc(sessionAuth.user?.email!)
        .update({
            orders: FieldValue.arrayUnion({
                session_id: session_id,
                session: sessionStripe,
                lineItems: lineItems,
                address: customerData.addresses[customerData.defaultAddress]
            })
    });

    // Get currency symbol from currency
    function currencySymbol(): string {
        switch (sessionStripe.currency) {
            case 'gbp':
                return '£'
            case 'usd':
                return '$'
            case 'eur':
                return '€'
            default:
                return '?'
        }
    }

    const response_cart: PostStripeResponse = {
        basket: lineItems.data.map((item: any) => item.price.id),
        quantities: lineItems.data.map((item: any) => item.quantity),

        amount_subtotal: sessionStripe.amount_subtotal / 100,
        amount_total: sessionStripe.amount_total / 100,
        currencySymbol: currencySymbol(),
        payment_method_type: sessionStripe.payment_method_types[0]
    }
    return response_cart
}