<template>
  <nav class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-green-700 hover:text-green-600">
          Organic<span class="text-green-500">Life</span>
        </NuxtLink>

        <!-- Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">Home</NuxtLink>
          <NuxtLink to="/shop" class="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">Shop</NuxtLink>
          <NuxtLink to="/about" class="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">About</NuxtLink>
          <NuxtLink to="/contact" class="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">Contact</NuxtLink>
        </div>

        <!-- Search and Cart -->
        <div class="hidden md:flex items-center space-x-6">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              @keydown.enter="performSearch"
              type="text"
              placeholder="Search products..."
              class="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button @click="performSearch" class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <!-- Cart -->
          <NuxtLink to="/cart" class="relative text-gray-700 hover:text-green-600 p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {{ cartCount }}
            </span>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="md:hidden flex items-center">
          <button @click="mobileMenu = !mobileMenu" class="text-gray-700 hover:text-green-600 p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileMenu" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink to="/" class="block px-3 py-2 text-base text-green-800 hover:text-green-600">Home</NuxtLink>
        <NuxtLink to="/shop" class="block px-3 py-2 text-base text-green-800 hover:text-green-600">Shop</NuxtLink>
        <NuxtLink to="/about" class="block px-3 py-2 text-base text-green-800 hover:text-green-600">About</NuxtLink>
        <NuxtLink to="/contact" class="block px-3 py-2 text-base text-green-800 hover:text-green-600">Contact</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'

const mobileMenu = ref(false)
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.cartCount)

const router = useRouter()
const route = useRoute()
const searchQuery = ref(route.query.search || '')

function performSearch() {
  const trimmed = searchQuery.value.trim()

  router.push({
    path: '/shop',
    query: {
      ...route.query,
      ...(trimmed ? { search: trimmed } : {}) // add `search` only if not empty
    }
  })

  // if search is empty, remove it from the query
  if (!trimmed && route.query.search) {
    const updatedQuery = { ...route.query }
    delete updatedQuery.search
    router.push({ path: '/shop', query: updatedQuery })
  }
}
</script>
