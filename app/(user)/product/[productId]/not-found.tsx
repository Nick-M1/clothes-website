import React from 'react';
import {Montserrat} from "@next/font/google"

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat'
})


function NotFound() {
    return (
        <div className={`${montserrat.className}`}>Error 404 - Whoops we couldn't find the TODO you were looking for</div>
    );
}

export default NotFound;