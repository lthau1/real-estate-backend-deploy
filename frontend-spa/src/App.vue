<template>
  <div class="relative w-full bg-white">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
</script>
