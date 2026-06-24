<template>
  <section class="flex w-full flex-col gap-6 pb-10">
    <!-- Header row -->
    <header class="flex flex-col gap-4">
      <Badge :class="statusBg" class="h-10 w-fit rounded-md px-5 font-gantari text-xl font-medium text-white">
        {{ status }}
      </Badge>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
          <h1 class="font-gantari text-[36px] font-semibold leading-none text-navy sm:text-[42px] lg:text-[50px]">
            {{ title }}
          </h1>
          <p class="font-inter text-[32px] font-semibold leading-none text-black sm:text-[42px] lg:text-[50px]">
            {{ price }}
          </p>
        </div>
        <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <address class="font-inter text-base font-normal not-italic leading-5 text-black/80 sm:text-xl">
            {{ address }}
          </address>
          <p class="font-inter text-base font-normal leading-5 text-black/80 sm:text-xl">
            {{ rate }}
          </p>
        </div>
      </div>
    </header>

    <!-- Gallery -->
    <div class="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,856px)_minmax(280px,416px)]">
      <!-- Main image -->
      <Card class="overflow-hidden rounded-[20px] border-0 shadow-none">
        <CardContent class="p-0">
          <img
            class="h-[320px] w-full object-cover md:h-[420px] lg:h-[540px]"
            :alt="title"
            :src="mainImage"
          />
        </CardContent>
      </Card>

      <!-- Right stacked images -->
      <div class="flex flex-col gap-6">
        <!-- Show all gallery button -->
        <Card class="overflow-hidden rounded-xl border-0 shadow-none">
          <CardContent class="p-0">
            <button
              type="button"
              aria-label="Show all photos"
              class="flex h-[220px] w-full items-center justify-center rounded-xl bg-cover bg-center p-6 text-center md:h-[240px] lg:h-[260px]"
              :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${galleryImage})` }"
            >
              <span class="flex flex-col items-center gap-2.5">
                <Camera class="h-6 w-6 text-white" />
                <span class="font-gantari text-2xl font-bold leading-5 text-white">
                  Show all
                </span>
                <span class="font-gantari text-base font-normal leading-5 text-white">
                  {{ photoCount }} photos
                </span>
              </span>
            </button>
          </CardContent>
        </Card>

        <!-- Map / secondary image -->
        <Card class="overflow-hidden rounded-xl border border-neutral-200 shadow-none">
          <CardContent class="p-0">
            <img
              class="h-[220px] w-full object-cover md:h-[240px] lg:h-[260px]"
              alt="Property location map"
              :src="mapImage"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Camera } from 'lucide-vue-next';
import Badge from './ui/Badge.vue';
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

const props = defineProps<{
  status: 'For sale' | 'For rent';
  title: string;
  price: string;
  address: string;
  rate: string;
  mainImage: string;
  galleryImage: string;
  mapImage: string;
  photoCount: number;
}>();

const statusBg = computed(() =>
  props.status === 'For sale' ? 'bg-brand-green' : 'bg-brand-purple'
);
</script>
