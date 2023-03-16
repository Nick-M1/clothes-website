import React from 'react';
import FaqsMain from "../../../components/faqs/FaqsMain";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'FAQs'
}

export default function FaqsPage() {
    return (
        <div className='2xl:container 2xl:mx-auto lg:px-36 md:py-12 md:px-6 px-4 py-8'><FaqsMain showSearchbar={false}/></div>
    );
}