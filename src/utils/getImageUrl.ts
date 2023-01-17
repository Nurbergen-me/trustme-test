export function getImageUrl(path: string) {
    const imagePath = `../assets${path}`
    const url = new URL(imagePath, import.meta.url).href
    return url
}