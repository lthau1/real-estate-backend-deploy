<template>
  <section class="relative w-full pb-14 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-[1296px]">
      <div class="relative w-full overflow-visible rounded-[20px]">
        <!-- Hero image with overlay -->
        <div
          class="relative flex min-h-[580px] w-full flex-col items-center justify-center overflow-hidden rounded-[20px] px-6 py-16 text-center"
          :style="{ background: `linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)), url(${HERO_IMAGE}) center/cover no-repeat` }"
        >
          <div class="flex max-w-[840px] flex-col items-center gap-6">
            <h1 class="font-gantari text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
              Find a home that suits your lifestyle.
            </h1>
            <p class="max-w-[620px] font-inter text-base font-normal leading-relaxed text-white/90">
              Nec risus quis viverra libero tellus eget. Leo morbi faucibus mattis pharetra tellus
              velit ultricies duis rhoncus. Porttitor fermentum eu urna eget.
            </p>
          </div>
        </div>

        <!-- Search card -->
        <div class="relative z-10 mx-auto -mt-9 w-[calc(100%-32px)] max-w-[1076px] rounded-xl bg-white shadow-[0px_4px_32px_rgba(0,0,0,0.15)]">
          <div class="p-4 sm:p-6 lg:p-8">
            <form
              class="flex w-full flex-col gap-3 lg:flex-row lg:items-center"
              role="search"
              @submit.prevent
            >
              <div class="order-2 flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
                <SlidersHorizontal class="h-5 w-5 text-navy" />
              </div>
              <div class="order-1 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 lg:order-2">
                <div v-for="field in searchFields" :key="field.label">
                  <Select v-model="field.values[field.label]" class="h-[50px] rounded-md border-0 bg-neutral-100 px-4 font-inter text-base font-normal text-black shadow-none focus:ring-1 focus:ring-brand-blue">
                    <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                class="order-3 h-[50px] w-full gap-3 rounded-md bg-brand-blue px-5 font-inter text-base font-medium text-white hover:bg-brand-blue/90 lg:w-auto lg:shrink-0"
              >
                <Search class="h-5 w-5" />
                <span>SEARCH</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Search, SlidersHorizontal } from 'lucide-vue-next';
import Select from './ui/Select.vue';
import Button from './ui/Button.vue';

const HERO_IMAGE = 'https://picsum.photos/seed/realestate-hero/1296/600';

const searchFields = reactive([
  { label: 'Category', options: ['Category', 'House', 'Apartment', 'Villa'], values: { Category: 'Category' } as Record<string, string> },
  { label: 'Property Type', options: ['Property Type', 'For Sale', 'For Rent'], values: { 'Property Type': 'Property Type' } as Record<string, string> },
  { label: 'Location', options: ['Location', 'New York', 'Boston', 'Chicago', 'Miami'], values: { Location: 'Location' } as Record<string, string> },
]);
</script>
