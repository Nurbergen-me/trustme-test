import { createStore } from 'vuex'
import axios from 'axios'
import '../types/brand'

const store = createStore({
    state: {
        brands: [] as IBrand[],
        cartItems: [] as IProduct[],
        totalQuantity: 0,
        totalPrice: 0,
        isCartPage: false
    },

    getters: {
        brands:(state) => state.brands,
        cartItems:(state) => state.cartItems,
        totalQuantity: (state) => state.totalQuantity,
        totalPrice: (state) => state.totalPrice,
        isCartPage: (state) => state.isCartPage,
    },

    mutations: {
        addToCart(state, product: IProduct) {
            const currentItem = state.cartItems.find((item: IProduct) => item.id === product.id)

            if (currentItem) {
                currentItem.quantity++
            } else {
                state.cartItems.push({... product, quantity: 1})
            }
            state.totalPrice += product.regular_price.value
            state.totalQuantity += 1
        },
        
        removeFromCart(state, product: IProduct) {
            const currentItem = state.cartItems.find((item: IProduct) => item.id === product.id)

            if (currentItem?.quantity > 1) {
                state.cartItems = state.cartItems.map((item: IProduct) => {
                    if (currentItem.id === item.id) {
                        return {...currentItem, quantity: currentItem?.quantity - 1}
                    }
                    return item
                })
                state.totalPrice -= currentItem.regular_price.value
                state.totalQuantity -= 1
            }
        },

        deleteFromCart(state, product: IProduct) {
            state.cartItems = state.cartItems.filter((item: IProduct) => item.id !== product.id)
            state.totalPrice -= product.regular_price.value * product.quantity
            state.totalQuantity -= product.quantity
        },

        setIsCartPage(state, isCartPage: boolean) {
            state.isCartPage = isCartPage
        }
    },

    actions: {
        async fetchBrands({ state }) {
            const { data } = await axios.get<IBrand[]>('brands.json')
            state.brands = data
        }
    }
})

export default store