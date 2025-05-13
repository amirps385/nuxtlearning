<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <!-- Cart Items -->
    <div v-if="cartItems.length && !showCheckout" class="space-y-6">
      <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center p-4 border rounded-lg">
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

    <!-- No items in cart -->
    <div v-else-if="!cartItems.length && !showCheckout">
      <p>Your cart is empty.</p>
    </div>

    <!-- Total and Checkout Button -->
    <div v-if="cartItems.length && !showCheckout" class="mt-6 text-right">
      <p class="text-lg font-bold">Total: ${{ totalPrice.toFixed(2) }}</p>
      <button @click="showCheckout = true" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-4">
        Proceed to Checkout
      </button>
    </div>

    <!-- Checkout Form -->
    <div v-if="showCheckout" class="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 class="text-2xl font-bold mb-4">Checkout</h2>

      <input v-model="form.name" type="text" placeholder="Full Name" class="w-full border px-4 py-2 rounded" />
      <input v-model="form.email" type="email" placeholder="Email" class="w-full border px-4 py-2 rounded" />
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

      <!-- Card Details (conditionally shown) -->
      <div v-if="form.paymentMethod === 'card'" class="mt-4 space-y-2">
        <input v-model="form.cardNumber" type="text" placeholder="Card Number" class="w-full border px-4 py-2 rounded" />
        <div class="flex gap-4">
          <input v-model="form.expiry" type="text" placeholder="MM/YY" class="w-full border px-4 py-2 rounded" />
          <input v-model="form.cvc" type="text" placeholder="CVC" class="w-full border px-4 py-2 rounded" />
        </div>
      </div>

      <p class="text-right font-bold mt-2">Total: ${{ totalPrice.toFixed(2) }}</p>

      <!-- Submit Order -->
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
import { useCartStore } from '@/store/cart'

// Cart store logic
const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cart)
const totalPrice = computed(() => cartStore.totalPrice)

const increaseQuantity = (id) => cartStore.addToCart(cartItems.value.find(item => item.id === id))
const decreaseQuantity = (id) => cartStore.decreaseQuantity(id)
const removeFromCart = (id) => cartStore.removeFromCart(id)

// Checkout form states
const showCheckout = ref(false)
const orderPlaced = ref(false)

const form = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  paymentMethod: 'cod',
  cardNumber: '',
  expiry: '',
  cvc: ''
})

// Basic form validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function placeOrder() {
  const { name, email, address, city, zip, paymentMethod, cardNumber, expiry, cvc } = form.value

  // Basic validation
  if (!name || !email || !address || !city || !zip || !paymentMethod) {
    alert('Please fill in all required fields.')
    return
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.')
    return
  }

  if (paymentMethod === 'card') {
    if (!cardNumber || !expiry || !cvc) {
      alert('Please fill in all card details.')
      return
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert('Card number must be 16 digits.')
      return
    }
    if (!/^\d{3}$/.test(cvc)) {
      alert('CVC must be 3 digits.')
      return
    }
  }

  // Simulate order placement
  orderPlaced.value = true
  cartStore.clearCart()
}
</script>
