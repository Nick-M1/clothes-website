'use client'

import React, {FormEvent, useState} from "react";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {EnvelopeIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";

// todo: If not using as a popup, remove the 'show' state

export default function NewsletterSignup1() {
    const [show, setShow] = useState(true);

    const [email, setEmail] = useState("");
    // const router = useRouter();
    //
    const handleNewsletterInit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setEmail("");
    //     router.push(`/search/${email}`);
    };


    return (
        <div className={`${show ? "flex" : "hidden"} justify-center mx-auto lg:px-20 md:px-6 px-4 lg:py-16 md:py-12 relative`} >

        {/*<div className={`${show ? "flex" : "hidden"} lg: md:max-w-[744px] max-w-[375px] justify-center mx-auto md:px-6 px-4 lg:py-24 md:py-12 py-9 relative`} >*/}
            {/*<div className="items-center cursor-pointer absolute right-10 top-28 z-10">*/}
            {/*    <XMarkIcon*/}
            {/*        onClick={() => setShow(false)}*/}
            {/*        width={24}*/}
            {/*        height={24}/>*/}
            {/*</div>*/}
            <div className="relative w-full mx-auto">
                <img
                    src="clothes_imgs/horizontal/img2.jpg"
                    alt='pic'
                    className="w-full rounded-lg drop-shadow-md grayscale-[20%] hover:grayscale-[50%]"
                />
                <div
                    className="absolute lg:bottom-10 lg:left-6 md:bottom-6 md:left-4 bottom-4 left-0 w-full px-4">
                    <p className="text-white text-2xl font-semibold text-shadow">
                        Be The First To Know!
                    </p>
                    <p className="text-white pt-4 text-shadow">
                        Subscribe to our newsletter for special offers
                    </p>

                    <form onSubmit={handleNewsletterInit} className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow overflow-hidden lg:max-w-[337px] md:max-w-[320px] max-w-[300px] w-full mt-3">
                        <div className="grid place-items-center h-full w-12 border-none bg-gray-200">
                            <EnvelopeIcon className="pointer-events-non h-6 w-6 text-gray-400 border-none hover:text-gray-500 smooth-transition" aria-hidden="true" />
                        </div>
                        <input
                            className="peer h-full w-full border-none text-sm text-gray-700 pr-2 focus:ring-0 smooth-transition"
                            type="text"
                            id="search"
                            placeholder="Enter email address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </form>
                    <button
                        className="lg:max-w-[337px] md:max-w-[320px] max-w-[300px] w-full border py-3 mt-4 btn-primary">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}