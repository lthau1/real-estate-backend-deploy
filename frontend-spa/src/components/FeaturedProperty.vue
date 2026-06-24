<template>
  <section class="w-full px-4 py-14 sm:px-6 lg:px-[72px]">
    <div class="mx-auto flex w-full max-w-[1344px] flex-col items-center gap-10">
      <header class="flex flex-col items-center gap-4 text-center">
        <h2 class="font-gantari text-[32px] font-bold leading-tight text-navy sm:text-[40px] lg:text-[50px]">
          Discover your featured property
        </h2>
        <p class="max-w-[540px] font-inter text-base font-normal leading-relaxed text-black">
          Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
        </p>
      </header>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="n in 3"
          :key="n"
          class="h-[340px] animate-pulse rounded-[12px] bg-gray-200"
        />
      </div>

      <!-- Error state -->
      <div v-else-if="isError" class="flex w-full items-center justify-center py-10 text-red-500 font-inter text-sm">
        Failed to load properties. Please try again later.
      </div>

      <!-- Data -->
      <div v-else class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <PropertyCard
          v-for="property in featuredProperties"
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

const { data, isLoading, isError } = useProperties({ limit: 6 });

const featuredProperties = computed(() => data.value?.properties ?? []);
</script>
