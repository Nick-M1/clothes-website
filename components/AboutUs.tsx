import React from "react";
import Image from "next/image";

export default function AboutUs() {

    const images = [
        "/clothes_imgs/vertical/img15.jpg",
        "/clothes_imgs/vertical/img12.jpg",
        "/clothes_imgs/vertical/img13.jpg",
        "/clothes_imgs/vertical/img14.jpg"
    ]

    return (
        <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
            <div className=" text-center">
                <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 md:w-full w-9/12 mx-auto">Follow Us on Instagram</h2>
                <p className=" font-normal text-base leading-6 text-gray-600 mt-4 lg:w-5/12 md:w-9/12 mx-auto">
                    Follow us on instagram <span className="underline cursor-pointer hover:text-blue-900 smooth-transition">@followuspleaseee</span> and tag us to get featured on our timeline
                </p>
            </div>
            <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10">

                { images.map( imageUrl => (
                    <div className="relative group" key={imageUrl}>
                        <Image height={400} width={200} src={imageUrl} alt="pic" className="w-full display-img" />

                        <div className=" display-img flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 group-hover:opacity-50 absolute top-0 left-0 h-full w-full" />
                        <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                            <svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.6665 10.6665H21.3332C15.4421 10.6665 10.6665 15.4421 10.6665 21.3332V42.6665C10.6665 48.5575 15.4421 53.3332 21.3332 53.3332H42.6665C48.5575 53.3332 53.3332 48.5575 53.3332 42.6665V21.3332C53.3332 15.4421 48.5575 10.6665 42.6665 10.6665Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M44 20V20.001" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}