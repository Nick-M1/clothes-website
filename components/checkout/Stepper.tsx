import React from 'react';
import {CheckCircleIcon} from "@heroicons/react/24/solid";

type PageProps = {
    currentStateIdx: number
}

type Stage = {
    text: string
    largeScreenText: string
}

export default function Stepper({currentStateIdx}: PageProps) {
    const STAGES: Stage[] = [
        { text: 'Checkout',     largeScreenText:'Info' },
        { text: 'Payment',      largeScreenText:'Info' },
        { text: 'Confirmation', largeScreenText:'' },
    ]

    return (
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            { STAGES.map( (stage, index) => (

                index < currentStateIdx
                ? <li key={index}
                        className={ index == STAGES.length - 1
                            ? 'flex md:w-full items-center text-blue-600 dark:text-blue-500'
                            : `flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`
                        }>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
                        <span className='mr-1 md:mr-2'><CheckCircleIcon width={20} height={20}/></span>
                        {stage.text}
                        <span className="hidden sm:inline-flex sm:ml-2">{stage.largeScreenText}</span>
                    </span>
                </li>

                : <li key={index}
                            className={ index == STAGES.length - 1
                                ? 'flex md:w-full items-center'
                                : "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"

                            }>

                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
                        <span className="mr-2">{index + 1}</span>
                        {stage.text}
                        <span className="hidden sm:inline-flex sm:ml-2">{stage.largeScreenText}</span>
                    </span>
                </li>
                ))}




            {/*<li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">*/}
            {/*    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">*/}
            {/*        <span className="mr-2">2</span>*/}
            {/*        Payment*/}
            {/*        <span className="hidden sm:inline-flex sm:ml-2">Info</span>*/}
            {/*    </span>*/}
            {/*</li>*/}

            {/*<li className="flex items-center">*/}
            {/*    <span className="mr-2">3</span>*/}
            {/*    Confirmation*/}
            {/*</li>*/}





            {/*<li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">*/}
            {/*    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">*/}
            {/*        <span className='mr-1 md:mr-2'><CheckCircleIcon width={20} height={20}/></span>*/}
            {/*        Checkout <span className="hidden sm:inline-flex sm:ml-2">Info</span>*/}
            {/*    </span>*/}
            {/*</li>*/}

            {/*<li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">*/}
            {/*    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">*/}
            {/*        <span className="mr-2">2</span>*/}
            {/*        Payment*/}
            {/*        <span className="hidden sm:inline-flex sm:ml-2">Info</span>*/}
            {/*    </span>*/}
            {/*</li>*/}

            {/*<li className="flex items-center">*/}
            {/*    <span className="mr-2">3</span>*/}
            {/*    Confirmation*/}
            {/*</li>*/}

        </ol>
    );
}