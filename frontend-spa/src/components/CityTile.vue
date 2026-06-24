<template>
  <div
    class="relative h-[220px] overflow-hidden rounded-xl bg-cover bg-center"
    :class="className"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)), url(${card.image})` }"
  >
    <button
      type="button"
      class="absolute inset-0 flex items-end p-5 text-left w-full h-full outline-none hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-white/70"
      :aria-label="`${card.city}, ${card.properties}`"
    >
      <div class="flex flex-col gap-1">
        <h3 class="font-gantari text-xl font-bold text-white">{{ card.city }}</h3>
        <p class="font-gantari text-sm font-normal text-white/90">{{ card.properties }}</p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
interface CityCard {
  city: string;
  properties: string;
  image: string;
}

defineProps<{
  card: CityCard;
  className?: string;
}>();
</script>
