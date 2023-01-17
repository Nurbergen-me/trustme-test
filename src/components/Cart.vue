<template>
  <div class="container mx-auto">
    <h3 class="text-3xl mt-7 font-bold mb-5">
        Shopping Cart
    </h3>
    <table class="w-full text-center text-lg">
        <tr class="h-10">
            <th class="font-bold w-1/2 text-left pl-10">
                Item
            </th>
            <th class="font-bold">
                Price
            </th>
            <th class="font-bold">
                Qty
            </th>
            <th class="font-bold">
                Total
            </th>
        </tr>
        <tr class=" border-b-2" v-for="product in cartItems" :key="product.id">
            <td class="flex items-center">
                <img class=" w-20 h-20 mr-4" :src="getUrl(product.image)" alt="product">
                <div>
                    {{ getBrand(product) }} / {{ product.title }}
                </div>
            </td>
            <td>
                $ {{ product.regular_price?.value }}
            </td>
            <td>
                <div class="flex items-center border-x border-y w-fit mx-auto">
                    <span class="w-16 text-center">
                        {{ product.quantity }}
                    </span>
                    <div>
                        <button 
                            class="block w-5 leading-4 px-1 hover:bg-gray-300"
                            @click="addProduct(product)">
                            +
                        </button>
                        <button 
                            class="block w-5 leading-4 px-1 hover:bg-gray-300 disabled:opacity-25" :disabled="product.quantity === 1"
                            @click="removeProduct(product)">
                            -
                        </button>
                    </div>
                </div>
            </td>
            <td>
                <div class="flex w-fit mx-auto">
                    <div class="mr-2 w-20 whitespace-nowrap">
                        $ {{ getProductCost(product.regular_price?.value, product.quantity) }}
                    </div>
                    <button class="text-red-500 w-16" @click="deleteProduct(product)">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    </table>
    <div class="w-fit text-3xl ml-auto font-bold mt-10 mr-10">
        Subtotal: ${{ totalPrice.toFixed(2) }}
    </div>
    <button class="block text-lg w-fit px-10 py-2 border-x border-y border-black hover:bg-black hover:text-white ml-auto mt-5 mr-10">
        Checkout
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import '../types/product'
import { getImageUrl } from '../utils/getImageUrl'
import { getProductBrandName } from '../utils/getProductBrandName'
export default defineComponent({

    created() {
        this.$store.dispatch('fetchBrands')
        this.$store.commit('setIsCartPage', true)
    },

    unmounted() {
        this.$store.commit('setIsCartPage', false)
    },

    computed: {
        ...mapGetters(['cartItems','brands', 'totalPrice'])
    },

    methods: {
        getUrl(url: string) {
            return getImageUrl(url)
        },
        getBrand(product: IProduct) {
            return getProductBrandName(product, this.brands)
        },
        addProduct(product: IProduct) {
            this.$store.commit('addToCart', product)
        },
        removeProduct(product: IProduct) {
            this.$store.commit('removeFromCart', product)
        },
        deleteProduct(product: IProduct) {
            this.$store.commit('deleteFromCart', product)
        },
        getProductCost(price: number, quantity: number) {
            return (price * quantity).toFixed(2)
        }
    }

})
</script>
