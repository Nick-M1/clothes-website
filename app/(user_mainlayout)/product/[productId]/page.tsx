import React from 'react';
import Recommendations from '../../../../components/product_views/product_page/Recommendations';
import ProductInformationServer from "../../../../components/product_views/product_page/ProductInformationServer";
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
    const allProducts = getAllProducts()
    const product = getById(productId)

    if (!product)
        return <div>Product not found</div>
        // throw new Error('Product not found')

    return (
        <div>
            <ProductInformationServer product={product}/>
            <Recommendations products={allProducts}/>
        </div>
    );
}