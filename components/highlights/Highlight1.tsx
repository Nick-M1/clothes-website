import React from 'react';
import {
    TruckIcon,
    ChatBubbleLeftEllipsisIcon,
    ArrowPathRoundedSquareIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";

//todo unused

export default function Highlight1() {
    return (
        <div className="2xl:container 2xl:mx-auto md:py-12 py-9 px-5">
            <div className="bg-gray-50 rounded-lg grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-12 gap-14 lg:px-20 lg:py-12 py-10 md:px-12 px-4">

                {/* Delivery grid Card */}
                <div>
                    <TruckIcon height={32} width={32}/>
                    <h3 className=" text-l leading-5 font-semibold text-gray-800 lg:mt-3 mt-2 ">Delivery</h3>
                    <p className=" text-base text-sm leading-6 font-normal text-gray-600 mt-1 lg:w-full md:w-9/12 w-full">Free worldwide delivery over orders above $100</p>
                </div>

                {/* customer Grid Card */}
                <div>
                    <ChatBubbleLeftEllipsisIcon height={32} width={32}/>
                    <h3 className=" text-l leading-5 font-semibold text-gray-800 lg:mt-3 mt-2 ">Customer Care</h3>
                    <p className=" text-base text-sm leading-6 font-normal text-gray-600 mt-1 lg:w-full md:w-9/12 w-full">
                        Our customer care is available 24/7 at <span className=" font-semibold cursor-pointer hover:text-gray-900">+495-589-509</span> and <span className=" font-semibold cursor-pointer hover:text-gray-900">customercare@gmail.com</span>
                    </p>
                </div>

                {/* Recycle Grid Card */}
                <div>
                    <ArrowPathRoundedSquareIcon height={32} width={32}/>
                    <h3 className=" text-l leading-5 font-semibold text-gray-800 lg:mt-3 mt-2 ">Money Back Guarantee</h3>
                    <p className=" text-base text-sm leading-6 font-normal text-gray-600 mt-1 lg:w-full md:w-9/12 w-full">You can return any products within 30 days.</p>
                </div>

                {/* Secure Payment Card */}
                <div>
                    <ShieldCheckIcon height={32} width={32}/>
                    <h3 className=" text-l leading-5 font-semibold text-gray-800 lg:mt-3 mt-2 ">Secure Payment</h3>
                    <p className=" text-base text-sm leading-6 font-normal text-gray-600 mt-1 lg:w-full md:w-9/12 w-full">Transaction process has end to end encryption</p>
                </div>
            </div>
        </div>
    );
}