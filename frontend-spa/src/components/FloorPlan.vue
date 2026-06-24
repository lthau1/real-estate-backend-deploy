<template>
  <section class="w-full overflow-hidden rounded-xl bg-navy">
    <div class="flex w-full flex-col items-start gap-10 p-6 md:p-10 xl:flex-row xl:items-start xl:gap-[60px]">
      <!-- Left: title + features -->
      <div class="flex flex-col items-start gap-8 xl:min-w-[280px]">
        <h2 class="font-gantari text-[28px] font-semibold leading-5 text-white">
          Apartment plan
        </h2>
        <div class="flex flex-col items-start gap-8">
          <div v-for="(feature, i) in features" :key="i" class="flex max-w-[276px] flex-col items-start gap-3">
            <div class="flex items-center gap-3">
              <CheckSquare class="h-5 w-5 shrink-0 text-brand-blue" />
              <h3 class="font-gantari text-lg font-semibold leading-5 text-white">
                {{ feature.title }}
              </h3>
            </div>
            <p class="font-inter text-sm font-normal leading-relaxed text-white/70">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right: floor plan image -->
      <div class="flex flex-1 items-center justify-center self-stretch">
        <img
          :src="planImage"
          alt="Apartment floor plan"
          class="max-h-[378px] w-full max-w-[406px] rounded-lg object-contain"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckSquare } from 'lucide-vue-next';

interface FloorPlanFeature {
  title: string;
  description: string;
}

defineProps<{
  features: FloorPlanFeature[];
  planImage: string;
}>();
</script>
