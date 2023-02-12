import ProductsFilter from "../../../components/product_views/search_page/ProductsFilter";
import {getByBreadcrumb, getSubCategories} from "../../../lib/DATABASE_PRODUCTS";
import {getSortFilters} from "../../../lib/DATABASE_CATEGORIES";

export default function Page() {
    const currentCategories: string[] = []
    const level = 0
    const pageTitle = 'New Arrivals'

    // Database Getters
    const allProductsAtCategory = getByBreadcrumb(currentCategories)
    const subCategories = getSubCategories(allProductsAtCategory, level)
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