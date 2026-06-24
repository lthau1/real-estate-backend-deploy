<template>
  <section class="w-full py-14">
    <div class="flex flex-col items-start gap-10">
      <header class="flex max-w-[661px] flex-col items-start gap-5">
        <h2 class="font-gantari text-[36px] font-bold leading-none text-navy lg:text-[50px]">
          {{ title }}
        </h2>
        <p class="font-inter text-base font-normal leading-relaxed text-black">
          {{ subtitle }}
        </p>
      </header>
      <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <PropertyCard v-for="listing in listings" :key="listing.id ?? listing.title" :property="listing" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PropertyCard from './PropertyCard.vue';
import type { Property } from '../types';

withDefaults(defineProps<{
  listings: Property[];
  title?: string;
  subtitle?: string;
}>(), {
  title: 'Related listings',
  subtitle: 'Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus',
});
</script>
