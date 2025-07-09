<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <!-- Cart Items -->
    <div v-if="cartItems.length && !showCheckout" class="space-y-6">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex justify-between items-center p-4 border rounded-lg"
      >
        <div class="flex items-center space-x-4">
          <img :src="item.thumbnail" alt="product image" class="w-16 h-16 object-cover rounded-lg" />
          <div>
            <h2 class="font-semibold">{{ item.title }}</h2>
            <p class="text-gray-500 text-sm">{{ item.brand }}</p>
            <p class="text-green-600 font-bold">${{ item.price }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="decreaseQuantity(item.id)" class="bg-gray-200 px-2 py-1 rounded-md">-</button>
          <span class="font-semibold">{{ item.quantity }}</span>
          <button @click="increaseQuantity(item.id)" class="bg-gray-200 px-2 py-1 rounded-md">+</button>
          <button @click="removeFromCart(item.id)" class="bg-red-500 text-white px-4 py-2 rounded-md">Remove</button>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else-if="!cartItems.length && !showCheckout">
      <p>Your cart is empty.</p>
    </div>

    <!-- Total and Proceed to Checkout -->
    <div v-if="cartItems.length && !showCheckout" class="mt-6 text-right">
      <p class="text-lg font-bold">Total: ${{ totalPrice.toFixed(2) }}</p>
      <button
        @click="showCheckout = true"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4"
      >
        Proceed to Checkout
      </button>
    </div>

    <!-- Checkout Form -->
    <div v-if="showCheckout" class="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 class="text-2xl font-bold mb-4">Checkout</h2>

      <input v-model="form.address" type="text" placeholder="Shipping Address" class="w-full border px-4 py-2 rounded" />
      <div class="flex gap-4">
        <input v-model="form.city" type="text" placeholder="City" class="w-full border px-4 py-2 rounded" />
        <input v-model="form.zip" type="text" placeholder="ZIP Code" class="w-full border px-4 py-2 rounded" />
      </div>

      <!-- Payment Method -->
      <div class="mt-4">
        <label class="font-semibold block mb-2">Payment Method:</label>
        <div class="flex space-x-4">
          <label class="flex items-center space-x-2">
            <input type="radio" value="cod" v-model="form.paymentMethod" />
            <span>Cash on Delivery</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="radio" value="card" v-model="form.paymentMethod" />
            <span>Debit/Credit Card</span>
          </label>
        </div>
      </div>

      <!-- Card Info -->
      <div v-if="form.paymentMethod === 'card'" class="mt-4 space-y-2">
        <input v-model="form.cardNumber" type="text" placeholder="Card Number" class="w-full border px-4 py-2 rounded" />
        <div class="flex gap-4">
          <input v-model="form.expiry" type="text" placeholder="MM/YY" class="w-full border px-4 py-2 rounded" />
          <input v-model="form.cvc" type="text" placeholder="CVC" class="w-full border px-4 py-2 rounded" />
        </div>
      </div>

      <p class="text-right font-bold mt-2">Total: ${{ totalPrice.toFixed(2) }}</p>

      <button @click="placeOrder" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Place Order
      </button>

      <!-- Success Message -->
      <div v-if="orderPlaced" class="mt-4 text-green-600 font-semibold text-center">
        ✅ Your order has been placed successfully!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const cartItems = computed(() => cartStore.cart)
const totalPrice = computed(() => cartStore.totalPrice)

const showCheckout = ref(false)
const orderPlaced = ref(false)

const form = ref({
  address: '',
  city: '',
  zip: '',
  paymentMethod: 'cod',
  cardNumber: '',
  expiry: '',
  cvc: ''
})

// Cart functions
const increaseQuantity = (id) => cartStore.addToCart(cartItems.value.find(i => i.id === id))
const decreaseQuantity = (id) => cartStore.decreaseQuantity(id)
const removeFromCart = (id) => cartStore.removeFromCart(id)

// Validate form
function isValidForm() {
  const { address, city, zip, paymentMethod, cardNumber, expiry, cvc } = form.value
  if (!address || !city || !zip) return false

  if (paymentMethod === 'card') {
    return (
      /^\d{16}$/.test(cardNumber) &&
      /^\d{3}$/.test(cvc) &&
      expiry.trim() !== ''
    )
  }

  return true
}

// ✅ Place Order
async function placeOrder() {
  if (!authStore.user) {
    alert('You must be logged in to place an order.')
    return
  }

  if (!isValidForm()) {
    alert('Please fill in all required fields.')
    return
  }

  const orderData = {
    email: authStore.user.email,
    items: cartItems.value.map(item => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.thumbnail
    })),
    total: totalPrice.value,
    address: `${form.value.address}, ${form.value.city}, ${form.value.zip}`,
    paymentMethod: form.value.paymentMethod
  }

  const { data, error } = await useFetch('/api/orders/place', {
    method: 'POST',
    body: orderData
  })

  if (error.value || !data.value?.orderId) {
    alert('Failed to place order.')
    return
  }

  const newOrderId = data.value.orderId

  orderPlaced.value = true
  cartStore.clearCart()

  // ✅ Redirect to Thank You Page
  router.push(`/users/${authStore.user.email}/orders/${newOrderId}`)
}
</script>
