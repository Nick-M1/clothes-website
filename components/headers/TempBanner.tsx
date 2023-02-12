'use client'

import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, {useState, useRef} from "react";
import {useStoreTempbanner} from "../../src/store";
import Link from "next/link";

const BANNER_TIMER = 60

export default function TempBanner() {
    const [open, setOpen] = useState(false);

    const counter = useRef(0);
    const setInitialised = useStoreTempbanner(state => state.updateOpen)

    React.useEffect(() => {
        if (!useStoreTempbanner.getState().open && counter.current < BANNER_TIMER) {
            counter.current += 1;

            const timer = setTimeout(() => {
                setOpen(true)
                setInitialised(true)
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <div>
            { open ? <div className="bg-indigo-600">
                <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex w-0 flex-1 items-center">
                    <span className="flex rounded-lg bg-indigo-800 p-2">
                      <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                    </span>
                            <p className="ml-3 truncate font-medium text-white">
                                <span className="md:hidden">Mid-Season Sale now on!</span>
                                <span
                                    className="hidden md:inline">Mid-Season Sale now on! Up to 50% off</span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                            <Link
                                href="/search"
                                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
                            >
                                Go to sale
                            </Link>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button
                                type="button"
                                className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                                onClick={() => setOpen(false)}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div> : null }
        </div>
    )
}
