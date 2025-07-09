// store/cart.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // STATE
  const cart = ref([])

  // GETTERS
  const cartCount = computed(() =>
    cart.value.reduce((count, item) => count + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  // ACTIONS
  function addToCart(product) {
    const existing = cart.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1, price: Number(product.price) })
    }
  }

  function removeFromCart(productId) {
    const index = cart.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  function decreaseQuantity(productId) {
    const item = cart.value.find(item => item.id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
    } else {
      removeFromCart(productId)
    }
  }

  function clearCart() {
    cart.value = []
  }

  function setCart(items) {
    cart.value = items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
      price: Number(item.price)
    }))
  }

  // Return all state, getters, and actions
  return {
    cart,
    cartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    setCart
  }
})
