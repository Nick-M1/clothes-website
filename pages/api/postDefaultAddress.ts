import { NextApiRequest, NextApiResponse } from 'next'
import {CommentItem} from "../../typings";
import {adminDb} from "../../firebaseAdmin";
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;

export type DefaultAddressPostReq = {
    customerId: string
    deliveryinfo: number
}

const stripeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const {deliveryinfo, customerId} = req.body as DefaultAddressPostReq

    const productsRef = adminDb.collection('customers');
    await productsRef
        .doc(customerId)
        .update({
                defaultAddress: deliveryinfo
            }
        )

    res.status(200).send('')
}

export default stripeHandler
