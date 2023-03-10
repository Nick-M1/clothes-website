import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function SaleAd() {
    return (
        <div className="relative flex flex-col-reverse lg:flex-col">
            <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                <svg
                    className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    preserveAspectRatio="none slice"
                >
                    <path d="M50 0H100L50 100H0L50 0Z" />
                </svg>
                <Image
                    width={300}
                    height={500}
                    className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                    src="/clothes_imgs/horizontal/img1.jpg"
                    alt=""
                />
            </div>
            <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-green-300">
                        Brand new
                    </p>
                    <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl sm:leading-none">
                        Mid-Season Sale
                    </h2>
                    <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                        Up to 50% off outlet items
                    </p>
                    <div className="flex items-center">
                        <Link
                            href="/search"
                            className="inline-flex items-center justify-center h-12 px-6 mr-6 btn-primary"
                        >
                            Go to Sale
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}