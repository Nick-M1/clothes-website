import React from 'react';
import BasketView from "../../../components/checkout/BasketView/BasketView";
import Stepper from "../../../components/checkout/Stepper";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Checkout'
}

export default function CheckoutPage() {
    return (
        <div className='bg-gray-50'>
            <div className='pl-10 md:px-72 md:ml-32 py-10'>
                <Stepper currentStateIdx={1}/>
            </div>
            <BasketView/>
        </div>
    );
}