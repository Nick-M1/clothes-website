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
    stripe_ids: StripeInfo[]
    comments?: CommentItem[]
}

export type StripeInfo = {
    color: string,
    size: string,
    stripe_id: string
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
    product: Product;
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


type GetAllProductsResponse = {
    productsArray: Product[]
}
type GetProductByIdResponse = {
    product: Product
}

type CommentItem = {
    productId: number,
    email: string
    name: string
    profile_img: string
    rating: number
    comment: string,
    created_at: number,
}

type ShippingAddress = {
    customerId: string
    name: string
    address: string
    city: string
    state: string
    postcode: string
    phonenumber: string
    country: string
}