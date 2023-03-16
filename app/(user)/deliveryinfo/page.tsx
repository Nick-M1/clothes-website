import ShippingMenu from "../../../components/user/address/ShippingMenu";
import Stepper from "../../../components/checkout/Stepper";
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import SigninRedirecting from "../../../components/auth/SigninRedirecting";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Checkout'
}

export default async function Page() {
    const sessionAuth = await getServerSession(authOptions)

    if (sessionAuth == null)
        return <SigninRedirecting/>

    return (
        <div className='bg-gray-50'>
            <div className='pl-10 md:px-72 md:ml-32 py-10'>
                <Stepper currentStateIdx={2}/>
            </div>
            <ShippingMenu sessionAuth={sessionAuth}/>
        </div>
    );
}