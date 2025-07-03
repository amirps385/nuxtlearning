<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-md" />
        </div>
        <div>
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-md" />
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  error.value = ''

  try {
    const { data, error: fetchError } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (fetchError.value) {
      error.value = fetchError.value.statusMessage || 'Invalid credentials'
      return
    }

    // Save user and token to store
    authStore.login(data.value.user, data.value.token)

    // ✅ Redirect to home page
    router.push('/')
  } catch (err) {
    error.value = 'Something went wrong. Please try again.'
  }
}
</script>
