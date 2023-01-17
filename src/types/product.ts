interface IPrice {
    currency: string,
    value: number
}

interface IProduct {
    type: string,
    id: number,
    sku: string,
    title: string,
    regular_price: IPrice,
    image: string,
    brand: number,
    quantity?: number
}

