import React, {useState} from 'react';
// import FooterDarkmodeButton from "./FooterDarkmodeButton";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    // todo: Dark mode button

    return (
        <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:pb-5 border-gray-200 dark:bg-gray-900">
            <div className="flex items-center justify-between">

                <div>
                    <Link href="/" className="flex items-center mb-4 sm:mb-0">
                        <Image height={30} width={40} src="/brand-logo.png" className="h-8 mr-3" alt="Logo"/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Shopping Website</span>
                    </Link>
                    <ul className="flex flex-wrap items-left mb-6 text-sm text-gray-500 sm:mb-0 lg:mt-2 dark:text-gray-400">
                        <li>
                            <Link href="/aboutus" className="mr-4 hover:underline md:mr-6 smooth-transition">About</Link>
                        </li>
                        <li>
                            <Link href="/aboutus" className="mr-4 hover:underline md:mr-6 smooth-transition">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/faqs" className="mr-4 hover:underline md:mr-6  smooth-transition">FAQs</Link>
                        </li>
                        <li>
                            <Link href="/aboutus" className="hover:underline smooth-transition">Contact</Link>
                        </li>
                    </ul>

                </div>
                {/*<FooterDarkmodeButton/>*/}

            </div>
        </footer>
    )
}