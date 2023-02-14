import {BasketItem, Product} from "../../typings";
import * as stripe from "stripe";


export async function __getProductById_MOCK(id: number) {
    const products = await __getAllProducts_MOCK()
    return products.find((product) => product.id == id)
}


export async function __getProductByStripeId_MOCK(stripe_id: string, quantity: number = 0) {
    const products = await __getAllProducts_MOCK()

    for (const product of products) {
        for (const stripeId of product.stripe_ids) {
            if (stripeId.stripe_id === stripe_id) {
                return {
                    productId: product.id,
                    color: stripeId.color,
                    size: stripeId.size,
                    quantity: quantity,
                    product: product
                }
            }
        }
    }

    throw new Error('Product not found')
}

export function __getAllProducts_MOCK(): Promise<Product[]> {
    return Promise.resolve(
        [
            {
                id: 1,
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

                stripe_ids: [
                    { color: 'Black', size: 'XXS',  stripe_id: 'price_1Mb9Y9L3RAkjlsFcbOuIEsRf' },
                    { color: 'Black', size: 'XS',   stripe_id: 'price_1Mb9Y9L3RAkjlsFcGErz4N7z' },
                    { color: 'Black', size: 'S',    stripe_id: 'price_1Mb9YAL3RAkjlsFcpONhy9Zu' },
                    { color: 'Black', size: 'M',    stripe_id: 'price_1Mb9YBL3RAkjlsFcn6iW8pXx' },
                    { color: 'Black', size: 'L',    stripe_id: 'price_1Mb9YBL3RAkjlsFc7tbShXlU' },
                    { color: 'Black', size: 'XL',   stripe_id: 'price_1Mb9YCL3RAkjlsFcVXVvF7h3' },
                    { color: 'Black', size: 'XXL',  stripe_id: 'price_1Mb9YDL3RAkjlsFczZKA3RcD' },
                    { color: 'Black', size: 'XXXL',  stripe_id: 'price_1Mb9YEL3RAkjlsFcF0cmQ6hO' },
                ],
            },
            {
                id: 2,
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

                stripe_ids: [
                    { color: 'Green', size: 'XXS',  stripe_id: 'price_1Mb9Y8L3RAkjlsFc9PmIOwXP' },
                    { color: 'Green', size: 'XS',   stripe_id: 'price_1Mb9Y9L3RAkjlsFcnl2kCgxj' },
                    { color: 'Green', size: 'S',    stripe_id: 'price_1Mb9YAL3RAkjlsFcfqCJJKor' },
                    { color: 'Green', size: 'M',    stripe_id: 'price_1Mb9YBL3RAkjlsFcg7m3lj8u' },
                    { color: 'Green', size: 'L',    stripe_id: 'price_1Mb9YBL3RAkjlsFcIBTcQGf0' },
                    { color: 'Green', size: 'XL',   stripe_id: 'price_1Mb9YCL3RAkjlsFcimIS5GuB' },
                    { color: 'Green', size: 'XXL',  stripe_id: 'price_1Mb9YDL3RAkjlsFcQMtIgYoT' },
                    { color: 'Green', size: 'XXXL', stripe_id: 'price_1Mb9YEL3RAkjlsFcPqpHxIRo' },
                ],
            },

            {
                id: 3,
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

                stripe_ids: [
                    { color: 'White', size: 'XXS',  stripe_id: 'price_1Mb9Y8L3RAkjlsFcTsMP0Lh4' },
                    { color: 'White', size: 'XS',   stripe_id: 'price_1Mb9YBL3RAkjlsFcPxvUKg3P' },
                    { color: 'White', size: 'S',    stripe_id: 'price_1Mb9YDL3RAkjlsFcwakidv2C' },
                    { color: 'White', size: 'M',    stripe_id: 'price_1Mb9YFL3RAkjlsFcKjafsEW7' },
                    { color: 'White', size: 'L',    stripe_id: 'price_1Mb9YHL3RAkjlsFcRiVm24pB' },
                    { color: 'White', size: 'XL',   stripe_id: 'price_1Mb9YKL3RAkjlsFcp84xltHb' },
                    { color: 'White', size: 'XXL',  stripe_id: 'price_1Mb9YML3RAkjlsFcvcDzT41y' },
                    { color: 'White', size: 'XXXL', stripe_id: 'price_1Mb9YOL3RAkjlsFciF7395jK' },

                    { color: 'Gray', size: 'XXS',  stripe_id: 'price_1Mb9Y9L3RAkjlsFcmGTYYsQW' },
                    { color: 'Gray', size: 'XS',   stripe_id: 'price_1Mb9YBL3RAkjlsFcgXOe3G5e' },
                    { color: 'Gray', size: 'S',    stripe_id: 'price_1Mb9YEL3RAkjlsFcmLzKa67p' },
                    { color: 'Gray', size: 'M',    stripe_id: 'price_1Mb9YGL3RAkjlsFcHgtugHWA' },
                    { color: 'Gray', size: 'L',    stripe_id: 'price_1Mb9YIL3RAkjlsFcfZWtMAYs' },
                    { color: 'Gray', size: 'XL',   stripe_id: 'price_1Mb9YKL3RAkjlsFcVUN2XCky' },
                    { color: 'Gray', size: 'XXL',  stripe_id: 'price_1Mb9YML3RAkjlsFcvcDzT41y' },
                    { color: 'Gray', size: 'XXXL', stripe_id: 'price_1Mb9YOL3RAkjlsFcTgoumjlB' },

                    { color: 'Black', size: 'XXS',  stripe_id: 'price_1Mb9YAL3RAkjlsFcsKcTC8Y8' },
                    { color: 'Black', size: 'XS',   stripe_id: 'price_1Mb9YCL3RAkjlsFcEfgtGepV' },
                    { color: 'Black', size: 'S',    stripe_id: 'price_1Mb9YEL3RAkjlsFcvxAgzO1Z' },
                    { color: 'Black', size: 'M',    stripe_id: 'price_1Mb9YHL3RAkjlsFc44ZsUwuO' },
                    { color: 'Black', size: 'L',    stripe_id: 'price_1Mb9YJL3RAkjlsFcEmjXTEGd' },
                    { color: 'Black', size: 'XL',   stripe_id: 'price_1Mb9YLL3RAkjlsFcB3VM9Yi5' },
                    { color: 'Black', size: 'XXL',  stripe_id: 'price_1Mb9YNL3RAkjlsFcgxzXeOYJ' },
                    { color: 'Black', size: 'XXXL', stripe_id: 'price_1Mb9YPL3RAkjlsFcsLry3jQ0' },
                ],
            },

            {
                id: 4,
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

                stripe_ids: [
                    { color: 'White', size: 'XXS',  stripe_id: 'price_1Mb9Y8L3RAkjlsFcD3bSypSb' },
                    { color: 'White', size: 'XS',   stripe_id: 'price_1Mb9YBL3RAkjlsFcVZYJANMv' },
                    { color: 'White', size: 'S',    stripe_id: 'price_1Mb9YDL3RAkjlsFcL5A4kyWE' },
                    { color: 'White', size: 'M',    stripe_id: 'price_1Mb9YFL3RAkjlsFcW2oq0KWc' },
                    { color: 'White', size: 'L',    stripe_id: 'price_1Mb9YIL3RAkjlsFcj7B5deBp' },
                    { color: 'White', size: 'XL',   stripe_id: 'price_1Mb9YKL3RAkjlsFc2Hhzdpkq' },
                    { color: 'White', size: 'XXL',  stripe_id: 'price_1Mb9YML3RAkjlsFcEwJBsNNM' },
                    { color: 'White', size: 'XXXL', stripe_id: 'price_1Mb9YOL3RAkjlsFcZ6iYo1q9' },

                    { color: 'Gray', size: 'XXS',  stripe_id: 'price_1Mb9Y9L3RAkjlsFcN0Ky0X0l' },
                    { color: 'Gray', size: 'XS',   stripe_id: 'price_1Mb9YBL3RAkjlsFcxalW1gor' },
                    { color: 'Gray', size: 'S',    stripe_id: 'price_1Mb9YEL3RAkjlsFcgvFHnRpG' },
                    { color: 'Gray', size: 'M',    stripe_id: 'price_1Mb9YGL3RAkjlsFcV0iQeR5y' },
                    { color: 'Gray', size: 'L',    stripe_id: 'price_1Mb9YIL3RAkjlsFc6o6d4IiL' },
                    { color: 'Gray', size: 'XL',   stripe_id: 'price_1Mb9YLL3RAkjlsFcmuZUWILA' },
                    { color: 'Gray', size: 'XXL',  stripe_id: 'price_1Mb9YNL3RAkjlsFcgOCHffd0' },
                    { color: 'Gray', size: 'XXXL', stripe_id: 'price_1Mb9YPL3RAkjlsFchB0Bbcsw' },

                    { color: 'Black', size: 'XXS',  stripe_id: 'price_1Mb9YAL3RAkjlsFc5mjPxZ3q' },
                    { color: 'Black', size: 'XS',   stripe_id: 'price_1Mb9YCL3RAkjlsFceQz4QYDM' },
                    { color: 'Black', size: 'S',    stripe_id: 'price_1Mb9YFL3RAkjlsFcbPSoplnc' },
                    { color: 'Black', size: 'M',    stripe_id: 'price_1Mb9YHL3RAkjlsFcPeLItGBo' },
                    { color: 'Black', size: 'L',    stripe_id: 'price_1Mb9YJL3RAkjlsFcSfNHuozC' },
                    { color: 'Black', size: 'XL',   stripe_id: 'price_1Mb9YLL3RAkjlsFcjygE4wSQ' },
                    { color: 'Black', size: 'XXL',  stripe_id: 'price_1Mb9YNL3RAkjlsFcjjLnVtmo' },
                    { color: 'Black', size: 'XXXL', stripe_id: 'price_1Mb9YPL3RAkjlsFcsfjTQctL' },
                ],
            },




            {
                id: 5,
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

                stripe_ids: [
                    { color: 'Salmon', size: 'M',  stripe_id: 'price_1Mb9Y8L3RAkjlsFcsrFfYMzL' },
                ],
            },
            {
                id: 6,
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

                stripe_ids: [
                    { color: 'Blue', size: 'M',  stripe_id: 'price_1Mb9Y8L3RAkjlsFcAJ4MwSlv' },
                ],
            },
        ]
    )
}