'use client'

import {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import {getById} from "../../../lib/DATABASE_PRODUCTS";
import {useStoreBasket, useStoreCurrency} from "../../../src/store";
import {shallow} from "zustand/shallow";
import {ColorOptions, ListedItem, SizeOptions} from "../../../typings";
import _, {cloneDeep} from "lodash";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import DisplayPrice from "../../DisplayPrice";
import Link from "next/link";
import Image from "next/image";


type Props = {
    productId: number;
    productIndex: number
    productState: ListedItem[];
    setProductsState: Dispatch<SetStateAction<ListedItem[]>>;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductQuickview({productId, productIndex, productState, setProductsState}: Props ) {           //todo: fix color & size icons not staying on
    const product = getById(productId)
    if (!product)
        throw new Error("Product not found")

    const setOpen = (newValue: boolean) => {
        setProductsState(prevState => {
            const newList = cloneDeep(prevState)
            newList[productIndex].quickview = newValue
            return newList
        })
    }

    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes.filter(s => s.inStock)[0])

    const [cart, updateCart, updateNewestItemAdded] = useStoreBasket(
        (state) => [state.cart, state.updateCart, state.updateNewestItemAdded],
        shallow
    )

    const addData = (productId: number, color: ColorOptions, size: SizeOptions, quantity: number, price: number) => {
        const searchedItemIndex = cart.findIndex( (item) => item.productId == productId && _.isEqual(item.color, color) && _.isEqual(item.size, size))

        if (searchedItemIndex > -1) {
            cart[searchedItemIndex].quantity += quantity
            updateCart(cart)

        } else {
            updateCart([
                ...cart, {
                    productId: productId,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: price
                }])
        }

        updateNewestItemAdded(
            { productId, color, size, quantity, price }
        )
    }



    return (
        <Transition.Root show={productState[productIndex].quickview} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => setOpen(false)} >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 smooth-transition"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            <Image height={300} width={300} src={product.images[0].src} alt={product.images[0].alt} className="object-cover object-center" />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>

                                                <DisplayPrice price={product.price} cssClass={'text-2xl text-gray-900'}/>

                                                {/* Reviews */}
                                                <div className="mt-6">
                                                    <h4 className="sr-only">Reviews</h4>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                                <StarIcon
                                                                    key={rating}
                                                                    className={classNames(
                                                                        product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                                                        'h-5 w-5 flex-shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="sr-only">{product.rating} out of 5 stars</p>
                                                        <Link href="components#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 smooth-transition">
                                                            {product.reviewCount} reviews
                                                        </Link>
                                                    </div>
                                                </div>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-10">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>

                                                <form>
                                                    {/* Colors */}
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                                            <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                                                            <div className="flex items-center space-x-3">
                                                                {product.colors.map((color) => (
                                                                    <RadioGroup.Option
                                                                        key={color.name}
                                                                        value={color}
                                                                        className={({ active }) => {
                                                                            const isChecked = selectedColor.name === color.name

                                                                            return classNames(
                                                                                color.selectedClass,
                                                                                active && isChecked ? 'ring ring-offset-1 ring-2 ring-indigo-500' : '',
                                                                                !active && isChecked ? 'ring-2' : '',
                                                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none smooth-transition'
                                                                            )}
                                                                        }
                                                                    >
                                                                        <RadioGroup.Label as="span" className="sr-only">
                                                                            {' '}
                                                                            {color.name}{' '}
                                                                        </RadioGroup.Label>
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={classNames(
                                                                                color.class,
                                                                                'h-8 w-8 border border-black border-opacity-10 rounded-full smooth-transition'
                                                                            )}
                                                                        />
                                                                    </RadioGroup.Option>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    {/* Sizes */}
                                                    <div className="mt-10">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                                            <Link href="components#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 smooth-transition">
                                                                Size guide
                                                            </Link>
                                                        </div>

                                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                                            <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                                                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                                {product.sizes.map((size) => (
                                                                    <RadioGroup.Option
                                                                        key={size.name}
                                                                        value={size}
                                                                        disabled={!size.inStock}
                                                                        className={({ active }) => {
                                                                            const isChecked = selectedSize.name === size.name

                                                                            return classNames(
                                                                                size.inStock
                                                                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',

                                                                                active && isChecked ? 'ring ring-offset-1 ring-2 ring-indigo-500' : '',
                                                                                !active && isChecked ? 'ring-2' : '',

                                                                                'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 smooth-transition focus:outline-none sm:flex-1 sm:py-6'
                                                                            )
                                                                        }}
                                                                    >
                                                                        {({ active, checked }) => (
                                                                            <>
                                                                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                                { size.inStock ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? 'border' : 'border-2',
                                                                                            checked ? 'border-indigo-500' : 'border-transparent',
                                                                                            'pointer-events-none absolute -inset-px rounded-md smooth-transition'
                                                                                        )}
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                ) : (
                                                                                    <span
                                                                                        aria-hidden="true"
                                                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                                    >
                                                                                        <svg
                                                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                            viewBox="0 0 100 100"
                                                                                            preserveAspectRatio="none"
                                                                                            stroke="currentColor"
                                                                                        >
                                                                                          <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                                        </svg>
                                                                                    </span>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </RadioGroup.Option>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    <button
                                                        onClick={() => addData(product.id, structuredClone(selectedColor), structuredClone(selectedSize), 1, product.price)}
                                                        type="button"
                                                        className="mt-6 flex w-full items-center justify-center py-3 px-8 btn-primary"
                                                    >
                                                        Add to bag
                                                    </button>
                                                </form>
                                                <div className="py-3 text-right italic">
                                                    <Link href={`/product/${productId}`}>More info...</Link>
                                                </div>

                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}