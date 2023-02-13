import Demo1 from "../../../components/redis/Demo1";

// const getAllProducts = async () => {
//     const res = await fetch('http://localhost:3000/api/getAllProducts')
//     return await res.json() as Promise<GetAllProductsResponse>
// }

export default async function Page() {
    // const allMessages = await getAllProducts()
    // console.log(allMessages.productsArray.length)

    return <Demo1 />
    // return <div></div>

}