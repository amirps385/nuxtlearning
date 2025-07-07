<template>
  <nav class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-green-700 hover:text-green-600">
          Organic<span class="text-green-500">Life</span>
        </NuxtLink>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-green-800 hover:text-green-600 text-sm font-medium">Home</NuxtLink>
          <NuxtLink to="/shop" class="text-green-800 hover:text-green-600 text-sm font-medium">Shop</NuxtLink>
          <NuxtLink to="/about" class="text-green-800 hover:text-green-600 text-sm font-medium">About</NuxtLink>
          <NuxtLink to="/contact" class="text-green-800 hover:text-green-600 text-sm font-medium">Contact</NuxtLink>

          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              @keydown.enter="performSearch"
              type="text"
              placeholder="Search..."
              class="w-56 px-4 py-2 text-sm border rounded-full focus:ring-2 focus:ring-green-500"
            />
            <button @click="performSearch" class="absolute right-3 top-2 text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <!-- Cart Icon -->
          <div class="relative">
            <NuxtLink
              v-if="authStore.user"
              to="/cart"
              class="relative text-gray-700 hover:text-green-600 p-2 inline-block"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span
                v-if="cartCount > 0"
                class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
              >
                {{ cartCount }}
              </span>
            </NuxtLink>

            <!-- Disabled cart for guests -->
            <div
              v-else
              class="relative text-gray-300 cursor-not-allowed p-2"
              title="Login to view cart"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

          <!-- Auth Section -->
          <div class="flex items-center space-x-3">
           <div v-if="authStore.user" class="relative group">
  <button class="text-green-800 text-sm font-medium">
    Welcome, {{ authStore.user.name }}
  </button>
  <!-- Dropdown -->
  <div
    class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50"
  >
    <NuxtLink
      to="/my-orders"
      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      My Orders
    </NuxtLink>
    <button
      @click="logout"
      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
    >
      Logout
    </button>
  </div>
</div>


            <!-- <button
              v-if="authStore.user"
              @click="logout"
              class="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
            >
              Logout
            </button> -->

            <NuxtLink
              v-else
              to="/login"
              class="text-sm bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
            >
              Login
            </NuxtLink>

            <NuxtLink
              v-if="!authStore.user"
              to="/signup"
              class="text-sm border border-green-600 text-green-600 px-4 py-1.5 rounded hover:bg-green-100"
            >
              Sign Up
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile Toggle -->
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
      <div class="px-4 py-3 space-y-2">
        <NuxtLink to="/" class="block text-green-800 hover:text-green-600">Home</NuxtLink>
        <NuxtLink to="/shop" class="block text-green-800 hover:text-green-600">Shop</NuxtLink>
        <NuxtLink to="/about" class="block text-green-800 hover:text-green-600">About</NuxtLink>
        <NuxtLink to="/contact" class="block text-green-800 hover:text-green-600">Contact</NuxtLink>

        <NuxtLink
          v-if="authStore.user"
          to="/cart"
          class="block text-green-800 hover:text-green-600"
        >
          Cart
        </NuxtLink>

        <div class="border-t pt-2">
          <span
            v-if="authStore.user"
            class="block text-green-800"
          >
            Welcome, {{ authStore.user.name }}
          </span>

          <button
            v-if="authStore.user"
            @click="logout"
            class="mt-1 block w-full text-left text-red-600 hover:bg-red-100 px-3 py-1 rounded"
          >
            Logout
          </button>

          <div v-else class="flex gap-3 mt-2">
            <NuxtLink to="/login" class="text-green-600">Login</NuxtLink>
            <NuxtLink to="/signup" class="text-green-600">Signup</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'

const mobileMenu = ref(false)
const searchQuery = ref('')
const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()
const cartStore = useCartStore()

const cartCount = computed(() => cartStore.cartCount)

function performSearch() {
  const trimmed = searchQuery.value.trim()
  router.push({
    path: '/shop',
    query: {
      ...route.query,
      ...(trimmed ? { search: trimmed } : {})
    }
  })

  if (!trimmed && route.query.search) {
    const updatedQuery = { ...route.query }
    delete updatedQuery.search
    router.push({ path: '/shop', query: updatedQuery })
  }
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>
