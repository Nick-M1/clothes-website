import { NextApiRequest, NextApiResponse } from 'next'
import {CommentItem} from "../../typings";
import {getAllProducts} from "../../lib/databases/DATABASE_API";
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
    const commentPost: CommentItem = req.body.commentPost

    const productsRef = adminDb.collection('products');
    await productsRef
        .doc(commentPost.productId.toString())
        .update({
                comments: FieldValue.arrayUnion({
                    name: commentPost.name, rating: commentPost.rating, comment: commentPost.comment, created_at: Date.now()
                })
            }
        )

    res.status(200).send('')

}

export default stripeHandler
