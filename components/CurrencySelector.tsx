import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {getCurrencies} from "../lib/DATABASE_CATEGORIES";
import { useStoreCurrency} from "../src/store";
import {shallow} from "zustand/shallow";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const useHasHydrated = () => {
    const [hasHydrated, setHasHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
};

export default function CurrencySelector() {
    const currenciesInfo = getCurrencies()

    const [selectedCurrency, setSelectedCurrency] = useStoreCurrency(
        (state) => [state.currency, state.updateCurrency],
        shallow
    )

    const hasHydrated = useHasHydrated();

    return hasHydrated ?
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
            {({open}) => (
                <>
                    <div className="relative mt-1 w-32 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm smooth-transition hover:border-blue-400 dark:border-gray-400 dark:hover:border-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <img src={selectedCurrency.img} alt="" className="h-6 w-6 flex-shrink-0"/>
                        <span className="ml-3 block truncate">{selectedCurrency.shortName}</span>
                      </span>
                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto scrollbar rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {currenciesInfo.map((currency) => (
                                    <Listbox.Option
                                        key={currency.id}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 smooth-transition'
                                            )
                                        }
                                        value={currency}
                                    >
                                        {({selected, active}) => (
                                            <div className='cursor-pointer'>
                                                <div className="flex items-center">
                                                    <img src={currency.img} alt=""
                                                         className="h-6 w-6 flex-shrink-0"/>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate smooth-transition')} >
                                                        {currency.shortName}
                                                        </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4 smooth-transition'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </span>
                                                ) : null}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
        :
        <div className='w-32 h-10 rounded-md border border-gray-300 pl-3 pr-10 mt-1 opacity-70'></div>

}