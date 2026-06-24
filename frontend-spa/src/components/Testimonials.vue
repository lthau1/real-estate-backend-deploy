<template>
  <section class="relative w-full bg-white px-6 py-16 md:px-10 lg:px-[80px] lg:py-20 xl:px-[120px]">
    <div class="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
      <!-- Text side -->
      <div class="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
        <h2 class="font-gantari text-[32px] font-bold leading-[40px] text-navy sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[50px]">
          What our clients say
          <br />
          about us
        </h2>
        <Quote class="h-5 w-6 text-navy/60" />
        <p class="font-inter text-base font-normal leading-7 text-black sm:text-lg lg:text-xl">
          Arcu laoreet malesuada nunc eget. Fermentum ut dui etiam aliquam habitant elit euismod
          erat praesent. Tincidunt semper interdum fames cras
        </p>
        <div class="flex flex-col items-center gap-2 lg:items-start">
          <p class="font-gantari text-lg font-semibold text-black">Miya Monroe</p>
          <p class="font-inter text-base font-normal text-muted-text">Buyer</p>
        </div>
      </div>

      <!-- Image side -->
      <div
        class="aspect-[416/440] w-full max-w-[416px] rounded-xl bg-cover bg-center bg-no-repeat mx-auto"
        :style="{ backgroundImage: `url(${TESTIMONIAL_IMAGE})` }"
        aria-label="Miya Monroe testimonial image"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Quote } from 'lucide-vue-next';

const TESTIMONIAL_IMAGE = 'https://picsum.photos/seed/testimonial-portrait/416/440';
</script>
