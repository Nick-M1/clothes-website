'use client'

import Image from "next/image";
import {useEffect, useState} from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {ImageInfo} from "../../../typings";

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
type PagePromp = {
    images: ImageInfo[]
}


export default function ImageCarousel({ images }: PagePromp) {
    const [displayFadein, setDisplayFadein] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const handlePrevSlide = () => {
        let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    useEffect(() => {
        setDisplayFadein(true)
        setTimeout(() => setDisplayFadein(false), 450)
    }, [currentSlide])

    return (
        <div className="relative py-5 px-6">
            <AiOutlineLeft
                onClick={handlePrevSlide}
                className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-10"
            />
            <div className="w-full h-[80vh] flex overflow-hidden relative m-auto rounded-lg transition-opacity duration-700 ease-in">
                <Swipe
                    onSwipeLeft={handleNextSlide}
                    onSwipeRight={handlePrevSlide}
                    className="relative z-0 w-full"
                >
                    {images.map((image, index) => {
                        if (index === currentSlide) {
                            return (
                                <div key={index}>
                                    <Image
                                        key={index}
                                        src={image.src}
                                        alt={image.alt}
                                        width={500}
                                        height={500}
                                        className="display-img"
                                    />
                                    {/*<div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white animate-fade ${displayFadein ? '' : 'hidden'}`}></div>*/}
                                </div>
                            );
                        }
                    })}
                </Swipe>
            </div>
            <AiOutlineRight
                onClick={handleNextSlide}
                className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-10"
            />

            <div className="relative flex justify-center p-2">
                {images.map((_, index) => {
                    return (
                        <div
                            className={
                                index === currentSlide
                                    ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                                    : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                            }
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}