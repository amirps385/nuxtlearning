<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage :key="route.fullPath" />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

// Reactive route reference (for layout/page switching if needed)
const route = useRoute()



const auth = useAuthStore()
auth.initialize()


</script>
