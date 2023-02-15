import React from 'react';
import {StarIcon} from "@heroicons/react/20/solid";
import {classNames} from "../lib/utils";

type Props = {
    productRating: number
    color?: string
}

export default function StarRating({ productRating, color = 'text-gray-900' }: Props) {
    return (
        <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                    key={rating}
                    className={classNames(
                        productRating > rating ? color : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}