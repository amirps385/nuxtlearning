<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Optional: Add a back button or navigation bar here -->
    <header class="bg-white shadow">
      <div class="max-w-6xl mx-auto py-4 px-6">
        <NuxtLink to="/" class="text-xl font-bold text-green-600">Organic<span class="text-green-400">Life</span></NuxtLink>
      </div>
    </header>

    <!-- Page Content -->
    <main class="py-6">
      <slot />
    </main>

    <!-- Optional Footer -->
    <footer class="text-center text-sm text-gray-500 py-4">
      © {{ new Date().getFullYear() }} OrganicLife. All rights reserved.
    </footer>
  </div>
</template>
