// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {adminDb} from "../../../firebaseAdmin";
import {GetAllProductsResponse, Product} from "../../../typings";


type ErrorData = {
    body: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetAllProductsResponse | ErrorData>
) {

    if (req.method !== 'GET') {
        res.status(405).json({body: 'Method not allowed'})
        return
    }

    const productsRef = adminDb.collection('products');
    const snapshot = await productsRef.get();

    const productsArray = [] as Product[]

    snapshot.forEach( doc => {
        const product = doc.data() as Product
        productsArray.push(product)
    })


    res.status(200).json({ productsArray })
}