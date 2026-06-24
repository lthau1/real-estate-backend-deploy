<template>
  <section class="w-full px-4 py-10 sm:px-6 lg:px-[72px]">
    <div class="mx-auto w-full max-w-[1344px] flex flex-col gap-6">

      <!-- Result count -->
      <p v-if="!isLoading && data" class="font-inter text-sm text-gray-500">
        Found {{ data.pagination.total }} {{ data.pagination.total === 1 ? 'property' : 'properties' }}
      </p>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="n in 6"
          :key="n"
          class="h-[340px] animate-pulse rounded-[12px] bg-gray-200"
        />
      </div>

      <!-- Error state -->
      <div v-else-if="isError" class="flex items-center justify-center py-16 text-red-500 font-inter text-sm">
        Failed to load properties. Please try again later.
      </div>

      <!-- Empty state -->
      <div v-else-if="properties.length === 0" class="flex items-center justify-center py-16 text-gray-500 font-inter text-sm">
        No properties found matching your search.
      </div>

      <!-- Grid -->
      <div v-else class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :property="property"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PropertyCard from './PropertyCard.vue';
import { useProperties } from '../composables/useApi';
import type { PropertyFilters } from '../composables/useApi';

const props = withDefaults(defineProps<{
  filters?: PropertyFilters;
}>(), {
  filters: () => ({}),
});

const { data, isLoading, isError } = useProperties(() => props.filters);

const properties = computed(() => data.value?.properties ?? []);
</script>
