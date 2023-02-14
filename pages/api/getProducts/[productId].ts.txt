// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {adminDb} from "../../../firebaseAdmin";
import {GetProductByIdResponse, Product} from "../../../typings";


type ErrorData = {
    body: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetProductByIdResponse | ErrorData>
) {

    if (req.method !== 'GET') {
        res.status(405).json({body: 'Method not allowed'})
        return
    }

    const { productId } = req.query

    const cityRef = adminDb.collection('products').doc(productId as string);
    const doc = await cityRef.get();

    const product = doc.data() as Product

    // if (!doc.exists) {
    //     console.log('No such document!');
    // } else {
    //     console.log('Document data:', doc.data());
    // }

    res.status(200).json({ product })
}