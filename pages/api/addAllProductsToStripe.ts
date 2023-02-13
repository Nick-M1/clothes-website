// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Breadcrumbs, ColorOptions, ImageInfo, Product, SizeOptions} from "../../typings";
import {adminDb} from "../../firebaseAdmin";
import {getAllProducts} from "../../lib/databases/DATABASE_API";
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;

type Data = {
    productRes: Product[]
}

type ErrorData = {
    body: string
}

type StripeResponse = {
    productId: string
    priceId?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {

    if (req.method !== 'POST') {
        res.status(405).json({body: 'Method not allowed'})
        return
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const productsRef = adminDb.collection('products');
    const snapshot = await productsRef.get();


    // noinspection ES6MissingAwait
    snapshot.forEach(async doc => {
        // console.log(doc.id, '=>', doc.data());

        const product = doc.data() as Product

        await productsRef
            .doc(product.id.toString())
            .update({
                stripe_ids: FieldValue.delete()
            })

        for (const sizeOption of product.sizes) {
            for (const colorOption of product.colors) {

                const createdProduct = await stripe.products.create({
                    id: `${product.id}_${colorOption.name}_${sizeOption.name}`,
                    name: `${product.name} ${colorOption.name} ${sizeOption.name}`,
                    description: product.description,
                    images: product.images.map(im => im.src),
                    url: `https://shopping-clothes-website.vercel.app/product/${product.id}`
                })

                const createdPrice = await stripe.prices.create({
                    unit_amount: product.price * 100,
                    currency: 'gbp',
                    product: createdProduct.id,
                });

                await productsRef
                    .doc(product.id.toString())
                    .update({
                            stripe_ids: FieldValue.arrayUnion({
                                size: sizeOption.name, color: colorOption.name, stripe_id: createdPrice.id
                            })
                        }
                    )

            }
        }



    });

    const { productRes } = req.body
    res.status(200).json({ productRes })
}
