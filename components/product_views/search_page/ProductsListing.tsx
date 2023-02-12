'use client'

import {ListedItem, ListeditemTuple, Product, SortOptions} from "../../../typings";
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import ProductQuickview from "./ProductQuickview";
import {cloneDeep} from "lodash";
import DisplayPrice from "../../DisplayPrice";
import {useRouter} from "next/navigation";
import Image from "next/image";

type Props = {
    productsState: ListedItem[];
    setProductsState: Dispatch<SetStateAction<ListedItem[]>>
    sortSelected: SortOptions
    gridCols: 2 | 3
}

// Hook
function useWindowSize() {
    const [windowSize, setWindowSize] = useState<{width: undefined | number, height: undefined | number}>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

function ProductsListing({ productsState, setProductsState, sortSelected, gridCols }: Props ) {

    // if (productsState.filter(p => p.shown).length == 0) {            //todo No items to display
    //     console.log('None availb')
    //     return <div></div>
    // }

    const windowSize = useWindowSize()
    const router = useRouter();

    const setProductsStateWrapper = (e: any, index: number, productId: number) => {
        e.preventDefault()
        const windowWidth = windowSize.width

        if ( typeof windowWidth !== "undefined" && windowWidth < 646 ) {
            router.push(`/product/${productId}`);
            return
        }

        setProductsState(prevState => {
            const newList = cloneDeep(prevState)
            newList[index].quickview = true
            return newList
        })
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl">
                <h2 className="sr-only">Products</h2>

                <div className={`grid gap-y-10 gap-x-6 ${gridCols === 2 ? 'grid-cols-2 lg:grid-cols-4': 'grid-cols-3 lg:grid-cols-5'}`}>
                    { productsState.map((a, i) => { return {a, i} as ListeditemTuple })
                        .filter( ({a: listeditem, i: index}) => listeditem.shown )
                        .sort((a, b) => sortSelected.func(a, b))
                        .map( ({a: listeditem, i: index})  => (

                            <a onClick={(e) => setProductsStateWrapper(e, index, listeditem.product.id) } key={listeditem.product.id} href={listeditem.product.href} className="group">
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ">
                                    <Image
                                        height={500} width={250}
                                        src={listeditem.product.images[0].src}
                                        alt={listeditem.product.images[0].alt}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75 smooth-transition"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{listeditem.product.name}</h3>
                                <DisplayPrice price={listeditem.product.price} cssClass={"mt-1 text-lg font-medium text-gray-900"}/>

                                <ProductQuickview key={index} productId={listeditem.product.id} productIndex={index} productState={productsState} setProductsState={setProductsState} />
                            </a>

                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsListing;