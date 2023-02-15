import { NextApiRequest, NextApiResponse } from 'next'
import {CommentItem, ShippingAddress} from "../../typings";
import {adminDb} from "../../firebaseAdmin";
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;

const stripeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const addressPost: ShippingAddress = req.body.newAddressPost

    const productsRef = adminDb.collection('customers');
    await productsRef
        .doc(addressPost.customerId)
        .update({
                addresses: FieldValue.arrayUnion({
                    name: addressPost.name,
                    address: addressPost.address,
                    city: addressPost.city,
                    state: addressPost.state,
                    postcode: addressPost.postcode,
                    phonenumber: addressPost.phonenumber,
                    country: addressPost.country,
                })
            }
        )

    res.status(200).send('')

}

export default stripeHandler
