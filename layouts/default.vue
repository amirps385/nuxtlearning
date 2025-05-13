<template>
  <div>
    <!-- Splash Screen -->
    <SplashScreen v-if="isLoading" />

    <!-- Main Content -->
    <div v-else class="min-h-screen bg-gray-50">
      <Navbar />
      <main class="container mx-auto px-4 py-8">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import SplashScreen from "~/components/SplashScreen.vue"; // Import the SplashScreen component

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); // Adjust time as needed
});
</script>
