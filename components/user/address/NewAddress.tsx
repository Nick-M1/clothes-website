'use client'
import React, {Dispatch, SetStateAction, useState} from 'react';
import { countries } from "countries-list";
import {ShippingAddress} from "../../../typings";
import {useSession} from "next-auth/react";

type AddressFields = {
    nameUpper: string,
    nameLower: string,
    inputType: string,
    required: boolean
    hook: string
    setHook: React.Dispatch<React.SetStateAction<string>>
}

export default function NewAddress({ setAddNewAddressPopup, setRecentlyAddedNewAddress }: {setAddNewAddressPopup: Dispatch<SetStateAction<boolean>>, setRecentlyAddedNewAddress: React.Dispatch<React.SetStateAction<ShippingAddress | null>>}) {
    const {data: session, status: sessionStatus} = useSession()
    const countriesList = Object.values(countries);

    const [name, setName]               = useState('')
    const [address, setAddress]         = useState('')
    const [city, setCity]               = useState('')
    const [state, setState]             = useState('')
    const [postcode, setPostcode]       = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [country, setCountry]         = useState('Andorra')

    const fields: AddressFields[][] = [
        [
            { nameUpper: 'Full Name',    nameLower: 'name',         inputType: 'text',   required: true,   hook: name, setHook: setName},
        ],
        [
            { nameUpper: 'Address',      nameLower: 'address',       inputType: 'text',   required: true,   hook: address, setHook: setAddress},
        ],
        [
            { nameUpper: 'City',         nameLower: 'city',          inputType: 'text',   required: true,   hook: city, setHook: setCity },
            { nameUpper: 'State',        nameLower: 'state',         inputType: 'text',   required: false,  hook: state, setHook: setState },
        ],
        [
            { nameUpper: 'Postcode',     nameLower: 'postcode',      inputType: 'text', required: true,   hook: postcode, setHook: setPostcode },
            { nameUpper: 'Phone Number', nameLower: 'phone number',  inputType: 'number',  required: true,   hook: phonenumber, setHook: setPhonenumber },
        ]
    ]

    const handleSubmit = async (e: any) => {
        e.preventDefault

        if (address === '' || city === '' || postcode === '' || phonenumber === '') {
            console.log('missing input')
            return
        }

        const newAddressPost: ShippingAddress = {          //todo: use session to get user's details - if not logged in, make them log in to comment
            customerId: session != null && session.user != null ? session.user.email! : 'test_123456789',
            name,
            address,
            city,
            state,
            postcode,
            phonenumber,
            country
        }

        await fetch('/api/postNewAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newAddressPost})
        })

        setName('')
        setAddress('')
        setCity('')
        setState('')
        setPostcode('')
        setPhonenumber('')
        setCountry('Andorra')

        setRecentlyAddedNewAddress(newAddressPost)
        setAddNewAddressPopup(false)
    }

    return (
        <section className="pt-7">
            <hr className='px-5'/>
            <div className="container">
                <div className="flex flex-col md:flex-row -mx-4">
                    <main className="px-4 w-full">
                        <div className="p-4">
                            <form>
                                <h2 className="mb-5 font-semibold">
                                    Add new address
                                </h2>
                                { fields.map( (fieldArr, indexArr) => (
                                    <div className="grid md:grid-cols-2 gap-x-9" key={indexArr}>

                                        { fieldArr.map( (field, fieldIndex) =>
                                            <div className={`mb-4 ${fieldArr.length === 1 ? 'md:col-span-2' : 'md:col-span-1'}`} key={fieldIndex}>
                                                <label className="block mb-1"> {field.nameUpper} </label>
                                                <input
                                                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full smooth-transition"
                                                    type={field.inputType}
                                                    placeholder={`Enter ${field.nameLower}`}
                                                    required={field.required}
                                                    value={field.hook}
                                                    onChange={(e) => field.setHook(e.target.value)}
                                                />
                                            </div>
                                        )}

                                    </div>
                                ))}

                                <div className="mb-4 md:col-span-2">
                                    <label className="block mb-1"> Country </label>
                                    <select onChange={(e) => setCountry(e.target.value)} value={country} className="smooth-transition appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                                        {countriesList.map((countryInfo) => (
                                            <option key={countryInfo.name} value={countryInfo.name}>
                                                {countryInfo.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    className="btn-primary my-2 text-center w-full inline-block bg-blue-600 hover:bg-blue-700"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}