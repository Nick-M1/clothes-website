import ProductsFilter from "../../../components/product_views/search_page/ProductsFilter";

export default function Page() {
    return (
        <div>
            <ProductsFilter pageTitle={'New Arrivals'} level={0} currentCategories={[]}/>
        </div>
    );
}