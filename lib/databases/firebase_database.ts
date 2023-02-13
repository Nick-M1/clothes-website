import {GetAllProductsResponse, GetProductByIdResponse, Product} from "../../typings";

export async function __getProductById_REAL(productId: number) {
    async function getProductByIdInner(productId: number) {
        const res = await fetch(`${process.env.VERCEL_URL}/api/getProducts/${productId}`)
        return await res.json() as Promise<GetProductByIdResponse>
    }

    try {
        const getProductByIdResponse = await getProductByIdInner(productId)
        return getProductByIdResponse.product
    } catch (e) {
        console.log(`__getProductById_REAL(productId=${productId}) failed:  ${e}`)
    }
    return Promise.resolve(null)
}


export async function __getAllProducts_REAL() {
    async function getAllProductsInner() {
        const res = await fetch(`${process.env.VERCEL_URL}/api/getProducts`)
        return await res.json() as Promise<GetAllProductsResponse>
    }

    try {
        const getAllProductsResponse = await getAllProductsInner()
        return getAllProductsResponse.productsArray
    } catch (e) {
        console.log(`__getAllProducts_REAL() failed:  ${e}`)
    }
    return Promise.resolve([] as Product[])
}