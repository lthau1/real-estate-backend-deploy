<template>
  <article>
    <component
      :is="property.id ? RouterLink : 'div'"
      :to="property.id ? `/property/${property.id}` : undefined"
      :class="property.id ? 'block rounded-[12px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue' : ''"
    >
      <Card class="overflow-hidden rounded-[12px] border-0 shadow-none h-full">
        <div
          class="flex h-[240px] w-full flex-col items-start gap-2.5 rounded-t-[12px] p-5 bg-cover bg-center"
          :style="{ backgroundImage: `url(${property.image})` }"
        >
          <Badge :class="statusBg" class="h-9 rounded-md px-4 font-gantari text-base font-semibold">
            {{ property.status }}
          </Badge>
        </div>
        <CardContent class="rounded-b-[12px] bg-white p-5 shadow-[0px_4px_10px_rgba(0,0,0,0.07)]">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-3">
              <h3 class="font-gantari text-lg font-semibold leading-snug text-black">
                {{ property.title }}
              </h3>
              <p class="font-inter text-sm font-normal leading-5 text-muted-text">
                {{ property.address }}
              </p>
              <p class="font-inter text-xl font-semibold leading-5 text-black">
                {{ property.price }}
              </p>
            </div>
            <div class="grid grid-cols-4 gap-2 border-t border-black/5 pt-3">
              <div v-for="{ icon, value, label } in stats" :key="label" class="flex min-w-0 flex-col items-start gap-2">
                <div class="flex items-center gap-1.5">
                  <component :is="icon" class="h-4 w-4 shrink-0 text-navy" />
                  <span class="font-inter text-sm font-medium text-navy">{{ value }}</span>
                </div>
                <span class="font-gantari text-xs font-medium leading-5 text-navy truncate w-full">
                  {{ label }}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </component>
  </article>
</template>

<script setup lang="ts">
import { computed, markRaw } from 'vue';
import { RouterLink } from 'vue-router';
import { BedDouble, Bath, Maximize2, Car } from 'lucide-vue-next';
import Badge from './ui/Badge.vue';
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';
import type { Property } from '../types';

const props = defineProps<{
  property: Property;
}>();

const statusBg = computed(() =>
  props.property.status === 'For sale' ? 'bg-brand-green' : 'bg-brand-purple'
);

const stats = computed(() => [
  { icon: markRaw(BedDouble), value: props.property.stats.bedrooms, label: 'Bedrooms' },
  { icon: markRaw(Bath), value: props.property.stats.bathrooms, label: 'Bathrooms' },
  { icon: markRaw(Maximize2), value: props.property.stats.area, label: 'Total area' },
  { icon: markRaw(Car), value: props.property.stats.garages, label: 'Garages' },
]);
</script>
