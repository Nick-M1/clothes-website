'use client'

import React from 'react';
import {getAllProducts} from "../../lib/DATABASE_PRODUCTS";

type StripeResponse = {
    productId: string
    priceId?: string
}

async function addAllToStripe() {
    const allProducts = getAllProducts()
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);            // client prop, so give it real key (need to set up a NextJS API for this)

    const myList: StripeResponse[] = []

    for (const product of allProducts) {
        const createdProduct = await stripe.products.create({
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images.map(im => im.src),
            url: `https://shopping-clothes-website.vercel.app/product/${product.id}`
        })
        console.log(createdProduct)
        let newStripeProduct: StripeResponse = { productId: createdProduct.id }

        const price = await stripe.prices.create({
            unit_amount: product.price * 100,
            currency: 'gbp',
            product: createdProduct.id,
        });
        console.log(price)
        newStripeProduct.priceId = price.id

        myList.push(newStripeProduct)
    }

    console.log(myList)
}

export default function AddAllToStripe() {
    return (
        <div>
            <button className='btn-primary m-5' onClick={() => addAllToStripe()}>Add products to Stripe</button>
        </div>
    );
}