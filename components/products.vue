<script setup>
import { useCartStore } from '~/store/cart'
import { useAuthStore } from '~/store/auth'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const products = [
  { name: "Product 1", price: 100, orignalprice: 200, image: "/img/featureimg/cat-1.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  { name: "Product 2", price: 200, orignalprice: 300, image: "/img/featureimg/cat-2.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  { name: "Product 3", price: 300, orignalprice: 400, image: "/img/featureimg/cat-3.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  { name: "Product 4", price: 400, orignalprice: 500, image: "/img/featureimg/cat-4.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  { name: "Product 5", price: 500, orignalprice: 600, image: "/img/featureimg/cat-5.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  { name: "Product 6", price: 600, orignalprice: 700, image: "/img/featureimg/cat-6.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." }
]

function handleAddToCart(product) {
  if (!authStore.user) {
    alert('Please login to add items to cart.')
    router.push('/login')
    return
  }

  cartStore.addToCart(product)
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <h2 class="text-2xl font-bold mb-6 text-center">Our Products</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="bg-white p-4 rounded-lg shadow-md"
      >
        <div class="w-full h-48 flex items-center justify-center overflow-hidden rounded-md">
          <img :src="product.image" alt="Product Image" class="w-full h-full object-contain">
        </div>

        <h3 class="text-lg font-semibold mt-3">{{ product.name }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
        <p class="text-green-600 font-bold text-lg">
          ${{ product.price }}
          <span class="text-red-300 font-semibold text-lg">
            <del>${{ product.orignalprice }}</del>
          </span>
        </p>

        <UButton
          :avatar="{ src: '/icons/shopping-cart.png' }"
          size="lg"
          variant="outline"
          class="p-3 mt-1"
          @click="handleAddToCart(product)"
        >
          Add to Cart
        </UButton>
      </div>
    </div>
  </div>
</template>
