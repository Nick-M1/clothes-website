'use client'
import React from 'react';


export default function Demo1() {

    const message = {
        id: 2,
        message: 'hello',
        created_at: Date.now(),
        email: 'hello@gmail.com'
    }

    // const addMessage = async () => {
    //     const res = await fetch('/api/addMessage', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             message
    //         })
    //     })
    //     const data = await res.json()
    // }

    const addAllProductsToFirebase = async () => {
        const res = await fetch('/api/addAllProductsToFirebase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({          //todo remove
                message
            })
        })
        const data = await res.json()
    }

    const addAllProductsToStripe = async () => {
        const res = await fetch('/api/addAllProductsToStripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message
            })
        })
        const data = await res.json()
    }

    return (
        <div>
            <button onClick={() => addAllProductsToFirebase()} className='btn-primary m-10'>
                All To Firebase
            </button>

            <button onClick={() => addAllProductsToStripe()} className='btn-primary m-10'>
                All To Stripe
            </button>


            {/*<button onClick={() => addMessage()} className='btn-primary m-10'>*/}
            {/*    To Redis*/}
            {/*</button>*/}

            {/*{ allMessages.length === 0 ? <p>None</p> : allMessages.map((message, idx) => <p key={idx}>{message.message}</p>) }*/}
        </div>
    );
}