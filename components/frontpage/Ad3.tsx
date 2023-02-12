import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Ad3() {
    return (
        <div className="mx-auto container pt-5 lg:py-12 md:px-6 2xl:px-0 flex justify-center items-center">
            <div className="flex flex-row justify-center items-center space-x-2 lg:space-x-8 space-y-0 px-3 lg:px-20 sm:px-30 md:px-30 lg:px-30 w-auto">
                <Link href='/search/women' className="relative">
                    <Image
                        className='rounded-lg overflow-hidden hover:grayscale-[50%] drop-shadow-md'
                        src="/clothes_imgs/vertical/img1.jpg"
                        alt="summer-style-2"
                        width={400}
                        height={800}
                    />

                    <div className="absolute bottom-4 sm:bottom-5 inset-x-4 sm:inset-x-5 flex flex-col justify-start items-start rounded-lg">
                        <div className="mt-2">
                            <p className="hidden md:block text-base leading-6 sm:leading-4 text-white text-shadow">Shop the collection</p>
                        </div>
                        <div>
                            <p className="md:text-2xl font-extrabold text-shadow leading-6 text-white">Womens's</p>
                        </div>
                    </div>
                </Link>

                <Link href='/search/men' className="relative">
                    <Image
                        className='rounded-lg overflow-hidden hover:grayscale-[50%] drop-shadow-md'
                        src="/clothes_imgs/vertical/img2.jpg"
                        alt="summer-style-2"
                        width={400}
                        height={800}
                    />
                    <div className="absolute bottom-4 sm:bottom-5 inset-x-4 sm:inset-x-5 flex flex-col justify-start items-start rounded-lg">
                        <div className="mt-2">
                            <p className="hidden md:block text-base leading-6 sm:leading-4 text-white text-shadow">Shop the collection</p>
                        </div>
                        <div>
                            <p className="md:text-2xl font-extrabold text-shadow leading-6 text-white">Men's</p>
                        </div>
                    </div>
                </Link>

                <Link href='/search/' className="relative">
                    <Image
                        className='rounded-lg overflow-hidden hover:grayscale-[50%] drop-shadow-md'
                        src="/clothes_imgs/vertical/img4.jpg"
                        alt="summer-style-2"
                        width={400}
                        height={800}
                    />

                    <div className="absolute bottom-4 sm:bottom-5 inset-x-4 sm:inset-x-5 flex flex-col justify-start items-start rounded-lg">
                        <div className="mt-2">
                            <p className="hidden md:block text-base leading-6 sm:leading-4 text-white text-shadow">Shop the collection</p>
                        </div>
                        <div>
                            <p className="md:text-2xl font-extrabold text-shadow leading-6 text-white">New Arrivals</p>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}