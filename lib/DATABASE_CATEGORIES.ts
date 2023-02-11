import {Category, CurrencyOption, NavLinkInfo, Product} from "../typings";

export const MAX_QUANTITY = 18             // Max quantity of a single item in cart

export function getSortFilters(allProducts: Product[]): {id: string, name: string, options: string[]}[] {
    const SIZES_ORDER = [ 'XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL' ]

    const colorsNotunique = allProducts.flatMap((product) => product.colors.map( (colorOption) => colorOption.name ))
    const sizesNotunique = allProducts.flatMap((product) => product.sizes.map( (sizeOption) => sizeOption.name ))

    // @ts-ignore
    const colorsUnique: string[] = [ ...new Set(colorsNotunique) ].sort()
    // @ts-ignore
    const sizesUnique: string[] = [ ...new Set(sizesNotunique) ].sort((a, b) => {
        return SIZES_ORDER.indexOf(a) - SIZES_ORDER.indexOf(b)
    })

    return [
        {
            id: 'color',
            name: 'Color',
            options: colorsUnique,
        },
        {
            id: 'category',
            name: 'Category',
            options: [ 'New Arrivals', 'Sale',  'Travel',  'Organization', 'Accessories' ],
        },
        {
            id: 'size',
            name: 'Size',
            options: sizesUnique,
        },
    ]
}

export function getNavPages(): NavLinkInfo[] {
    return [
        { name: 'Company', href: '/aboutus' },
        { name: 'Stores', href: '/aboutus' },
    ]
}

export function getCategories(): Category[] {
    return [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
            ],
        },
    ]
}


export function getCurrencies(): CurrencyOption[] {
    return [
        {
            id: 0,
            name: 'Australian Dollar',
            shortName: 'AUD',
            symbol: '$',
            img: 'https://img.icons8.com/officel/80/null/australia-flag.png'
        },
        {
            id: 1,
            name: 'Canadian Dollar',
            shortName: 'CAD',
            symbol: '$',
            img: 'https://img.icons8.com/officel/80/null/canada.png'
        },
        {
            id: 2,
            name: 'Chinese Yuan',
            shortName: 'CNY',
            symbol: '¥',
            img: 'https://img.icons8.com/officel/80/null/china.png'
        },
        {
            id: 3,
            name: 'Euro',
            shortName: 'EUR',
            symbol: '€',
            img: 'https://img.icons8.com/officel/80/null/flag-of-europe.png'
        },
        {
            id: 4,
            name: 'GB Pound',
            shortName: 'GBP',
            symbol: '£',
            img: 'https://img.icons8.com/officel/80/null/great-britain.png'
        },
        {
            id: 5,
            name: 'Japanese Yen',
            shortName: 'JPY',
            symbol: '¥',
            img: 'https://img.icons8.com/officel/80/null/japan.png'
        },
        {
            id: 6,
            name: 'US Dollar',
            shortName: 'USD',
            symbol: '$',
            img: 'https://img.icons8.com/officel/80/null/usa.png'
        },
    ]
}