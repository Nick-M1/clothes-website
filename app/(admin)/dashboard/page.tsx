import React from 'react';
import AddAllToStripe from "../../../components/stripe/AddAllToStripe";
import ResetCart from "../../../components/checkout/ResetCart";
import Demo1 from "../../../components/redis/Demo1";
// import AddAllToFirebase from "../../../components/firebase/AddAllToFirebase.tsx.txt";


export default function Page() {
    return (
        <div>
            {/*<ResetCart/>*/}
            <Demo1/>
            {/*<div className='m-10'><AddAllToStripe/></div>*/}
            {/*<div className='m-10'><AddAllToFirebase/></div>*/}
        </div>
    );
}
