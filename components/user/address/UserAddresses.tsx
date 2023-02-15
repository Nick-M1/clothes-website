import Link from 'next/link';
import React from 'react';

//todo unused
export default function UserAddresses() {
    return (
        <Link href={`/address/`}>
            <div className="mb-5 gap-4">
                <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
                    <div className="mr-3">
                    <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
                        <i className="fa fa-map-marker-alt"></i>
                    </span>
                    </div>
                    <figcaption className="text-gray-600">
                        <p>
                            123 street <br />
                            Orlando, FL, 34456, US <br />
                            Phone no: 1234568746
                        </p>
                    </figcaption>
                </figure>
            </div>
        </Link>
    );
}