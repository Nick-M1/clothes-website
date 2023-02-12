import React from 'react';
import BasketView from "../../../components/checkout/BasketView/BasketView";
import Stepper from "../../../components/checkout/Stepper";

export default function CheckoutPage() {
    return (
        <div>
            <div className='pl-10 md:px-72 md:ml-32 py-10'>
                <Stepper currentStateIdx={1}/>
            </div>
            <BasketView/>
        </div>
    );
}