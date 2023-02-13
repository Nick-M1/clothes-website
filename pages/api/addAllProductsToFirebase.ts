// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Breadcrumbs, ColorOptions, ImageInfo, Product, SizeOptions} from "../../typings";
import {adminDb} from "../../firebaseAdmin";
import {getAllProducts} from "../../lib/databases/DATABASE_API";

type Data = {
    productRes: Product[]
}

type ErrorData = {
    body: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {

    if (req.method !== 'POST') {
        res.status(405).json({body: 'Method not allowed'})
        return
    }

    const allProducts = await getAllProducts()
    const productsRef = adminDb.collection('products');

    allProducts.forEach( product =>
        productsRef
            .doc(product.id.toString())
            .set({ ...product })
    )

    const { productRes } = req.body
    res.status(200).json({ productRes })
}
