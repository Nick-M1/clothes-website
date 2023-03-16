import React from 'react';
import AboutUs from "../../../components/AboutUs";
import NewsletterSignup2 from "../../../components/highlights/NewsletterSignup2";
import Highlight1 from "../../../components/highlights/Highlight1";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'About Us'
}

export default function AboutUsPage() {
    return (
        <div className='pt-10'>
            <AboutUs/>
            <NewsletterSignup2/>
            <Highlight1/>
        </div>
    );
}