<template>
  <section class="w-full px-4 py-14 sm:px-6 lg:px-[60px] xl:px-[182px]">
    <div class="mx-auto flex w-full max-w-[1076px] flex-col items-center gap-10">
      <header class="flex max-w-[520px] flex-col items-center gap-4 text-center">
        <h2 class="font-gantari text-[32px] font-bold leading-tight text-navy sm:text-[40px]">
          Our client's success is our success.
        </h2>
        <p class="font-inter text-base font-normal leading-relaxed text-black">
          Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor
          fermentum eu urna eget
        </p>
      </header>

      <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        <Card v-for="{ icon, title, description, buttonLabel } in services" :key="title" class="rounded-xl border-0 bg-navy shadow-[0px_4px_10px_rgba(0,0,0,0.07)]">
          <CardContent class="flex min-h-[361px] flex-col items-center px-8 py-10 text-center">
            <component :is="icon" class="h-14 w-14 text-white/80" />
            <h3 class="mt-8 font-gantari text-2xl font-bold leading-5 text-white">
              {{ title }}
            </h3>
            <p class="mt-5 line-clamp-2 max-w-[240px] font-inter text-base font-normal leading-relaxed text-white/80">
              {{ description }}
            </p>
            <Button
              type="button"
              class="mt-auto h-[50px] w-[200px] rounded-md bg-brand-blue font-gantari text-lg font-medium text-white hover:bg-brand-blue/90"
            >
              {{ buttonLabel }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import { Key, TrendingUp, Building } from 'lucide-vue-next';
import Button from './ui/Button.vue';
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

const services = [
  { icon: markRaw(Key), title: 'Buy a property', description: 'Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu', buttonLabel: 'Find property' },
  { icon: markRaw(TrendingUp), title: 'Sell a property', description: 'Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu', buttonLabel: 'Learn more' },
  { icon: markRaw(Building), title: 'Rent a property', description: 'Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu', buttonLabel: 'Find a rent' },
];
</script>
