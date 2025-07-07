// middleware/auth.global.ts
import { useAuthStore } from '@/store/auth' // ✅ make sure this path is correct

// middleware/auth.ts not the auth.global.ts
export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  if (!authStore.user) {
    return navigateTo('/login')
  }
})
