import {adminDb} from "../../firebaseAdmin";
import {Session} from "next-auth";

export type AddressDB = {
    name: string
    address: string
    city: string
    state: string
    postcode: string
    phonenumber: string
    country: string
}

export type LineItemDB = {
    data: [{
        amount_discount: number,
        amount_subtotal: number,
        amount_tax: number,
        amount_total: number,
        currency: string,
        description: string,
        price: {
            id: string
        },
        quantity: number,
    }]
}

export type SessionItemDB = {
    amount_subtotal: number,
    amount_total: number,
    created: string,
    currency: string,
    id: string,
    payment_method_types: string[],

}

export type CustomersDB = {
    orders: [{
        lineItems: LineItemDB,
        session_id: string,
        session: SessionItemDB,
        address: AddressDB,
    }],

    customerId: string,
    defaultAddress: number,
    addresses: AddressDB[],
}

export async function getAllOrders(sessionAuth: Session) {

    const data = await adminDb.collection('customers')
        .doc(sessionAuth.user?.email!)
        .get()
        .then(doc => doc.data()) as CustomersDB

    if (typeof data === 'undefined')
        return null

    return data.orders
}