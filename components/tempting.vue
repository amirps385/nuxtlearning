<script setup>
const banners = [
    { image: "/img/temptingimg/banner-1.png" , heading1:"Everyday Fresh & " , heading2:"Clean with Our Products" },
    { image: "/img/temptingimg/banner-2.png" , heading1:"Make your Breakfast" , heading2:"Healthy and Easy"},
    { image: "/img/temptingimg/banner-3.png" , heading1:"The best Organic " , heading2:"Products Online"},
];
</script>

<template>
    <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(banner, index) in banners" :key="index"
                class="h-64 w-full bg-cover bg-center bg-no-repeat flex items-start justify-start p-6 text-black-100 text-2xl font-bold rounded-lg"
                :style="{ backgroundImage: `url(${banner.image})` }">
                <!-- Text & Button Wrapper -->
                <div>
                    <h1 class="mb-2">{{ banner.heading1 }} <br> {{ banner.heading2 }} </h1>
                    <button
                        class="mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-400 transition">
                        Shop Now →
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
