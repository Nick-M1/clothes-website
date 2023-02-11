import {Product} from "../typings";
import {convertToSlug} from "./utils";
import _ from "lodash";


export function getById(id: number) {
    const products = getAllProducts()
    return products.find((product) => product.id == id)
}

export function getByIdOrThrow(id: number) {
    const products = getAllProducts()
    const foundProduct = products.find((product) => product.id == id)

    if (!foundProduct)
        throw new Error('Product not found')

    return foundProduct
}

export function getSubCategories(allProducts: Product[], level: number): string[] {
    if (!allProducts.length || allProducts[0].breadcrumbs.length <= level)
        return []

    // @ts-ignore
    return [ ...new Set(allProducts.map( (product) => product.breadcrumbs[level].name )) ]
}


export function getByBreadcrumb(breadcrumbs: string[]): Product[] {
    const allProducts = getAllProducts()

    return allProducts.filter( (product) => {
        return _.isEqual(product.breadcrumbs.map( (product) => convertToSlug(product.name) ).slice(0, breadcrumbs.length), breadcrumbs )
    })
}



export function getAllProducts(): Product[] {
    return [
        {
            id: 1,
            stripe_id: 'price_1MaPePL3RAkjlsFcIoRtwBoi',
            name: 'Basic Tee',
            href: '#',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
                { id: 3, name: 'Tee shirts', href: '#' },
            ],
            images: [
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    alt: 'Front of men\'s Basic Tee in black.',
                }
            ],
            price: 35,
            rating: 3.7,
            reviewCount: 158,
            colors: [
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',

        },
        {
            id: 2,
            stripe_id: 'price_1MaPeQL3RAkjlsFcU6k7iTdm',
            name: 'Basic Tee',
            href: '#',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
                { id: 3, name: 'Tee shirts', href: '#' },
            ],
            images: [
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    alt: 'Front of men\'s Basic Tee in black.',
                }
            ],
            price: 25,
            rating: 4.3,
            reviewCount: 212,
            colors: [
                { name: 'Green', class: 'bg-green', selectedClass: 'ring-green-400' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',

        },
        {
            id: 3,
            stripe_id: 'price_1MaPeRL3RAkjlsFcIRXyW8Zw',
            name: 'Basic Tee 6-Pack ',
            price: 192,
            rating: 3.9,
            reviewCount: 117,
            href: '#',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
                { id: 3, name: 'Tee shirts', href: '#' },
            ],
            images: [
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
                    alt: 'Two each of gray, white, and black shirts arranged on table.',
                }
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: true },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: false },
            ],
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',

        },


        {
            id: 4,
            stripe_id: 'price_1MaPeSL3RAkjlsFcgv6npTdr',
            name: 'Basic Tee 6-Pack',
            price: 192,
            rating: 3.9,
            reviewCount: 123,
            href: '#',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Clothing', href: '#' },
                { id: 3, name: 'Tee shirts', href: '#' },
            ],
            images: [
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
                    alt: 'Two each of gray, white, and black shirts laying flat.',
                },
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
                    alt: 'Model wearing plain black basic tee.',
                },
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
                    alt: 'Model wearing plain gray basic tee.',
                },
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
                    alt: 'Model wearing plain white basic tee.',
                },
            ],
            colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ],
            sizes: [
                { name: 'XXS', inStock: false },
                { name: 'XS', inStock: true },
                { name: 'S', inStock: true },
                { name: 'M', inStock: true },
                { name: 'L', inStock: true },
                { name: 'XL', inStock: true },
                { name: 'XXL', inStock: true },
                { name: 'XXXL', inStock: true },
            ],
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },

        {
            id: 5,
            stripe_id: 'price_1MaPeSL3RAkjlsFcIyrJAxHG',
            name: 'Throwback Hip Bag',
            price: 90,
            rating: 3.9,
            reviewCount: 67,
            href: '#',
            breadcrumbs: [
                { id: 1, name: 'Women', href: '#' },
                { id: 2, name: 'Accessories', href: '#' },
                { id: 3, name: 'Hip Bags', href: '#' },
            ],
            images: [
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
                    alt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
                },
            ],
            colors: [
                { name: 'Salmon', class: 'bg-rose-500', selectedClass: 'ring-rose-500' },
            ],
            sizes: [
                { name: 'M', inStock: true },
            ],
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',

        },
        {
            id: 6,
            stripe_id: 'price_1MaPeTL3RAkjlsFcVtCHZ9ZB',
            name: 'Medium Stuff Satchel',
            price: 32,
            rating: 3.9,
            reviewCount: 89,
            href: '#',
            breadcrumbs: [
                { id: 1, name: 'Men', href: '#' },
                { id: 2, name: 'Accessories', href: '#' },
                { id: 3, name: 'Backpacks', href: '#'},
            ],
            images: [
                {
                    src: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
                    alt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
                },
            ],
            colors: [
                { name: 'Blue', class: 'bg-blue-500', selectedClass: 'ring-blue-500' },
            ],
            sizes: [
                { name: 'M', inStock: true },
            ],
            description:
                'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
            highlights: [
                'Hand cut and sewn locally',
                'Dyed with our proprietary colors',
                'Pre-washed & pre-shrunk',
                'Ultra-soft 100% cotton',
            ],
            details:
                'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',

        },
    ]
}