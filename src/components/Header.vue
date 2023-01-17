<template>
    <div class="bg-gray-800 border-b-2">
        <div class="container mx-auto flex justify-center p-4 text-white">
            <div class="text-lg">
                <router-link :to="{name: 'Home'}">
                LOGO
                </router-link>
            </div>
            <div v-if="!isCartPage" class="ml-auto text-lg">
                <router-link :to="{name: 'Cart'}">
                CART({{totalQuantity}})
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({

    computed: {
        ...mapGetters(['totalQuantity', 'isCartPage'])
    },
    methods: {
        isCartPage() {
            return this.$route.name === 'Cart'
        }
    }
})
</script>
