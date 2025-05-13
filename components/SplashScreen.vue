<template>
    <div v-if="isLoading" class="splash-screen">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const isLoading = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 2000); // Adjust time as needed
  });
  </script>
  
  <style scoped>
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #1a1a1a;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 9999;
    transition: opacity 0.5s ease-out;
  }
  
  .loader {
    width: 50px;
    height: 50px;
    border: 5px solid #fff;
    border-top: 5px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  