import {create} from "zustand";
import { persist } from 'zustand/middleware'
import {BasketItem, CurrencyOption} from "../typings";
import {getCurrencies} from "../lib/DATABASE_CATEGORIES";


// BASKET STORE:
type StateBasket = {
    name: string;
    cart: BasketItem[];

    newestItemAdded: BasketItem | null
}

type ActionBasket = {
    updateName: (name: StateBasket['name']) => void
    updateCart: (cart: StateBasket['cart']) => void
    updateNewestItemAdded: (cart: StateBasket['newestItemAdded']) => void

    resetCart: () => void
}

export const useStoreBasket = create<StateBasket & ActionBasket>()(
    persist(
        (set, get) => ({
            name: '',
            cart: [],
            newestItemAdded: null,

            updateName: (name) => set(() => ({ name: name })),
            updateCart: (cart) => set(() => ({ cart: cart })),
            updateNewestItemAdded: (newestItemAdded) => set(() => ({ newestItemAdded: newestItemAdded })),

            resetCart: () => set({cart: []})
        }),
        {
            name: 'basket-storage'
        }
    )
)




// SLIDE-OVER STORE:
type StateSlideover = {
    open: boolean;
}

type ActionSlideover = {
    updateOpen: (name: StateSlideover['open']) => void
}

export const useStoreSlideover = create<StateSlideover & ActionSlideover>()(
    (set) => ({
        open: false,
        updateOpen: (open) => set(() => ({ open: open })),
    })
)


// TEMP BANNER STORE:
type StateTempbanner = {
    open: boolean;
}

type ActionTempbanner = {
    updateOpen: (name: StateTempbanner['open']) => void
}

export const useStoreTempbanner = create<StateTempbanner & ActionTempbanner>()(
    persist(
        (set) => ({
            open: false,
            updateOpen: (open) => set(() => ({ open: open })),
        }),
        {
            name: 'tempbanner-storage'
        }
    )
)





// CURRENCY STORE:
type StateCurrency = {
    currency: CurrencyOption;
}

type ActionCurrency = {
    updateCurrency: (name: StateCurrency['currency']) => void
}

export const useStoreCurrency = create<StateCurrency & ActionCurrency>()(
    persist(
        (set) => ({
            currency: getCurrencies()[0],
            updateCurrency: (currency) => set(() => ({ currency: currency })),
        }),
        {
            name: 'currency-storage'
        }
    )
)




// DARK-MODE STORE:
type StateDarkmode = {
    darkmode: boolean
}

type ActionDarkmode = {
    updateDarkmode: (name: StateDarkmode['darkmode']) => void
}

export const useStoreDarkmode = create<StateDarkmode & ActionDarkmode>()(
    persist(
        (set) => ({
            darkmode: false,
            updateDarkmode: (darkmode) => set(() => ({ darkmode: darkmode })),
        }),
        {
            name: 'darkmode-storage'
        }
    )
)