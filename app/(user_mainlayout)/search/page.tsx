import ProductsFilter from "../../../components/product_views/ProductsFilter";

export default function Page() {
    return (
        <div>
            <ProductsFilter pageTitle={'New Arrivals'} level={0} currentCategories={[]}/>
        </div>
    );
}