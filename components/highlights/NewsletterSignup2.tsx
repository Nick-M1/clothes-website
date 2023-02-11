'use client'
import React, {FormEvent, useState} from "react";
import {EnvelopeIcon} from "@heroicons/react/24/outline";

export default function NewsletterSignup2() {
    const [email, setEmail] = useState("");
    // const router = useRouter();
    //
    const handleNewsletterInit = async (e: FormEvent<HTMLFormElement>) => {
        //     e.preventDefault();
        //     setEmail("");
        //     router.push(`/search/${email}`);
    };

    return (
        <div className="mx-auto container py-16 px-6">
            <div className="flex flex-col lg:flex-row justify-center items-center xl:space-x-44 lg:space-x-24 space-y-8 lg:space-y-0">
                <div className="md:px-12 lg:px-0 flex flex-col justify-start items-start lg:w-2/5 xl:w-3/12">
                    <div>
                        <p className="text-sm leading-3 text-gray-600">Subscribe to our newsletter</p>
                    </div>
                    <div className="xl:mt-4 mt-2">
                        <p className="text-4xl font-semibold leading-9 text-gray-800">Join Our Mailing List</p>
                    </div>
                    <div className="xl:mt-6 mt-4">
                        <p className="text-base leading-6 text-gray-600">Subscribe to our weekly newsletter to get the latest new arrivals and offers.</p>
                    </div>


                    <form onSubmit={handleNewsletterInit} className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 overflow-hidden lg:max-w-[337px] md:max-w-[320px] max-w-[300px] w-full mt-3">
                        <div className="grid place-items-center h-full w-12 border-none bg-gray-200">
                            <EnvelopeIcon className="pointer-events-non h-6 w-6 text-gray-400 border-none hover:text-gray-500 smooth-transition" aria-hidden="true" />
                        </div>
                        <input
                            className="peer h-full w-full border-none text-sm text-gray-700 pr-2 smooth-transition focus:ring-0 "
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

                <div>
                    <img src="https://i.ibb.co/CzGcZF4/pexels-katie-e-3671083-1.png" alt="girl"
                         className='display-img-darken'
                    />
                </div>

            </div>
        </div>
    );
}
