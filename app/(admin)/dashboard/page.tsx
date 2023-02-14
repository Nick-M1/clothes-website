import React from 'react';
import AddAllToStripe from "../../../components/stripe/AddAllToStripe";
import ResetCart from "../../../components/checkout/ResetCart";
// import AddAllToFirebase from "../../../components/firebase/AddAllToFirebase.tsx.txt";


export default function Page() {
    return (
        <div>
            <ResetCart/>
            {/*<div className='m-10'><AddAllToStripe/></div>*/}
            {/*<div className='m-10'><AddAllToFirebase/></div>*/}
        </div>
    );
}
