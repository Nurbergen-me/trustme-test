export function getProductBrandName(product: IProduct, brands: IBrand[]) {
    const currentBrand = brands.find((brand: IBrand) => brand.id === product.brand )
    if (currentBrand) return currentBrand.title
    return 'Not found'
}