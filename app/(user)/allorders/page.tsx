import ListOrders from "../../../components/user/orders/ListOrders";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import {getAllOrders} from "../../../lib/firebase/getAllOrders";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Your Orders'
}

export default async function Page() {
    const sessionAuth = await getServerSession(authOptions)
    const allOrders = await getAllOrders(sessionAuth!)

    return (
        <div className='pt-4 bg-gray-50'>
            <ListOrders allOrders={allOrders} sessionAuth={sessionAuth!} />
        </div>
    );
}