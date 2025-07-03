<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">My Orders</h1>
    <div v-if="orders.length === 0">No orders found.</div>

    <div v-for="order in orders" :key="order._id" class="border p-4 rounded mb-6">
      <p class="font-semibold">Total: ${{ order.total }}</p>
      <p class="text-sm text-gray-500">Date: {{ formatDate(order.date) }}</p>
      <p class="text-sm mb-2">Address: {{ order.address }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
          <img :src="item.thumbnail" class="w-16 h-16 object-cover rounded" />
          <div>
            <h3 class="font-medium">{{ item.title }}</h3>
            <p class="text-sm">Qty: {{ item.quantity }} — ${{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'

const orders = ref([])
const authStore = useAuthStore()

onMounted(async () => {
  const { data } = await useFetch('/api/orders/get', {
    method: 'POST',
    body: { email: authStore.user.email }
  })

  if (data.value?.orders) {
    orders.value = data.value.orders.reverse()
  }
})

function formatDate(date) {
  return new Date(date).toLocaleString()
}
</script>
