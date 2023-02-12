import React from 'react';
import Link from "next/link";

// todo: Unused
export default function Ad5() {
    return (
        <div className="p-6 bg-violet-600 text-gray-900 rounded-lg">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <h2 className="text-center text-xl">
                        <span className='font-bold'>Mid-Season Sale</span>
                        <br/>
                        Up to 50% Off
                    </h2>
                    <Link href="/search" rel="noreferrer noopener" className="btn-primary btn-bouncy px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 hover:bg-gray-100 focus:bg-gray-200 text-gray-900 border-gray-400">Shop Now</Link>
                </div>
            </div>
        </div>
    );
}