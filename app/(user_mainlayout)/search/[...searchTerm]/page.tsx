import ProductsFilter from "../../../../components/product_views/search_page/ProductsFilter";
import {titleCase} from "../../../../lib/utils";

type PageProps = {
    params: {
        searchTerm: string[]
    }
}

export default function Page({params: {searchTerm}}: PageProps) {
    return (
        <div>
            <ProductsFilter
                pageTitle={titleCase(searchTerm[searchTerm.length-1])}
                level={searchTerm.length}
                currentCategories={searchTerm}
            />
        </div>
    );
}