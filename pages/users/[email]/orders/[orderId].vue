<template>
  <div class="max-w-3xl mx-auto p-6 mt-5">
    <h1 class="text-3xl font-bold text-green-600 mb-4"> Thank you for your order, {{ email }}!</h1>

    <div v-if="order">
      <p class="text-lg mb-2">Here’s a summary of your order:</p>

      <div class="border p-4 rounded shadow mb-6">
        <p><strong>Order ID:</strong> {{ orderId }}</p>
        <p><strong>Total:</strong> ${{ order.total }}</p>
        <p><strong>Payment Method:</strong> {{ order.paymentMethod }}</p>
        <p><strong>Shipping Address:</strong> {{ order.address }}</p>
        <p><strong>Date:</strong> {{ formatDate(order.createdAt) }}</p>
      </div>

      <h2 class="text-xl font-semibold mb-2">Items Purchased:</h2>
      <div class="space-y-4">
        <div
          v-for="item in order.items"
          :key="item.productId"
          class="flex items-center border rounded p-4 gap-4"
        >
          <img :src="item.image" alt="item image" class="w-16 h-16 object-cover rounded" />
          <div>
            <p class="font-medium">{{ item.title }}</p>
            <p class="text-sm">Qty: {{ item.quantity }} — ${{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-red-500 font-semibold">
      ❌ Order not found.
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const email = route.params.email
const orderId = route.params.orderId

const order = ref(null)

onMounted(async () => {
  const { data } = await useFetch('/api/orders/get-single', {
    method: 'POST',
    body: { email, orderId }
  })

  if (data.value?.order) {
    order.value = data.value.order
  }
})

function formatDate(date) {
  return new Date(date).toLocaleString()
}
</script>
