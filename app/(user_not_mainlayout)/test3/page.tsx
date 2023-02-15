import CommentSection from "../../../components/product_views/comment_section/CommentSection";
import {getProductById} from "../../../lib/databases/DATABASE_API";
import React from "react";
import NewAddress from "../../../components/user/address/NewAddress";
import ShippingMenu from "../../../components/user/address/ShippingMenu";
import ListOrders from "../../../components/user/orders/ListOrders";
import AllOrders from "../../../components/user/orders/AllOrders";

export default async function Page() {


    return (
        <div className='gap-5'>
            <ShippingMenu/>
        </div>



        // <ListOrders/>
        // <AllOrders/>
    )

}