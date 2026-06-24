<template>
  <section class="w-full px-4 py-14 sm:px-6 lg:px-[72px]">
    <div class="mx-auto flex w-full max-w-[1296px] flex-col items-center gap-10">
      <header class="flex max-w-[520px] flex-col items-center gap-4 text-center">
        <h2 class="font-gantari text-[34px] font-bold leading-tight text-navy sm:text-[42px] lg:text-[50px]">
          What city will you live in?
        </h2>
        <p class="font-inter text-base font-normal leading-relaxed text-black">
          Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor
          fermentum eu urna eget
        </p>
      </header>

      <div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-[1fr_306px] lg:items-start">
        <!-- Left grid -->
        <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <CityTile
            v-for="card in leftCities"
            :key="card.city"
            :card="card"
            :class="card.colSpan ?? ''"
          />
        </div>

        <!-- Chicago tall card -->
        <CityTile :card="chicagoCity" class="h-[220px] lg:h-[544px]" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import CityTile from './CityTile.vue';

interface CityCard {
  city: string;
  properties: string;
  image: string;
  colSpan?: string;
}

const leftCities: CityCard[] = [
  { city: 'New York', properties: '28 properties', image: 'https://picsum.photos/seed/city-newyork/800/300', colSpan: 'md:col-span-2' },
  { city: 'Boston', properties: '12 properties', image: 'https://picsum.photos/seed/city-boston/400/300', colSpan: 'md:col-span-1' },
  { city: 'Washington', properties: '18 properties', image: 'https://picsum.photos/seed/city-washington/400/300', colSpan: 'md:col-span-1' },
  { city: 'Miami', properties: '32 properties', image: 'https://picsum.photos/seed/city-miami/800/300', colSpan: 'md:col-span-2' },
];

const chicagoCity: CityCard = {
  city: 'Chicago',
  properties: '32 properties',
  image: 'https://picsum.photos/seed/city-chicago/400/600',
};
</script>
