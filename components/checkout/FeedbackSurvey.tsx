'use client'
import React, {useState} from 'react';
import {XMarkIcon} from "@heroicons/react/24/solid";


type Mood = {
    idx: number;
    text: string;
    symbolSrc: string;
    symbolAlt: string;
}

export default function FeedbackSurvey() {
    const [open, setOpen] = useState(true);

    const moodOptions: Mood[] = [
        { idx: 0, text: 'Very unhappy', symbolSrc: 'https://img.icons8.com/color/96/null/vomited--v1.png',          symbolAlt: 'Very unhappy face' },
        { idx: 1, text: 'Unhappy',      symbolSrc: 'https://img.icons8.com/color/96/null/sad--v1.png',              symbolAlt: 'Unhappy face' },
        { idx: 2, text: 'Neutral',      symbolSrc: 'https://img.icons8.com/color/96/null/neutral-emoticon--v1.png', symbolAlt: 'Neutral face' },
        { idx: 3, text: 'Happy',        symbolSrc: 'https://img.icons8.com/color/96/null/happy--v1.png',            symbolAlt: 'Happy face' },
        { idx: 4, text: 'Ecstatic',     symbolSrc: 'https://img.icons8.com/color/96/null/smiling.png',              symbolAlt: 'Ecstatic face' },
    ]

    const checkboxOptions = [
        'Add more products to our catalog',
        'Offer lower priced items',
        'Offer financing options',
        'Add more shipping options',
        'Other'
    ]

    const [currentMood, setCurrentMood] = useState(moodOptions[3]);
    const [otherCheckbox, setOtherCheckbox] = useState(false);

    return (
            <div className="overflow-y-hidden px-4 py-12">
                <div
                    className={`${
                        open ? "" : "hidden"
                    } lg:max-w-[1280px] md:max-w-[744px] max-w-[375px] w-full mx-auto bg-white lg:px-[109px] md:px-12 px-4 py-20 relative`}
                >
                    <div>
                        <XMarkIcon
                            className="cursor-pointer absolute right-4 top-4 z-10"
                            onClick={() => setOpen(false)}
                            width={24}
                            height={24}
                        />

                        <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse justify-center gap-8">
                            <div className="w-full pr-3">
                                <img
                                    src="clothes_imgs/vertical/img5.jpg"
                                    alt="girl"
                                    className='rounded-lg shadow-lg'
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-2xl font-semibold text-gray-800">
                                    Before leaving
                                </p>
                                <p className="text-base text-gray-600 mt-4">
                                    We’d love to know what you think about our service
                                </p>


                                <div className="mt-10">

                                    <p className="mb-4 text-center text-xl text-gray-600 font-medium">
                                        <span id="ex">{currentMood.text}</span>
                                    </p>
                                    <div className="flex justify-center gap-4 mt-6">

                                        { moodOptions.map( (mood, index) => (
                                            <div aria-label="main" key={index}>
                                                <button
                                                    onClick={() => setCurrentMood(mood)}
                                                    className={ currentMood.idx == mood.idx ? "smooth-transition" : "grayscale hover:grayscale-0 smooth-transition" }
                                                >
                                                    <img src={mood.symbolSrc} alt={mood.symbolAlt} height={40} width={40}/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div>
                                    <p className="text-lg font-medium text-gray-800 mt-10">
                                        What could we do better?
                                    </p>

                                    { checkboxOptions.map( (option, idx) => (
                                        <div className="flex items-center pt-3">
                                            <input
                                                type="checkbox"
                                                className="h-5 w-5 cursor-pointer accent-gray-800 flex-shrink-0 mx-4 hover:bg-blue-200 smooth-transition"
                                                onClick={() => option === 'Other' ? setOtherCheckbox(!otherCheckbox) : null}
                                            />
                                            <p className="text-sm text-base text-gray-600 ml-2">
                                                {option}
                                            </p>
                                        </div>
                                    ))}


                                <div className="mt-10">

                                    { otherCheckbox ?
                                        <div className='smooth-transition'>
                                            <p className="text-lg font-medium text-gray-800">
                                                Any Suggestions?
                                            </p>
                                            <textarea
                                                className="border border-gray-300 focus:outline-none px-3 w-full h-[104px] mt-6 resize-none p-2"
                                                defaultValue={""}
                                            />
                                        </div>
                                        : <div></div>

                                    }
                                    <button className="lg:max-w-[296px] w-full py-3 px-6 text-base mt-6 ml-6 btn-primary ">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}