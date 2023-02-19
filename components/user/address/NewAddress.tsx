'use client'
import React, {Dispatch, SetStateAction, useState} from 'react';
import { countries } from "countries-list";
import {ShippingAddress} from "../../../typings";
import {useSession} from "next-auth/react";

type AddressFields = {
    index: number
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

    const allFields = [name, address, city, state, postcode, phonenumber]
    const [incorrectFields, setIncorrectFields] = useState<boolean[]>([true, true, true, true, true, true])

    const fields: AddressFields[][] = [
        [
            { index: 0, nameUpper: 'Full Name',    nameLower: 'name',         inputType: 'text',   required: true,   hook: name, setHook: setName},
        ],
        [
            { index: 1, nameUpper: 'Address',      nameLower: 'address',       inputType: 'text',   required: true,   hook: address, setHook: setAddress},
        ],
        [
            { index: 2, nameUpper: 'City',         nameLower: 'city',          inputType: 'text',   required: true,   hook: city, setHook: setCity },
            { index: 3, nameUpper: 'State',        nameLower: 'state',         inputType: 'text',   required: false,  hook: state, setHook: setState },
        ],
        [
            { index: 4, nameUpper: 'Postcode',     nameLower: 'postcode',      inputType: 'text', required: true,   hook: postcode, setHook: setPostcode },
            { index: 5, nameUpper: 'Phone Number', nameLower: 'phone number',  inputType: 'number',  required: true,   hook: phonenumber, setHook: setPhonenumber },
        ]
    ]

    const handleSubmit = async (e: any) => {
        e.preventDefault

        setIncorrectFields(
            allFields.map(elem => elem != '')
        )

        if ( name == '' || address == '' || city == '' || state == '' || postcode == '' || phonenumber == '' )
            return

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
                                                <label htmlFor="username-error" className={`block mb-1 text-sm font-medium ${incorrectFields[field.index] ? 'text-gray-600' : 'text-red-700 dark:text-red-500' }`}>{field.nameUpper}</label>
                                                <input
                                                    className={`appearance-none border rounded-md py-2 px-3 focus:outline-none w-full smooth-transition ${incorrectFields[field.index] ? 'border-gray-200 bg-gray-100 hover:border-gray-400 focus:border-gray-400' : 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 placeholder:opacity-75 hover:border-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400' }`}
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
                                    className={`btn-primary my-2 text-center w-full inline-block bg-blue-600 hover:bg-blue-700 ${ name === '' || address === '' || city === '' || state === ''  || postcode === '' || phonenumber === '' ? 'cursor-not-allowed' : ''}`}
                                    onClick={(e) => handleSubmit(e)}
                                    // disabled={name === '' || address === '' || city === '' || state === ''  || postcode === '' || phonenumber === ''}
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