import {getAllProducts} from '../../../lib/DATABASE_PRODUCTS'
import DisplayPrice from "../../DisplayPrice";
import Link from "next/link";
import Image from "next/image";

export default function Recommendations() {
    const products = getAllProducts()

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-10 lg:mt-6 grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <Link href={`/product/${product.id}`}>
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 smooth-transition">
                                    <Image
                                        src={product.images[0].src}
                                        alt={product.images[0].alt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.colors[0].name}</p>
                                    </div>
                                    <DisplayPrice price={product.price} cssClass={"text-sm font-medium text-gray-900 pr-14"}/>                                    {/*<DisplayPrice price={product} cssClass={}*/}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}