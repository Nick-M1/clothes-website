'use client'

import React, {useEffect, useState} from 'react';
import {useStoreBasket, useStoreCurrency} from "../src/store";

export const useHasHydrated = () => {
    const [hasHydrated, setHasHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
};

type PageProps = {
    cssClass: string
}

export default function DisplayBasketTotal({cssClass}: PageProps) {
    const currencySymbol = useStoreCurrency.getState().currency.symbol

    const cart = useStoreBasket(state => state.cart)
    const totalPrice = cart.length == 0
        ? 0
        : cart
        .map(p => p.product.price * p.quantity)
        .reduce((a, b) => a + b )

    const hasHydrated = useHasHydrated()

    return hasHydrated ?
        <p className={`${cssClass} w-5`}>
            {`${currencySymbol}${totalPrice.toFixed(2)}`}
        </p>
        :
        <p className={`${cssClass} w-5 opacity-0`}>
            0
        </p>
}