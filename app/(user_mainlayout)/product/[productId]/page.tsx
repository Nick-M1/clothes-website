import React from 'react';
import Recommendations from '../../../../components/product_views/product_page/Recommendations';
import ProductInformationServer from "../../../../components/product_views/product_page/ProductInformationServer";
import {getAllProducts, getProductById} from "../../../../lib/databases/DATABASE_API";
import {adminDb} from "../../../../firebaseAdmin";
import {Product} from "../../../../typings";

type PageProps = {
    params: {
        productId: number
    }
}

// Server-side prebuilding pages
export async function generateStaticParams() {

    if (process.env.USE_REAL_DB! === 'true') {
        const productsRef = adminDb.collection('products');
        const snapshot = await productsRef.get();

        const productsArray: number[] = []

        snapshot.forEach( doc => {
            const product = doc.data() as Product
            productsArray.push(product.id)
        })

        return productsArray.map(productId => ({
            productId: productId.toString()
        }));


    } else {
        const products = await getAllProducts()
        return products.map(product => ({
            productId: product.id.toString()
        }));
    }
}


export default async function Page({params: {productId}}: PageProps) {
    const allProducts = await getAllProducts()
    const product = await getProductById(productId)

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