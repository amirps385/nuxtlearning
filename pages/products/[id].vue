<template>
  <div class="max-w-5xl mx-auto py-16 px-6">
    <div v-if="error" class="text-red-500 text-center text-lg">Product not found.</div>
    <div v-else-if="pending" class="text-center text-lg text-gray-500">Loading...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-96 object-cover rounded-xl shadow" />

      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.title }}</h1>
        <p class="text-sm text-gray-500 mb-2">Brand: {{ product.brand }}</p>
        <p class="text-lg text-yellow-500 mb-4">⭐ {{ product.rating }}/5</p>
        <p class="text-gray-700 mb-6">{{ product.description }}</p>
        <p class="text-2xl font-bold text-green-600 mb-4">${{ product.price }}</p>

        <button
          @click="addToCart(product)"
          :disabled="!authStore.user"
          class="px-6 py-3 rounded-lg transition font-medium"
          :class="authStore.user ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const productId = route.params.id

const { data, pending, error } = await useFetch(`https://dummyjson.com/products/${productId}`)
const product = data

const cartStore = useCartStore()
const authStore = useAuthStore()

function addToCart(product) {
  if (!authStore.user) return
  cartStore.addToCart(product)
}
</script>
