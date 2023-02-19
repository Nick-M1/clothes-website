'use client'
import React, {Fragment, useEffect, useState} from 'react';
import CommentIndividual from "./CommentIndividual";
import CommentNew from "./CommentNew";
import {Dialog, Tab, Transition} from "@headlessui/react";
import {classNames} from "../../../lib/utils";
import {CommentItem, Product} from "../../../typings";
import FaqsMain from "../../faqs/FaqsMain";
import {collection, onSnapshot, query, where} from "@firebase/firestore";
import {db} from "../../../firebase";
import {useCollection} from "react-firebase-hooks/firestore";

type Prop = {
    product: Product
}

export default function CommentSection({product}: Prop) {
    const [commentsSnapshot, loading, error] = useCollection(
        query(
            collection(db, 'products'),  //, product.id.toString(), 'comments')
            where("id", "==", product.id)
        )
    )
    const comments: CommentItem[] = commentsSnapshot?.docs.map(d => d.data().comments)[0]


    return (
        <div className="relative flex flex-col pt-10">

            {/* Links */}
            <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                        {['FAQs', 'Customer Reviews'].map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        selected ? 'text-indigo-600 hover:text-indigo-700 border-indigo-600' : 'text-gray-900 hover:text-indigo-600 hover:border-gray-300 border-transparent dark:text-gray-400 dark:hover:text-white',
                                        'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium smooth-transition'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                    <Tab.Panel className='opacity-80'>
                        <FaqsMain showSearchbar={false}/>
                    </Tab.Panel>

                    <Tab.Panel className='overflow-y-auto scrollbar px-3 pt-2 max-h-[700px]'>
                        { comments?.map((comment, index) =>
                            <CommentIndividual comment={comment} key={index}/>
                        ) }
                        <CommentNew productId={product.id}/>
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>

        </div>
    )
}