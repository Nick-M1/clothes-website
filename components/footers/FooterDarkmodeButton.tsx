'use client'

import React, {useEffect, useState} from 'react';
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";
import {useStoreDarkmode} from "../../src/store";


export default function FooterDarkmodeButton() {
    // const [darkmode, setDarkmode] = useStoreDarkmode(state => [state.darkmode, state.updateDarkmode])
    const [darkmode, setDarkmode] = useState(false)

    const setDarkmodeWrapper = (darkmode: boolean) => {
        if (darkmode) {
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light');
        }

        setDarkmode(darkmode)
    }

    return (
        <div>
            <button
                onClick={() => setDarkmodeWrapper(!darkmode)}
                className="inline-block rounded-full bg-indigo-600 text-white shadow transition hover:bg-indigo-500 p-4 justify-end" >
                { darkmode
                    ? <MoonIcon width={30} height={30}/>
                    : <SunIcon width={30} height={30}/>
                }
            </button>
        </div>
    );
}