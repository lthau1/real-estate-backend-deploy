<template>
  <header class="relative w-full bg-white">
    <div class="mx-auto flex min-h-[72px] w-full max-w-[1296px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <RouterLink to="/" class="flex shrink-0 items-center gap-1.5">
        <Home class="h-6 w-6 text-navy" />
        <span class="font-gantari text-base font-semibold text-navy">Real Estate</span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav aria-label="Main navigation" class="hidden flex-1 items-center justify-center md:flex">
        <ul class="flex items-center gap-6">
          <li v-for="link in navLinks" :key="link.label">
            <RouterLink
              :to="link.to"
              class="font-gantari text-base font-medium text-navy border-b-2 pb-1 transition-colors"
              :class="isActive(link.to) ? 'border-navy font-bold' : 'border-transparent hover:border-navy/40'"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Utility items -->
      <div class="hidden items-center gap-6 md:flex">
        <a href="/login" class="flex items-center gap-2 font-gantari text-base font-medium text-navy hover:opacity-70 transition-opacity">
          <User class="h-5 w-5" />
          <span>Login</span>
        </a>
        <a href="tel:2573886895" class="flex items-center gap-2 font-gantari text-base font-medium text-navy hover:opacity-70 transition-opacity">
          <Phone class="h-5 w-5" />
          <span>(257) 388-6895</span>
        </a>
      </div>

      <!-- Mobile menu button -->
      <button
        class="flex items-center md:hidden"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <X v-if="mobileOpen" class="h-6 w-6 text-navy" />
        <Menu v-else class="h-6 w-6 text-navy" />
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="absolute left-0 top-full z-50 w-full bg-white shadow-lg md:hidden">
      <ul class="flex flex-col px-4 py-4 gap-4">
        <li v-for="link in navLinks" :key="link.label">
          <RouterLink
            :to="link.to"
            class="font-gantari text-base font-medium text-navy block py-1"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </li>
        <li>
          <a href="/login" class="flex items-center gap-2 font-gantari text-base font-medium text-navy">
            <User class="h-5 w-5" />Login
          </a>
        </li>
        <li>
          <a href="tel:2573886895" class="flex items-center gap-2 font-gantari text-base font-medium text-navy">
            <Phone class="h-5 w-5" />(257) 388-6895
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Home, User, Phone, Menu, X } from 'lucide-vue-next';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Property', to: '/property' },
  { label: 'About us', to: '/about' },
  { label: 'Contact us', to: '/contact' },
];

const route = useRoute();
const mobileOpen = ref(false);

function isActive(path: string) {
  return route.path === path;
}
</script>
