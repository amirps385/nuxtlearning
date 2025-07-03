<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Signup</h2>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-gray-700">Name</label>
            <input v-model="name" type="text" required class="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-gray-700">Email</label>
            <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-gray-700">Password</label>
            <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-md" />
          </div>
          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
          <div v-if="success" class="text-green-600 text-sm">{{ success }}</div>
          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Signup
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const success = ref('')
  const router = useRouter()
  
  async function handleSignup() {
    error.value = ''
    success.value = ''
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
        headers: { 'Content-Type': 'application/json' },
      })
  
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Signup failed')
      success.value = 'Signup successful! Redirecting...'
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  