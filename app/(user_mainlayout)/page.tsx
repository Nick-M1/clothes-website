import React from 'react';
import HomepageAd from "../../components/frontpage/HomepageAd";
import SaleAd from "../../components/frontpage/SaleAd";
import Ad3 from "../../components/frontpage/Ad3";
import NewsletterSignup1 from "../../components/highlights/NewsletterSignup1";

export default function HomePage() {
    return (
        <div className="mt-6">
            <HomepageAd/>
            <div className='py-5'><Ad3/></div>
            <div className='py-5'><SaleAd/></div>
            <NewsletterSignup1/>
        </div>
    );
}