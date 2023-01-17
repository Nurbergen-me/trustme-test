<template>
  <div class="container mx-auto flex mt-8">
    <div class="sidebar  p-4">
      <h2 class="text-lg font-bold mb-3 cursor-pointer" @click="filterByBrand()">All Brands</h2>
      <ul>
        <li class="mb-1 text-lg cursor-pointer hover:underline" v-for="brand in brands" :key="brand.id" @click="filterByBrand(brand.id)">
          {{ brand.title }}
        </li>
      </ul>
    </div>
    <div class="catalog  pl-5">
      <h2 class="text-3xl font-bold mb-3 mt-2">Catalog</h2>
      <div class="flex flex-wrap gap-3">
        <div class="w-1/5" v-for="product in filteredProducts" :key="product.id">
            <img class="h-60 w-full object-contain bg-white" :src="getUrl(product.image)" :alt="product.image">
            <h3 class="text-lg">
                {{ product.title }}
            </h3>
            <div>
                {{ getBrand(product) }}
            </div>
            <div>
                $ {{ product.regular_price.value }}
            </div>
            <button class="border-x border-y border-green-600 py-1 px-2 mt-1 hover:border-transparent hover:bg-green-600 hover:text-white"
            @click="addToCart(product)"
            >
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
import '../types/product'
import { getImageUrl } from '../utils/getImageUrl'
import { getProductBrandName } from '../utils/getProductBrandName'

export default defineComponent({

    data() {
        return {
            products: [] as IProduct[],
            filteredProducts: [] as IProduct[]
        }
    },

    computed: {
        ...mapGetters(['brands'])
    },

    async created() {
        this.$store.dispatch('fetchBrands')
        const { data } = await axios.get<IProduct[]>('products.json')
        this.products = data
        this.filteredProducts = data

    },

    methods: {
        filterByBrand(brandId?: number) {
            if (!brandId) return this.filteredProducts = this.products
            this.filteredProducts = this.products.filter((product: IProduct) => product.brand === brandId)
        },
        addToCart(product: IProduct) {
            this.$store.commit('addToCart', product)
        },
        getUrl(url: string) {
            return getImageUrl(url)
        },
        getBrand(product: IProduct) {
            return getProductBrandName(product, this.brands)
        }
    }
})
</script>

<style scoped>

.flex {
  display: flex;
}

.sidebar {
  width: 200px;
}

.catalog {
  flex: 1;
}
</style>
