import Link from "next/link";
import {AddressDB, LineItemDB, SessionItemDB} from "../../../lib/firebase/getAllOrders";
import {Session} from "next-auth";
import {dateFormatter, currencyFormatter} from "../../../lib/utils";
import {__getProductByStripeId_MOCK} from "../../../lib/databases/mock_database";
import Image from "next/image";
import {Product} from "../../../typings";

type Props = {
    order: {
        lineItems: LineItemDB, session_id: string, session: SessionItemDB, address: AddressDB
    },
    sessionAuth: Session
}

export default async function OrderItem({order, sessionAuth}: Props) {
    const bucketitems: {productId: number, color: string, size: string, quantity: number, product: Product}[] = []

    for (const item of order.lineItems.data) {
        const product = await __getProductByStripeId_MOCK(item.price.id)
        bucketitems.push(product)
    }

    return (
        <article className="p-3 pb-5 lg:p-5 mb-5 bg-white border border-gray-200 shadow-sm rounded hover:border-blue-400 hover:bg-blue-50 smooth-transition">
            <a href={`/ordersummary?session_id=${order.session_id}&reset_cart=false`}>
                <header className="lg:justify-between mb-4">
                    <div className="mb-4 lg:mb-0">
                        <p className="font-semibold flex justify-between">
                            <span className='text-blue-600'> Order ID: {order.session_id.replace(/\D/g, '')} </span>
                            <span className=''> Processing</span>
                        </p>
                        <p className="text-gray-500 italic">{dateFormatter.format(new Date(Number(order.session.created) * 1000))} </p>
                    </div>
                </header>
                <div className="grid md:grid-cols-3 gap-2">
                    <div>
                        <p className="text-gray-400 mb-1">Customer Details</p>
                        <ul className="text-gray-600">
                            <li> {order.address.name} </li>
                            <li> Phone: {order.address.phonenumber} </li>
                            <li> Email: {sessionAuth.user?.email} </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-gray-400 mb-1">Delivery address</p>
                        <ul className="text-gray-600">
                            <li> {order.address.address} </li>
                            <li> {order.address.city}, {order.address.state} </li>
                            <li> {order.address.postcode}, {order.address.country} </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-gray-400 mb-1">Payment</p>
                        <ul className="text-gray-600">
                            <li className="text-green-400">PAID</li>
                            <li>Tax paid:
                                ${currencyFormatter((order.session.amount_total - order.session.amount_subtotal) / 100)}</li>
                            <li>Total paid: ${currencyFormatter(order.session.amount_total / 100)}</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-4"/>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-6">
                    {/*{ bucketitems.slice(0, 3).map( (item, index) =>*/}
                    {/* todo: only show first 3 at start, then click to expand if more than 3 items */}
                    { bucketitems.map( (item, index) =>
                    <figure key={index} className="flex flex-row mb-4">
                        <div>
                            <div className="absolute w-16 h-20 rounded border border-gray-200 overflow-hidden p-3">
                                <Image src={item.product.images[0].src} alt={item.product.images[0].alt} fill />
                            </div>
                        </div>
                        <figcaption className="ml-28">
                            <p>{item.product.name} {item.size}</p>
                            <p className="mt-1 font-semibold">{order.lineItems.data[index].quantity} x ${currencyFormatter(item.product.price)}</p>
                        </figcaption>
                    </figure>
                    )}
                </div>
            </a>
        </article>
    );
};