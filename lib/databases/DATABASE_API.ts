import {Product} from "../../typings";
import {convertToSlug} from "../utils";
import _ from "lodash";
import {__getAllProducts_REAL, __getProductById_REAL} from "./firebase_database";
import {__getAllProducts_MOCK, __getProductById_MOCK} from "./mock_database";

const USE_REAL_DB = process.env.USE_REAL_DB! === 'true'

export async function getProductById(id: number) {
    return USE_REAL_DB ? __getProductById_REAL(id) : __getProductById_MOCK(id)
}

export function getAllProducts(): Promise<Product[]> {
    return USE_REAL_DB ? __getAllProducts_REAL() : __getAllProducts_MOCK()
}

export async function getByIdOrThrow(id: number): Promise<Product> {
    const foundProduct = await getProductById(id)

    if (!foundProduct)
        throw new Error('Product not found')

    return Promise.resolve(foundProduct)
}

export function getSubCategories(allProducts: Product[], level: number): Promise<string[]> {
    if (!allProducts.length || allProducts[0].breadcrumbs.length <= level)
        return Promise.resolve([])


    return Promise.resolve(
        // @ts-ignore
        [ ...new Set(allProducts.map( (product) => product.breadcrumbs[level].name )) ]
    )
}


export async function getByBreadcrumb(breadcrumbs: string[]): Promise<Product[]> {
    const allProducts = await getAllProducts()

    return allProducts.filter((product) => {
        return _.isEqual(product.breadcrumbs.map((product) => convertToSlug(product.name)).slice(0, breadcrumbs.length), breadcrumbs)
    })
}