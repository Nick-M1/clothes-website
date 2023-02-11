'use client'


import {checkout} from "../../lib/checkout";

export default function StripeButton() {

    return <div>
        <button className='btn-primary p-10' onClick={() => {
            checkout({
                lineItems: [
                    {
                        price: 'price_1MaN9oL3RAkjlsFcDMEkthmw',
                        quantity: 1
                    }
                ]
            })
        }}>
            Go to stripe
        </button>
    </div>;
}