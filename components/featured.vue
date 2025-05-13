<script setup>
const categories = [
  { name: "Vegetables", image: "/img/featureimg/cat-1.png", items: 54, bg: "bg-red-100" },
  { name: "Strawberries", image: "/img/featureimg/cat-2.png", items: 56, bg: "bg-yellow-100" },
  { name: "Snacks", image: "/img/featureimg/cat-3.png", items: 72, bg: "bg-green-100" },
  { name: "Black Plum", image: "/img/featureimg/cat-4.png", items: 36, bg: "bg-pink-100" },
  { name: "Custard Apple", image: "/img/featureimg/cat-5.png", items: 123, bg: "bg-purple-100" },
  { name: "Grapes", image: "/img/featureimg/cat-6.png", items: 34, bg: "bg-yellow-100" },
  { name: "Oranges", image: "/img/featureimg/cat-7.png", items: 89, bg: "bg-orange-100" },
  { name: "Red Apples", image: "/img/featureimg/cat-9.png", items: 26, bg: "bg-yellow-100" },
  { name: "Organic Kiwi", image: "/img/featureimg/cat-11.png", items: 28, bg: "bg-green-100" },
  { name: "Organic Kiwi", image: "/img/featureimg/cat-12.png", items: 28, bg: "bg-green-100" },
];

const scrollLeft = () => {
  document.getElementById("scrollContainer").scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = () => {
  document.getElementById("scrollContainer").scrollBy({ left: 300, behavior: "smooth" });
};
</script>

<template>
  <div class="px-6 py-8">
    <!-- ✅ Section Heading -->
    <div class="flex flex-col items-center justify-center text-center py-10">
      <h1 class="text-3xl font-bold mb-2 text-black">Featured Categories</h1>
      <h2 class="text-green-500 text-m md:text-lg">Browse our wonderful range of products.</h2>
    </div>

    <!-- ✅ Scrollable Category List -->
    <div class="relative">
      <!-- Left Scroll Button -->
      <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow rounded-full z-10">
        ⬅️
      </button>

      <!-- Scrollable Container -->
      <div id="scrollContainer" class="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="flex flex-col items-center p-5 rounded-xl shadow-md transition hover:scale-105 min-w-[160px]"
          :class="category.bg"
        >
          <img :src="category.image" alt="" class="w-20 h-20 mb-2" />
          <h3 class="text-lg font-bold text-gray-800">{{ category.name }}</h3>
          <p class="text-gray-500 text-sm">{{ category.items }} items</p>
        </div>
      </div>

      <!-- Right Scroll Button -->
      <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow rounded-full z-10">
        ➡️
      </button>
    </div>
  </div>
</template>

<style>
/* ✅ Hide Scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
