'use client'

import React, {useState} from 'react';
import {MinusIcon, PlusIcon} from "@heroicons/react/24/solid";
import {
    TruckIcon,
    ReceiptRefundIcon,
    ArrowPathRoundedSquareIcon,
    MagnifyingGlassCircleIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function FaqsMain({showSearchbar}: {showSearchbar: boolean}) {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    return (
        <div className="pt-10">
            <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800">Frequently Asked Questions</h2>
            <div className="mt-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
                <div className=" ">
                    <p className=" font-normal text-base leading-6 text-gray-600 lg:w-8/12 md:w-9/12 ">Here are few of the most frequently asked questions by our valueable customers</p>
                </div>
                { showSearchbar ?
                <div className=" border-b-2 border-gray-200 pb-2 flex justify-center items-center md:mt-0 mt-10 md:w-auto w-full ">
                    <input placeholder="Search" type="text" aria-label="Search" className="lg:w-96 md:w-72 w-full focus:outline-none placeholder-gray-600 text-base font-normal text-gray-600 leading-4 " />
                    <svg className=" cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333Z" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 14L10 10" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                    : <div/>
                }
            </div>
            <div className=" flex md:flex-row flex-col md:space-x-8 md:mt-16 mt-8">
                <div className=" md:w-5/12 lg:w-4/12 w-full">
                    <Image width={500} height={500} src="/clothes_imgs/vertical/faqs-img1.png" alt="Img of Glass bottle" className="w-full md:block hidden drop-shadow-lg rounded-lg" />
                    <Image width={500} height={500} src="/clothes_imgs/vertical/faqs-img2.png" alt="Img of Glass bottle" className="w-full md:hidden block drop-shadow-lg rounded-lg" />
                </div>
                <div className=" md:w-7/12 lg:w-8/12 w-full md:mt-0 sm:mt-14 mt-10">
                    {/* <!-- ShippingMenu Section --> */}
                    <div>
                        <div onClick={() => setShow1(!show1)} className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 inline-flex align-text-top">
                                <TruckIcon height={30} width={30} />
                                <div className='ml-3 mt-1.5 hover:text-gray-500'>Shipping</div>
                            </h3>
                            { show1 ? <MinusIcon height={20} width={20}/> : <PlusIcon height={20} width={20} /> }
                        </div>
                        <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show1 ? "block" : "hidden")}>We are covering every major country worldwide. The shipment leaves from US as it is our headquarter. Some extra information you probably need to add here so that the customer is clear of their wanted expectations.</p>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* <!-- Returns Section --> */}

                    <div>
                        <div onClick={() => setShow2(!show2)} className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 inline-flex align-text-top">
                                <ReceiptRefundIcon height={30} width={30} />
                                <div className='ml-3 mt-1.5 hover:text-gray-500'>Returns</div>
                            </h3>
                            { show2 ? <MinusIcon height={20} width={20}/> : <PlusIcon height={20} width={20}/> }
                        </div>
                        <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show2 ? "block" : "hidden")}>We are covering every major country worldwide. The shipment leaves from US as it is our headquarter. Some extra information you probably need to add here so that the customer is clear of their wanted expectations.</p>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* <!-- Exchange Section --> */}

                    <div>
                        <div onClick={() => setShow3(!show3)} className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 inline-flex align-text-top">
                                <ArrowPathRoundedSquareIcon height={30} width={30} />
                                <div className='ml-3 mt-1.5 hover:text-gray-500'>Exchange</div>
                            </h3>
                            { show3 ? <MinusIcon height={20} width={20}/> : <PlusIcon height={20} width={20}/> }
                        </div>
                        <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show3 ? "block" : "hidden")}>We are covering every major country worldwide. The shipment leaves from US as it is our headquarter. Some extra information you probably need to add here so that the customer is clear of their wanted expectations.</p>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* Tracking Section */}

                    <div>
                        <div onClick={() => setShow4(!show4)} className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 inline-flex align-text-top">
                                <MagnifyingGlassCircleIcon height={30} width={30} />
                                <div className='ml-3 mt-1.5 hover:text-gray-500'>Tracking</div>
                            </h3>
                            { show4 ? <MinusIcon height={20} width={20}/> : <PlusIcon height={20} width={20}/> }
                        </div>
                        <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show4 ? "blcok" : "hidden")}>We are covering every major country worldwide. The shipment leaves from US as it is our headquarter. Some extra information you probably need to add here so that the customer is clear of their wanted expectations.</p>
                    </div>

                    <hr className=" my-7 bg-gray-200" />
                </div>
            </div>
        </div>
    );
}