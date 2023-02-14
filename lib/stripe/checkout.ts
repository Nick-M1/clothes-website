import {loadStripe, Stripe} from "@stripe/stripe-js";
import {StripeCheckoutItem} from "../../typings";

export async function checkout({lineItems}: {lineItems: StripeCheckoutItem[]}) {
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
        successUrl: `${window.location.origin}/ordersummary?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}`,
    })
}