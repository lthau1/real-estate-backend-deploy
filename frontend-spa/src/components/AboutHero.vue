<template>
  <section class="w-full px-4 pb-14 sm:px-6 lg:px-[72px]">
    <div class="mx-auto flex w-full max-w-[1296px] flex-col">
      <!-- Video banner -->
      <div
        class="relative min-h-[420px] overflow-hidden rounded-t-xl px-8 py-10 sm:min-h-[520px] sm:px-11 sm:py-[42px] lg:h-[580px]"
        :style="{ background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${HERO_IMAGE}) center/cover no-repeat` }"
        role="img"
        aria-label="Video cover"
      >
        <!-- Top-left heading -->
        <header class="relative z-10 flex max-w-[420px] flex-col items-start gap-3">
          <h1 class="font-gantari text-[32px] font-bold leading-tight text-white sm:text-[40px] lg:text-[50px]">
            Faucibus mattis pharetra
          </h1>
          <p class="font-inter text-base font-normal text-white/90">Watch video</p>
        </header>

        <!-- Centered play button -->
        <div class="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            aria-label="Play video"
            class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue shadow-lg transition-transform hover:scale-105 sm:h-20 sm:w-20"
          >
            <Play class="h-7 w-7 fill-white text-white sm:h-9 sm:w-9" />
          </button>
        </div>

        <!-- Bottom-right description -->
        <p class="absolute bottom-8 right-8 max-w-[500px] font-inter text-sm font-normal leading-6 text-white sm:text-base lg:bottom-16 lg:right-11">
          Lorem ipsum dolor sit amet consectetur. Morbi quis habitant donec aliquet interdum
          bibendum tellus sed ultriciespharetra in lorem eget
        </p>
      </div>

      <!-- Stats card -->
      <Card class="rounded-t-none rounded-b-xl border-0 bg-white shadow-[0px_4px_32px_rgba(0,0,0,0.15)]">
        <CardContent class="p-6 sm:p-8 lg:p-10">
          <div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <article
              v-for="{ icon, value, label } in stats"
              :key="label"
              class="flex flex-col items-center gap-3 rounded-xl px-4 py-3 text-center"
            >
              <component :is="icon" class="h-6 w-6 text-navy" />
              <div class="font-gantari text-[38px] font-bold leading-none text-navy sm:text-[44px] lg:text-[50px]">
                {{ value }}
              </div>
              <div class="font-inter text-base font-medium leading-normal text-navy sm:text-lg lg:text-2xl">
                {{ label }}
              </div>
            </article>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import { Play, Home, Building, Warehouse, Building2 } from 'lucide-vue-next';
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

const HERO_IMAGE = 'https://picsum.photos/seed/about-hero/1296/620';

const stats = [
  { icon: markRaw(Home), value: '1250', label: 'Properties sold' },
  { icon: markRaw(Building), value: '320', label: 'Apartments sold' },
  { icon: markRaw(Warehouse), value: '125', label: 'Houses sold' },
  { icon: markRaw(Building2), value: '120', label: 'Villas sold' },
];
</script>
