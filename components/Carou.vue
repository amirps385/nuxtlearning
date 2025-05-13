<script setup lang="ts">
const items = [
  {
    image: '/img/slider/slider-1.png',
    title: "Don't miss amazing ",
    title2: "grocery deals",
    description: "Sign up for the daily newsletter and save big!",
  },
  {
    image: '/img/slider/slider-2.png',
    title: "Fresh vegetables",
    title2: "Big discount",
    description: "Order now and get free delivery on your first purchase!",
  }
];
</script>

<template>
  <div class="flex justify-center items-center mt-10">
    <UCarousel 
      v-slot="{ item }" 
      dots 
      :items="items"
      class="relative w-full h-[600px]"
    >
      <div class="relative w-full h-[600px]">
        <!-- Text & Form (Different for Each Slide) -->
        <div class="absolute inset-0 flex items-center justify-start px-20">
          <div class="text-left">
            <h1 class="text-5xl text-red-900 font-bold mb-10 leading-tight">
              {{ item.title }} <br />
              {{ item.title2 }}
            </h1>   
            <p class="text-xl mb-16 text-amber-700">{{ item.description }}</p>
            <form class="flex gap-2 max-w-lg">
              <input 
                type="email" 
                placeholder="Your email address"
                class="flex-1 px-4 py-3 rounded-lg border border-gray-900  focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              />
              <button 
                type="submit"
                class="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Background Image -->
        <img :src="item.image" class="rounded-lg w-full h-full object-cover">
      </div>
    </UCarousel>
  </div>
</template>
