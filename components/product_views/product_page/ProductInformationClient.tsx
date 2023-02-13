'use client'

import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import {ColorOptions, Product, SizeOptions} from "../../../typings";
import {shallow} from "zustand/shallow";
import {useStoreBasket} from "../../../src/store";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import _ from "lodash";
import DisplayPrice from "../../DisplayPrice";
import {convertToSlug} from "../../../lib/utils";
import ImageCarousel from "./ImageCarousel";
import Link from "next/link";


type Props = {
    product: Product;
}


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProductInformationClient({product}: Props) {
    const [cart, updateCart, updateNewestItemAdded] = useStoreBasket(
        (state) => [state.cart, state.updateCart, state.updateNewestItemAdded],
        shallow
    )

    const addData = (productId: number, color: ColorOptions, size: SizeOptions, quantity: number, product: Product) => {
        const searchedItemIndex = cart.findIndex( (item) => item.productId == productId && _.isEqual(item.color, color) && _.isEqual(item.size, size))

        if (searchedItemIndex > -1) {
            cart[searchedItemIndex].quantity += quantity
            updateCart(cart)

        } else {
            updateCart([
                ...cart, { productId, color, size, quantity, product }])
        }
        updateNewestItemAdded(
            { productId, color, size, quantity, product }
        )
    }

    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[0])

    return (
        <form className="mt-10">
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
                                className={({ active, checked }) =>
                                    classNames(
                                        color.selectedClass,
                                        active && checked ? 'ring ring-offset-1 ring-2 ring-indigo-500' : '',
                                        !active && checked ? 'ring-2' : '',
                                        '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none smooth-transition'
                                    )
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
                                className={({ active }) =>
                                    classNames(
                                        size.inStock
                                            ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                            : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 smooth-transition focus:outline-none sm:flex-1 sm:py-6'
                                    )
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                        {size.inStock ? (
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
                onClick={() => addData(product.id, structuredClone(selectedColor), structuredClone(selectedSize), 1, product)}
                type="button"
                className="mt-10 flex w-full items-center justify-center py-3 px-8 btn-primary"
            >
                Add to bag
            </button>
        </form>

    )
}