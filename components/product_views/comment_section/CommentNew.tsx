'use client'
import React, {useState} from "react";
import {CommentItem} from "../../../typings";
import {StarIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../../lib/utils";
import Link from "next/link";
import {useSession} from "next-auth/react";

export default function CommentNew({productId}: {productId: number}) {
    const {data: session, status: sessionStatus} = useSession()
    const IS_SIGNEDIN = sessionStatus === 'authenticated'

    const [comment, setComment] = useState('')
    const [starRating, setStarRating] = useState(5)

    const handleSendComment = async () => {
        if (!IS_SIGNEDIN || comment === '')
            return

        const commentPost: CommentItem = {
            productId: productId,
            email: session?.user?.email != null ? session?.user.email : '--',
            name: session?.user?.name != null ? session?.user.name : '--',
            profile_img: session?.user?.image != null ? session?.user.image : '--',
            rating: starRating,
            comment: comment,
            created_at: Date.now()
        }

        await fetch('/api/postComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({commentPost})
        })

        setComment('')
    }

    return (
        <div className='px-1'>
            <hr className="my-4"/>
            <h1 className="text-gray-500 review-title my-5 text-2xl">Your Review</h1>

            <h3>Rating</h3>
            <div className="mb-4 mt-3">
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <StarIcon
                            key={rating}
                            className={classNames(
                                starRating >= rating ? 'text-gray-900' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0 cursor-pointer'
                            )}
                            aria-hidden="true"
                            onClick={() => setStarRating(rating)}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4 mt-5">
                <label className="block mb-1"> Comments </label>
                <textarea
                    rows={4}
                    className='smooth-transition appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                    placeholder="Your review"
                    name="description"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>

            <div className='flex'>
                <button onClick={handleSendComment} className={`mt-3 mb-5 px-4 py-2 text-center inline-block btn-primary w-1/2 md:w-1/3 ${!IS_SIGNEDIN ? 'cursor-not-allowed' : ''}`} disabled={!IS_SIGNEDIN}>
                    Post Review
                </button>
                { !IS_SIGNEDIN
                    ? <p className='mt-3 mb-5 px-10 py-2'>
                        <Link href='/signin' className='text-indigo-600 hover:text-indigo-800 smooth-transition'>Sign in</Link>
                        {' '} to comment
                    </p>
                    : <div></div>
                }
            </div>
        </div>
    );
}