// store/auth.ts
import { defineStore } from 'pinia'
import { useCartStore } from './cart'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { name: string; email: string },
    token: null as null | string
  }),

  actions: {
    login(user: { name: string; email: string }, token: string, cart: any[] = []) {
      this.user = user
      this.token = token

      // ✅ Save user & token in localStorage (browser only)
      if (process.client) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }

      // ✅ Also initialize cart from server
      const cartStore = useCartStore()
      cartStore.setCart(cart) // cart must be returned from login API
    },

    logout() {
      this.user = null
      this.token = null

      const cartStore = useCartStore()
      cartStore.clearCart()

      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },

    initialize() {
      if (process.client) {
        const savedToken = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')

        if (savedToken && savedUser) {
          this.token = savedToken
          this.user = JSON.parse(savedUser)
        }
      }
    }
  }
})
