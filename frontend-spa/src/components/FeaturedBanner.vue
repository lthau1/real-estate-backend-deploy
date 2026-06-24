<template>
  <section
    aria-labelledby="featured-banner-title"
    class="relative w-full overflow-hidden"
    :style="{ background: `linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url(${BANNER_IMAGE}) center/cover no-repeat` }"
  >
    <div class="flex min-h-[220px] w-full items-center px-6 py-10 sm:min-h-[240px] sm:px-10 md:px-14 lg:min-h-[260px] lg:px-[72px] xl:px-[182px]">
      <div class="flex max-w-[661px] flex-col items-start gap-4">
        <h2
          id="featured-banner-title"
          class="font-gantari text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[50px]"
        >
          Discover your featured property
        </h2>
        <p class="font-inter text-sm font-normal leading-relaxed text-white/90 sm:text-base">
          Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const BANNER_IMAGE = 'https://picsum.photos/seed/featured-banner/1440/300';
</script>
