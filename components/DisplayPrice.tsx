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
    price: number
    cssClass: string
}


export default function DisplayPrice({price, cssClass}: PageProps) {
    const currencySymbol = useStoreCurrency.getState().currency.symbol
    const hasHydrated = useHasHydrated()

    return hasHydrated ?
        <p className={`${cssClass} w-5`}>
            {`${currencySymbol}${price.toFixed(2)}`}
        </p>
        :
        <p className={`${cssClass} w-5 opacity-0`}>
            0
        </p>
}