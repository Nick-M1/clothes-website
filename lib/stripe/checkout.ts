import {loadStripe, Stripe} from "@stripe/stripe-js";
import {StripeCheckoutItem} from "../../typings";


// todo: update stripe to new API as this is depreciated
//          new API uses SECRET_STRIPE env, so need to run in an api on server & send back to client via a redirect

export async function checkout({lineItems, email}: {lineItems: StripeCheckoutItem[], email?: string}) {
    let stripePromise: Promise<Stripe | null> | null = null

    const getStripe = () => {
        if (!stripePromise)
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

        return stripePromise
    }

    const stripe = await getStripe()

    await stripe?.redirectToCheckout({
        mode: 'payment',
        lineItems: lineItems,
        customerEmail: email,
        successUrl: `${window.location.origin}/ordersummary?session_id={CHECKOUT_SESSION_ID}&reset_cart=true`,
        cancelUrl: `${window.location.origin}`,
    })
}