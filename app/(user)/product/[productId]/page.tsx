import React, {Suspense} from 'react';
import Recommendations from '../../../../components/product_views/product_page/Recommendations';
import ProductInformationServer from "../../../../components/product_views/product_page/ProductInformationServer";
import {getAllProducts, getProductById} from "../../../../lib/databases/DATABASE_API";

type PageProps = {
    params: {
        productId: number
    }
}

// // Server-side prebuilding pages
// export async function generateStaticParams() {
//     const products = await getAllProducts()
//     return products.map(product => ({
//         productId: product.id.toString()
//     }));
// }
export const dynamic = 'force-dynamic'      // due to auth

export default async function Page({params: {productId}}: PageProps) {

    const allProducts = await getAllProducts()
    const product = await getProductById(productId)

    if (!product)
        return <div className='p-12'>Product not found</div>

    return (
        <div>
            <ProductInformationServer product={product}/>
            <Recommendations products={allProducts}/>
        </div>
    );
}