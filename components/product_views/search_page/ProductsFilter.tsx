'use client'

import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react'
import {Dialog, Disclosure, Menu, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon} from '@heroicons/react/20/solid'
import {getAllProducts, getByBreadcrumb, getSubCategories} from "../../../lib/DATABASE_PRODUCTS";
import {getSortFilters} from "../../../lib/DATABASE_CATEGORIES";
import {ListedItem, ListeditemTuple, Product, SortOptions} from "../../../typings";
import ProductsListing from "./ProductsListing";
import {cloneDeep} from "lodash";
import {convertToSlug, titleCase} from "../../../lib/utils";
import Link from "next/link";


type Props = {
    pageTitle: string
    level: number;
    currentCategories: string[]
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// todo: split into multiple components, with the parent component being 'Server-sdie rendered'
export default function ProductsFilter({ pageTitle, level, currentCategories }: Props) {

    // Mobile sidebar
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    // Listing grid layout (num of items on each column)
    const [gridCols, setGridCols] = useState<2|3>(2)

    // Sorting
    const sortOptions: SortOptions[] =  [
        { name: 'Most Popular',        func: ((item1: ListeditemTuple, item2: ListeditemTuple) => item2.a.product.reviewCount - item1.a.product.reviewCount)},
        { name: 'Best Rating',         func: ((item1: ListeditemTuple, item2: ListeditemTuple) => item2.a.product.rating - item1.a.product.rating)},
        { name: 'Newest',              func: ((item1: ListeditemTuple, item2: ListeditemTuple) => item2.a.product.rating - item1.a.product.rating)},          // todo: 'Newest in' isn't implemented yet
        { name: 'Price: Low to High',  func: ((item1: ListeditemTuple, item2: ListeditemTuple) => item1.a.product.price - item2.a.product.price)},
        { name: 'Price: High to Low',  func: ((item1: ListeditemTuple, item2: ListeditemTuple) => item2.a.product.price - item1.a.product.price)},
    ]
    const [selectedSort, setSelectedSort] = useState(0)

    // Database Getters
    const allProducts = getByBreadcrumb(currentCategories)
    const subCategories = getSubCategories(allProducts, level)
    const filters = getSortFilters(allProducts)

    // States for Quickview
    const [productsState, setProductsState] = useState<ListedItem[]>(
        allProducts.map( (product) => { return {product: product, shown: true, quickview: false} as ListedItem })
    )


    // Color & Size filtering
    const colorList: string[] = filters[0].options
    const sizeList: string[] = filters[2].options

    const [colorState, updateColorState] = useState<Boolean[]>( colorList.map( i => true ) )
    const [sizeState, updateSizeState] = useState<Boolean[]>( sizeList.map( i => true ) )

    const updateStateWrapper = (option: string, optionIdx: number, sectionIdx: number) => {

        if (sectionIdx == 0) {
            updateColorState(prevState => {
                const newList = cloneDeep(prevState)
                newList[optionIdx] = !prevState[optionIdx]
                return newList
            } )

        } else if (sectionIdx == 2) {
            updateSizeState(prevState => {
                const newList = cloneDeep(prevState)
                newList[optionIdx] = !prevState[optionIdx]
                return newList
            } )
        }
    }

    // filter by color or size
    useEffect(() => {
        setProductsState( prevState => {
            return allProducts.map( (product) => {

                const isShown = product.colors.findIndex((color) => colorState[colorList.findIndex(elem => elem === color.name)]) != -1 &&
                    product.sizes.findIndex((size) => sizeState[sizeList.findIndex(elem => elem === size.name)]) != -1

                return {
                    product: product,
                    shown: isShown,
                    quickview: false
                } as ListedItem
            })
        })
    }, [colorState, sizeState]);



    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel
                                    className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            {subCategories.map((category) => (
                                                <li key={category}>
                                                    <Link href={`/search/${currentCategories.join('/')}/${convertToSlug(category)}`}
                                                       className="block px-2 py-3 hover:text-gray-700 smooth-transition">
                                                        {category}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section, sectionIdx) => (
                                            <Disclosure as="div" key={section.id}
                                                        className="border-t border-gray-200 px-4 py-6">
                                                {({open}) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button
                                                                className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 smooth-transition hover:text-gray-700 smooth-transition">
                                                                <span
                                                                    className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true"/>
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true"/>
                                                                )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option}
                                                                            type="checkbox"
                                                                            defaultChecked={true}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 smooth-transition"
                                                                            onClick={() => updateStateWrapper(option, optionIdx, sectionIdx)}
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500 hover:text-gray-700 smooth-transition"
                                                                        >
                                                                            {option}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>


                {/* Desktop */}
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">

                    <nav aria-label="Breadcrumb" className='pb-10'>
                        <ol role="list" className="mx-auto flex max-w-2xl space-x-2 lg:max-w-7xl">
                            {currentCategories.slice(0, currentCategories.length-1).map((breadcrumb, index) => (
                                <li key={index}>
                                    <div className="flex items-center">
                                        <Link href={`/search/${currentCategories.slice(0, index+1).map((breadcrumb) => breadcrumb.toLowerCase()).join('/')}`} className="mr-2 text-sm font-medium text-gray-900 smooth-transition hover:text-black">
                                            {titleCase(breadcrumb)}
                                        </Link>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="h-5 w-4 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                {currentCategories.length > 0 ?
                                    <Link href={currentCategories[currentCategories.length-1]} aria-current="page" className="font-medium text-gray-500 smooth-transition hover:text-gray-600">
                                        {titleCase(currentCategories[currentCategories.length-1]).replace('-', ' ')}
                                    </Link>
                                    : <div className='opacity-0'>placeholder</div>
                                }
                            </li>
                        </ol>
                    </nav>


                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{pageTitle}</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="group inline-flex justify-center text-sm font-medium text-gray-700 smooth-transition hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group smooth-transition-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                {/* SORTING */}
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option, index) => (
                                                <Menu.Item key={index}>
                                                    {({active}) => (
                                                        <a
                                                            onClick={() => setSelectedSort(index)}
                                                            className={
                                                                classNames(
                                                                    index == selectedSort ? 'font-semibold text-gray-800' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm smooth-transition'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* Grid Layout Rows setter */}
                            <div className="group relative flex justify-center">
                            <button
                                type="button"
                                onClick={() => setGridCols(prevState => prevState == 2 ? 3 : 2)}
                                className="-m-2 ml-5 p-2 text-gray-400 smooth-transition hover:text-gray-500 sm:ml-7"
                            >
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true"/>
                            </button>
                                <span className="absolute w-32 -top-14 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Number of items in each row</span>
                            </div>

                            {/* Open mobile filters slider */}
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 smooth-transition hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list"
                                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    { subCategories.map((category) => (
                                        <li key={category}>
                                            <a href={`/search/${currentCategories.join('/')}/${convertToSlug(category)}`}>{category}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section, sectionIdx) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({open}) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button
                                                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 smooth-transition hover:text-gray-500">
                                                        <span
                                                            className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true"/>
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true"/>
                                                        )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option}
                                                                    type="checkbox"
                                                                    defaultChecked={true}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 smooth-transition"
                                                                    onClick={() => updateStateWrapper(option, optionIdx, sectionIdx)}
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-500 smooth-transition hover:text-black"
                                                                >
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <ProductsListing productsState={productsState} setProductsState={setProductsState} sortSelected={sortOptions[selectedSort]} gridCols={gridCols}/>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}