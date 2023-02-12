import React from 'react';
import Link from "next/link";
import Image from "next/image";


// todo: unused
export default function Ad4() {
    return (
        <section>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-32">
                <header className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        Vintage Collection
                    </h2>

                    <p className="max-w-md mx-auto mt-4 text-gray-500">
                        Looking for that perfect fringed jacket, cowboy shirt or retro band tee - or pretty much anything vintage for man, woman or child?
                    </p>
                </header>

                <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-4">
                    <li>
                        <Link href="search/men/shoes/trainers" className="relative block group">
                            <Image
                                fill
                                src="clothes_imgs/vertical/trainers-img1.avif"
                                alt=""
                                className="object-cover transition duration-500 aspect-square display-img group-hover:opacity-90"
                            />

                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6" >
                                <h3 className="text-xl font-medium text-white">Casual Trainers</h3>
                                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white btn-primary" >
                                    Shop Now
                                </span>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link href="/search/women/clothing/jumpers" className="relative block group">
                            <Image
                                fill
                                src="clothes_imgs/vertical/white-jumper-img1.avif"
                                alt=""
                                className="object-cover w-full h-full transition duration-500 aspect-square display-img group-hover:opacity-90"
                            />

                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6" >
                                <h3 className="text-xl font-medium text-white">Winter Jumpers</h3>

                                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white btn-primary" >
                                    Shop Now
                                </span>
                            </div>
                        </Link>
                    </li>

                    <li className="lg:col-span-3 lg:col-start-2 lg:row-span-3 lg:row-start-1 w-[747px]">
                        <Link href="/search/women/clothing/jeans" className="relative block group">
                            <Image
                                fill
                                src="clothes_imgs/vertical/vintage-jeans-img1.jpg"
                                alt=""
                                className="w-full h-full transition duration-500 display-img group-hover:hidden"
                            />
                            <Image
                                fill
                                src="clothes_imgs/vertical/vintage-jeans-img2.jpg"
                                alt=""
                                className="hidden w-full h-full transition duration-500 display-img group-hover:block"
                            />

                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6" >
                                <h3 className="text-xl font-medium text-white">Skinny Jeans Blue</h3>
                                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white btn-primary" >
                                    Shop Now
                                </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}