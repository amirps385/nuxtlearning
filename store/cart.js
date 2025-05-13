import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),

  getters: {
    cartCount: (state) => state.cart.reduce((count, item) => count + item.quantity, 0),
    totalPrice: (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  actions: {
    addToCart(product) {
      const existing = this.cart.find(item => item.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        // Ensuring price is a number
        this.cart.push({ ...product, quantity: 1, price: Number(product.price) })
      }
    },

    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.cart.splice(index, 1)
      }
    },

    decreaseQuantity(productId) {
      const item = this.cart.find(item => item.id === productId)
      if (item && item.quantity > 1) {
        item.quantity--
      } else {
        this.removeFromCart(productId)
      }
    },

    clearCart() {
      this.cart = []
    }
  }
})
