import { createRouter, createWebHashHistory } from 'vue-router';
import CartVue from "@/components/Cart.vue";
import ProductsVue from '@/components/Products.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: ProductsVue
        },
        {
            path: '/cart',
            name: 'Cart',
            component: CartVue
        }
    ]
})

export default router