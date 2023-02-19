
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import {ColorOptions, Product, SizeOptions} from "../../../typings";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives/structured-clone";
import _ from "lodash";
import DisplayPrice from "../../DisplayPrice";
import {convertToSlug} from "../../../lib/utils";
import ImageCarousel from "./ImageCarousel";
import ProductInformationClient from "./ProductInformationClient";
import Link from "next/link";
import Image from "next/image";
import CommentSection from "../comment_section/CommentSection";


type Props = {
    product: Product;
}


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProductInformationServer({product}: Props) {
    return (
        <div className="bg-white pt-4">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb, index) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <Link href={`/search/${product.breadcrumbs.slice(0, index+1).map((breadcrumb) => convertToSlug(breadcrumb.name)).join('/')}`} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
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
                            <Link href={convertToSlug(product.href)} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600 smooth-transition">
                                {product.name}
                            </Link>
                        </li>
                    </ol>
                </nav>


                {/* Image gallery - MOBILE */}
                <div className='lg:hidden'>
                    <ImageCarousel images={product.images}/>
                </div>


                {/* Image gallery - DESKTOP */}
                <div className="hidden mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                        <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            className="h-full w-full object-cover object-center"
                            fill
                        />
                    </div>
                    { product.images.length > 1 && <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <Image
                                src={product.images[1].src}
                                alt={product.images[1].alt}
                                className="h-full w-full object-cover object-center"
                                fill
                            />
                        </div>
                        { product.images.length > 2 && <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <Image
                                src={product.images[2].src}
                                alt={product.images[2].alt}
                                className="h-full w-full object-cover object-center"
                                fill
                            />
                        </div>}
                    </div>}
                    { product.images.length > 3 && <div
                        className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                        <Image
                            src={product.images[3].src}
                            alt={product.images[3].alt}
                            className="h-full w-full object-cover object-center"
                            fill
                        />
                    </div>}
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <DisplayPrice price={product.price} cssClass={"text-3xl tracking-tight text-gray-900"}/>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
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
                                <Link href={product.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-400 smooth-transition">
                                    {product.reviewCount} reviews
                                </Link>
                            </div>
                        </div>

                        <ProductInformationClient product={product}/>

                        <div className='hidden md:block pt-3'>
                            <hr className="my-4"/>
                            <p className='text-gray-500 text-sm'>Share</p>
                            <div className='flex pt-3 gap-6 grayscale '>
                                <Image src={'/social_media/instagram.svg'} alt={'instagram logo'} width={20} height={20} className='opacity-50 hover:opacity-70' />
                                <Image src={'/social_media/facebook.svg'} alt={'facebook logo'} width={20} height={20} className='opacity-70 hover:opacity-100' />
                                <Image src={'/social_media/twitter.svg'} alt={'twitter logo'} width={20} height={20} className='opacity-75 hover:opacity-100' />
                            </div>
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-7 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {product.highlights.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{product.details}</p>
                            </div>
                        </div>

                        <CommentSection product={product}/>
                    </div>
                </div>
            </div>
        </div>
    )
}