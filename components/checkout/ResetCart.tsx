'use client'

import {useStoreBasket} from "../../src/store";
import {shallow} from "zustand/shallow";
import {useEffect} from "react";

export default function ResetCart() {
    const [resetCart, updateNewestItemAdded] = useStoreBasket(
        (state) => [state.resetCart, state.updateNewestItemAdded],
        shallow
    )

    useEffect(() => {
        updateNewestItemAdded(null)
        resetCart()
    }, [])

    return (
        <></>
    );
}