<template>
  <div class="p-6 max-w-7xl mx-auto pt-24">
    <!-- Main Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <!-- Image Section -->
      <div>
        <img
          src="/public/img/about/about1.png"
          alt="About Us"
          class="rounded-lg shadow-md"
        />
      </div>

      <!-- Text Section -->
      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-6">Welcome to Nest</h1>
        <p class="text-lg text-gray-700 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.
        </p>
        <p class="text-lg text-gray-700 leading-relaxed">
          Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta et Ut placerat legendos interpre. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante Etiam sit amet orci eget. Quis commodo odio aenean sed adipiscing. Turpis massa tincidunt dui ut ornare lectus. Auctor elit sed vulputate mi sit amet. Commodo consequat. Duis aute irure dolor in reprehenderit in voluptate id est laborum.
        </p>
      </div>
    </div>

    <!-- Image Carousel Section -->
    <div class="relative mt-8">
      <!-- Left Arrow -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Carousel Container -->
      <div class="flex overflow-hidden">
        <!-- Carousel Images (3 images at a time) -->
        <div
          class="flex transition-transform duration-300"
          :style="carouselStyle"
        >
          <div v-for="(img, index) in images" :key="index" class="flex-shrink-0 w-1/3 px-2">
            <img
              :src="img.src"
              :alt="img.alt"
              class="rounded-lg shadow-md object-cover w-full h-56"
            />
          </div>
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="border rounded-lg p-6 text-center hover:shadow-lg transition"
      >
        <img
          :src="feature.icon"
          alt="Feature Icon"
          class="mx-auto mb-6 h-16"
        />
        <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ feature.title }}</h3>
        <p class="text-gray-600 mb-6">
          {{ feature.description }}
        </p>
        <a href="#" class="text-green-500 font-medium hover:underline">
          Read more
        </a>
      </div>
    </div>
  </div>

  <section class="px-6 py-12 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <!-- Image Section -->
      <div class="flex flex-col md:flex-row gap-6 md:w-1/2">
        <img
          src="/img/about/p1.png"
          alt="Working Desk"
          class="rounded-xl w-full md:w-1/2 object-cover h-64"
        />
        <img
          src="/img/about/p2.png"
          alt="Online Shopping"
          class="rounded-xl w-full md:w-1/2 object-cover h-64"
        />
      </div>

      <!-- Text Content -->
      <div class="md:w-1/2 text-center md:text-left">
        <p class="text-gray-400 text-sm font-medium mb-2">Our performance</p>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Your Partner for e-commerce grocery solution
        </h2>
        <p class="text-gray-600 mb-4">
          Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
        </p>
        <p class="text-gray-600">
          Pitatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
          voluptas sit aspernatur aut odit aut fugit, sed quia
        </p>
      </div>
    </div>
  </section>

  <section class="bg-white py-16 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
      <!-- Who we are -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Who we are</h3>
        <p class="text-gray-600">
          Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in. 
          ellus eros donec ac odio orci ultrices in.
        </p>
      </div>

      <!-- Our history -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Our history</h3>
        <p class="text-gray-600">
          Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in. 
          ellus eros donec ac odio orci ultrices in.
        </p>
      </div>

      <!-- Our mission -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Our mission</h3>
        <p class="text-gray-600">
          Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in. 
          ellus eros donec ac odio orci ultrices in.
        </p>
      </div>
    </div>
  </section>


  <section class="container mx-auto px-4 md:px-8 py-12">
    <div class="bg-green-200 rounded-2xl shadow-md py-20 px-4 md:px-10">
      <div class="flex flex-wrap justify-around text-center gap-y-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          v-intersect="() => startCount(index)"
        >
          <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900">
            {{ stat.current }}<span class="text-primary">+</span>
          </h2>
          <p class="mt-2 text-base md:text-lg font-medium text-gray-600">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>


  <section class="py-16 px-4 md:px-10 lg:px-20 bg-white">
  <!-- Heading -->
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800">Our Team</h2>
    <img src="/public/img/about/wave.png" alt="decor" class="mx-auto mb-2 w-34" />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-12">
    <!-- Left text content -->
    <div class="md:col-span-1">
      <p class="text-sm text-green-600 font-semibold uppercase">Our Team</p>
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h3>
      <p class="text-gray-600 mb-4">
        Proin ullamcorper pretium orci. Donec necsele risque leo. Nam massa dolor imperdiet neccon sequata congue idsem.
        Maecenas malesuada faucibus finibus.
      </p>
      <p class="text-gray-600 mb-6">
        Proin ullamcorper pretium orci. Donec necsele risque leo. Nam massa dolor imperdiet neccon sequata congue idsem.
        Maecenas malesuada faucibus finibus.
      </p>
      <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded">
        View All Members
      </button>
    </div>

    <!-- Team Member 1 -->
    <div class="bg-gray-100 rounded-xl overflow-hidden text-center shadow-md">
      <img src="/public/img/about/g1.png" alt="H. Merinda" class="w-full object-cover" />
      <div class="bg-white py-4">
        <h4 class="text-xl font-semibold text-gray-900">H. Merinda</h4>
        <p class="text-sm text-gray-500">CEO & Co-Founder</p>
        <div class="flex justify-center gap-4 mt-3 text-green-600 text-lg">
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-youtube"></i>
        </div>
      </div>
    </div>

    <!-- Team Member 2 -->
    <div class="bg-gray-100 rounded-xl overflow-hidden text-center shadow-md">
      <img src="/public/img/about/g2.png" alt="Dilan Specter" class="w-full object-cover" />
      <div class="bg-white py-4">
        <h4 class="text-xl font-semibold text-gray-900">Dilan Specter</h4>
        <p class="text-sm text-gray-500">Head Engineer</p>
        <div class="flex justify-center gap-4 mt-3 text-green-600 text-lg">
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-youtube"></i>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { ref } from 'vue';

// Image data
const images = [
  { src: '/img/about/about2.png', alt: 'Image 1' },
  { src: '/img/about/about3.png', alt: 'Image 2' },
  { src: '/img/about/about4.png', alt: 'Image 3' },
  { src: '/img/about/about2.png', alt: 'Image 4' },
  { src: '/img/about/about3.png', alt: 'Image 5' },
];

// State for current slide index (this will control which images to display)
const currentSlide = ref(0);

// Function to go to the previous slide
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + images.length) % images.length;
};

// Function to go to the next slide
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.length;
};

// Computed style for carousel to scroll
const carouselStyle = computed(() => {
  return {
    transform: `translateX(-${currentSlide.value * 33.33}%)`,
  };
});

const features = [
  {
    icon: "/img/about/icon-1.svg", // replace with your actual icon paths
    title: "Best Prices & Offers",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
  {
    icon: "/img/about/icon-2.svg",
    title: "Wide Assortment",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
  {
    icon: "/img/about/icon-3.svg",
    title: "Free Delivery",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
  {
    icon: "/img/about/icon-4.svg",
    title: "Easy Returns",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
  {
    icon: "/img/about/icon-5.svg",
    title: "100% Satisfaction",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
  {
    icon: "/img/about/icon-6.svg",
    title: "Great Daily Deal",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  },
];

const stats = ref([
  { label: 'Glorious years', target: 12, current: 0 },
  { label: 'Happy customers', target: 36, current: 0 },
  { label: 'Organic farms', target: 57, current: 0 },
  { label: 'Team advisor', target: 24, current: 0 },
  { label: 'Products Sale', target: 26000, current: 25900 }
])

const startCount = (index) => {
  const item = stats.value[index]
  if (item.current >= item.target) return

  const interval = setInterval(() => {
    if (item.current < item.target) {
      item.current++
    } else {
      clearInterval(interval)
    }
  }, 40)
}
</script>

<style scoped>
/* Custom styles for carousel arrows */
button {
  z-index: 10;
}

/* Image style */
img {
  transition: transform 0.3s ease;
}

/* Hover effect on image */
img:hover {
  transform: scale(1.05);
}





</style>
