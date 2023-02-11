import React from 'react';
import Recommendations from '../../../../components/product_views/Recommendations';
import ProductInformation from "../../../../components/product_views/ProductInformation";
import {getAllProducts, getById} from "../../../../lib/DATABASE_PRODUCTS";

type PageProps = {
    params: {
        productId: number
    }
}

// Server-side prebuilding pages
export async function generateStaticParams() {
    const products = getAllProducts()
    return products.map( product => ({
        productId: product.id.toString()
    }));
}

export default function Page({params: {productId}}: PageProps) {
    const product = getById(productId)

    if (!product)
        return <div>Product not found</div>
        // throw new Error('Product not found')

    return (
        <div>
            <ProductInformation product={product}/>
            <Recommendations/>
        </div>
    );
}