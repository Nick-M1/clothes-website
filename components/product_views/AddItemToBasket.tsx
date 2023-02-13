'use client'
import React, {useState} from 'react';
import {BasketItem, ColorOptions, Product, SizeOptions} from "../../typings";
import {useStoreBasket} from "../../src/store";
import {getProductById} from "../../lib/databases/DATABASE_API";


export default function AddItemToBasket() {
    const [open, setOpen] = useState(false)
    const [newestProductAdded, setNewestProductAdded] = useState<BasketItem>()

    useStoreBasket.subscribe((state, prevState) => {

        if ( state.newestItemAdded != null ) {
            setNewestProductAdded( state.newestItemAdded )
            setOpen(true)
            setTimeout(() => setOpen(false), 10000)
        }
    })


    return (
        <a href={`/product/${newestProductAdded?.product?.id}`}
            className={`inline-block flex fixed z-40 bottom-0 p-6 right-0 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 smooth-transition ${open ? '' : 'hidden'}`}>

            <img
                src={newestProductAdded?.product?.images[0].src}
                alt={newestProductAdded?.product?.images[0].alt}
                height={40}
                width={100}
            />

            <div className='ml-3'>
                <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                    New item added to basket
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                    {newestProductAdded?.product?.name}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                    <span>{`${newestProductAdded?.size.name}  -  ${newestProductAdded?.color.name}`}</span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                    <span>Qty {newestProductAdded?.quantity}</span>
                </p>
            </div>
        </a>
    );
}