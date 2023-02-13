import ProductsFilter from "../../../../components/product_views/search_page/ProductsFilter";
import {convertToSlug, titleCase} from "../../../../lib/utils";
import {getAllProducts, getByBreadcrumb, getSubCategories} from "../../../../lib/databases/DATABASE_API";
import {getSortFilters} from "../../../../lib/DATABASE_CATEGORIES";
import {adminDb} from "../../../../firebaseAdmin";
import {Product} from "../../../../typings";

type PageProps = {
    params: {
        searchTerm: string[]
    }
}

// // Server-side prebuilding pages
// export async function generateStaticParams() {
//     let products: Product[]
//
//     // if (process.env.USE_REAL_DB! === 'true') {
//     //     const productsRef = adminDb.collection('products');
//     //     const snapshot = await productsRef.get();
//     //
//     //     products = []
//     //     snapshot.forEach( doc => {
//     //         const product = doc.data() as Product
//     //         products.push(product)
//     //     })
//     //
//     // } else {
//         products = await getAllProducts()
//     // }
//
//     const slug_arr = products.map( product => product.breadcrumbs.map(b => convertToSlug(b.name)) )
//         .flatMap( c => [
//             [c[0]],
//             [c[0], c[1]],
//             [c[0], c[1], c[2]],
//         ] )
//
//     return  slug_arr.map( slug => ({
//         searchTerm: slug
//     }));
//
// }

export default async function Page({params: {searchTerm}}: PageProps) {
    const currentCategories: string[] = searchTerm
    const level = searchTerm.length
    const pageTitle = titleCase(searchTerm[searchTerm.length - 1])

    // Database Getters
    const allProductsAtCategory = await getByBreadcrumb(currentCategories)
    const subCategories = await getSubCategories(allProductsAtCategory, level)
    const filters = getSortFilters(allProductsAtCategory)

    return (
        <div>
            <ProductsFilter
                pageTitle={pageTitle}
                currentCategories={currentCategories}

                allProducts={allProductsAtCategory}
                subCategories={subCategories}
                filters={filters}
            />
        </div>
    );
}