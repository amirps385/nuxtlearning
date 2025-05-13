<template>
  <div>
    <UApp>
      <NuxtLayout>
        <About /> <!-- This will always appear at the top of the page -->
        <NuxtPage />
        
        <!-- Conditionally Render Components Based on the Route -->
        <Carou v-if="isHomePage" />
        <Featured v-if="isHomePage" />
        <tempting v-if="isHomePage" />
        <Products v-if="isHomePage" />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Check if the current route is the home page
const route = useRoute()
const isHomePage = route.path === '/' // Adjust based on your home route, e.g., '/' or '/home'

</script>
