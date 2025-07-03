<template>
  <div class="p-6 max-w-7xl mx-auto pt-24">
    <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center mt-8">
      Shop Our Premium Range Of Products 🛍️
    </h1>

    <div v-if="error" class="text-red-500 text-center text-lg">
      ⚠️ Error loading products.
    </div>
    <div v-else-if="pending" class="text-gray-500 text-center text-lg">
      Loading products...
    </div>
    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <!-- Filter Sidebar -->
        <div class="bg-white p-6 border border-gray-200 rounded-2xl shadow h-fit lg:sticky lg:top-6">

          <h2 class="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

          <!-- Category -->
          <div class="mb-6">
            <h3 class="text-gray-700 font-medium mb-2">Category</h3>
            <div class="flex flex-col gap-2 text-sm text-gray-600">
              <label v-for="c in categories" :key="c">
                <input type="checkbox" :value="c" v-model="filters.category" class="mr-2" /> {{ c }}
              </label>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <h3 class="text-gray-700 font-medium mb-2">Price</h3>
            <div class="flex flex-col gap-2 text-sm text-gray-600">
              <label><input type="checkbox" value="under-100" v-model="filters.price" class="mr-2" /> Under $100</label>
              <label><input type="checkbox" value="100-500" v-model="filters.price" class="mr-2" /> $100 - $500</label>
              <label><input type="checkbox" value="500-1000" v-model="filters.price" class="mr-2" /> $500 - $1000</label>
              <label><input type="checkbox" value="above-1000" v-model="filters.price" class="mr-2" /> Above $1000</label>
            </div>
          </div>

          <!-- Rating -->
          <div>
            <h3 class="text-gray-700 font-medium mb-2">Rating</h3>
            <div class="flex flex-col gap-2 text-sm text-gray-600">
              <label><input type="checkbox" value="4" v-model="filters.rating" class="mr-2" /> 4★ & above</label>
              <label><input type="checkbox" value="3" v-model="filters.rating" class="mr-2" /> 3★ & above</label>
              <label><input type="checkbox" value="2" v-model="filters.rating" class="mr-2" /> 2★ & above</label>
              <label><input type="checkbox" value="1" v-model="filters.rating" class="mr-2" /> All Ratings</label>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="flex flex-col bg-white p-4 rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all"
          >
            <NuxtLink
              :to="`/products/${product.id}`"
              class="block hover:cursor-pointer"
            >
              <img :src="product.thumbnail" alt="product image" class="w-full h-48 object-cover rounded-xl mb-4" />
              <h2 class="text-lg font-semibold text-gray-800 truncate hover:underline">
                {{ product.title }}
              </h2>
              <p class="text-gray-500 text-sm mb-2">{{ product.brand }}</p>
              <p class="text-green-600 font-bold text-lg mb-2">${{ product.price }}</p>
            </NuxtLink>

            <button
              @click.stop.prevent="addToCart(product)"
              class="mt-auto w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2 mt-12">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-4 py-2 rounded-lg border',
            page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// Filters & Pagination
const filters = ref({
  category: route.query.category ? route.query.category.split(',') : [],
  price: route.query.price ? route.query.price.split(',') : [],
  rating: route.query.rating ? route.query.rating.split(',') : []
})
const currentPage = ref(1)

watchEffect(() => {
  const pageFromRoute = parseInt(route.query.page) || 1
  if (currentPage.value !== pageFromRoute) {
    currentPage.value = pageFromRoute
  }
})

const searchQuery = ref(route.query.search || '')
const limit = 9
const categories = ['furniture', 'laptops', 'fragrances', 'skincare', 'groceries', 'beauty']

// Fetch products
const { data: products, pending, error } = await useFetch('https://dummyjson.com/products?limit=100')

// Filtering logic
const filteredProducts = computed(() => {
  if (!products.value) return []

  return products.value.products.filter((product) => {
    const matchSearch = !searchQuery.value || product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = filters.value.category.length === 0 || filters.value.category.includes(product.category)
    const matchPrice =
      filters.value.price.length === 0 ||
      filters.value.price.some((range) => {
        if (range === 'under-100') return product.price < 100
        if (range === '100-500') return product.price >= 100 && product.price <= 500
        if (range === '500-1000') return product.price > 500 && product.price <= 1000
        if (range === 'above-1000') return product.price > 1000
      })
    const matchRating =
      filters.value.rating.length === 0 ||
      filters.value.rating.some((rating) => product.rating >= parseInt(rating))

    return matchSearch && matchCategory && matchPrice && matchRating
  })
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / limit))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * limit
  return filteredProducts.value.slice(start, start + limit)
})

// Pagination
function goToPage(page) {
  router.push({
    path: '/shop',
    query: {
      category: filters.value.category.join(','),
      price: filters.value.price.join(','),
      rating: filters.value.rating.join(','),
      page: page.toString(),
      ...(searchQuery.value && { search: searchQuery.value })
    }
  })
}


// Update route query
function updateRoute() {
  router.push({
    path: '/shop',
    query: {
      category: filters.value.category.join(','),
      price: filters.value.price.join(','),
      rating: filters.value.rating.join(','),
      page: currentPage.value.toString(),
      ...(searchQuery.value && { search: searchQuery.value })
    }
  })
}

// Watchers
watch(
  filters,
  () => {
    if (currentPage.value !== 1) {
      currentPage.value = 1
    } else {
      updateRoute()
    }
  },
  { deep: true }
)

watch(currentPage, updateRoute)

watch(
  () => route.fullPath,
  () => {
    filters.value.category = route.query.category ? route.query.category.split(',') : []
    filters.value.price = route.query.price ? route.query.price.split(',') : []
    filters.value.rating = route.query.rating ? route.query.rating.split(',') : []
    searchQuery.value = route.query.search || ''
    const newPage = parseInt(route.query.page) || 1
    if (newPage !== currentPage.value) {
      currentPage.value = newPage
    }
  },
  { immediate: true }
)

// Add to cart
function addToCart(product) {
  cartStore.addToCart(product)
}
</script>
