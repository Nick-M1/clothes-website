export type ColorOptions = {
    name: string;
    class: string;
    selectedClass: string;
}

export type SizeOptions = {
    name: string;
    inStock: boolean;
}

export type Breadcrumbs = {
    id: number;
    name: string;
    href: string;
}

export type ImageInfo = {
    src: string;
    alt: string
}

export type Product = {
    id: number;
    stripe_id: string
    name: string;
    href: '#';
    breadcrumbs: Breadcrumbs[]
    images: ImageInfo[]
    price: number;
    rating: number;
    reviewCount: number;
    colors: ColorOptions[];
    sizes: SizeOptions[];
    description: string;
    highlights: string[];
    details: string;
}

export type StripeCheckoutItem = {
    price: string;
    quantity: number
}

export type NavLinkInfo = {
    name: string;
    href: string;
}

export type Category = {
    id: string;
    name: string;
    featured: CategoryFeatured[];
    sections: CategorySection[];
}

export type CategoryFeatured = {
    name: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
}

export type CategorySection = {
    id: string;
    name: string;
    items: NavLinkInfo[];
}

type BasketItem = {
    productId: number;
    color: ColorOptions;
    size: SizeOptions;
    quantity: number;
    price: number;
}

type ListedItem = {
    product: Product
    shown: boolean;
    quickview: boolean
}

type CurrencyOption = {
    id: number
    name: string
    shortName: string
    symbol: string
    img: string
}

type ListeditemTuple = {
    a: ListedItem;
    i: number;
}

type SortOptions = {
    name: string
    func: ((item1: ListeditemTuple, item2: ListeditemTuple) => number)
}