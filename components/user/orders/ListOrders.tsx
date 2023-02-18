import OrderItem from "./OrderItem";
import {AddressDB, LineItemDB, SessionItemDB} from "../../../lib/firebase/getAllOrders";
import {Session} from "next-auth";

type Props = {
    allOrders: [{
        lineItems: LineItemDB, session_id: string, session: SessionItemDB, address: AddressDB
    }] | null,
    sessionAuth: Session
}

export default function ListOrders({ allOrders, sessionAuth }: Props) {

    const diplayAllOrders = allOrders == null
        ? <p className='h-screen'>No previous orders</p>
        : allOrders
            .sort((a, b) => Number(b.session.created) - Number(a.session.created))
            .map( (order, index) => {
                // @ts-ignore
                return <OrderItem key={index} order={order} sessionAuth={sessionAuth}/>
            })

    return (
        <section className="py-12 pb-20">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row -mx-4">
                    <main className="md:w-2/3 lg:w-3/4 px-4">
                        <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
                        { diplayAllOrders }
                    </main>
                </div>
            </div>
        </section>
    );
}