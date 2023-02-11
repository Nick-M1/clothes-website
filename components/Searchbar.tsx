'use client'            // Will use client-side rendering

import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {FormEvent, useState} from 'react';
import {useRouter} from "next/navigation";

function Searchbar() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch("");
        router.push(`/search/${search}`);
    };

    return (
        <div className='max-w-md mx-auto border-none cursor-pointer'>
            <form onSubmit={handleSearch} className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow overflow-hidden smooth-transition">
                <div className="grid place-items-center h-full w-12 text-gray-300 border-none">
                    <button type="submit" >
                        <MagnifyingGlassIcon className="pointer-events-non h-6 w-6 border-none hover:text-gray-500 smooth-transition" aria-hidden="true" />
                    </button>
                </div>
                <input
                    className="peer h-full w-full outline-none border-none text-sm text-gray-700 pr-2 bg-none focus:outline-none focus:ring-0 smooth-transition"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
}

export default Searchbar;