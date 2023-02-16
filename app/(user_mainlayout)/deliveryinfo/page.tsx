import ShippingMenu from "../../../components/user/address/ShippingMenu";
import Stepper from "../../../components/checkout/Stepper";
import React from "react";

export default function Page() {
    return (
        <div className='bg-gray-50'>
            <div className='pl-10 md:px-72 md:ml-32 py-10'>
                <Stepper currentStateIdx={2}/>
            </div>
            <ShippingMenu/>
        </div>
    );
}