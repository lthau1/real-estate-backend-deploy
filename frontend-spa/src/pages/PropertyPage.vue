<template>
  <main>
    <Hero />
    <PropertyGrid :filters="activeFilters" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Hero from '../components/Hero.vue';
import PropertyGrid from '../components/PropertyGrid.vue';
import type { PropertyFilters } from '../composables/useApi';

const route = useRoute();

// Read filter state from URL query params so filters survive refresh
const activeFilters = computed<PropertyFilters>(() => ({
  category: (route.query.category as string) || undefined,
  type: (route.query.type as string) || undefined,
  location: (route.query.location as string) || undefined,
  page: route.query.page ? Number(route.query.page) : 1,
  limit: 12,
}));
</script>
