<template>
  <section
    aria-label="Satisfaction guarantee"
    class="relative w-full bg-navy px-4 py-12 sm:px-6 md:px-10 lg:px-[80px] lg:py-10"
  >
    <div class="mx-auto flex w-full max-w-[1088px] flex-col items-center justify-between gap-8 md:flex-row md:gap-16 lg:gap-[134px]">
      <!-- Image -->
      <div
        class="h-56 w-full max-w-[416px] shrink-0 rounded-xl bg-cover bg-center bg-no-repeat md:h-80"
        :style="{ backgroundImage: `url(${CTA_IMAGE})` }"
        aria-hidden="true"
      />

      <!-- Content -->
      <div class="flex w-full max-w-[415px] flex-col items-start gap-6 md:gap-10">
        <h2 class="font-gantari text-[28px] font-bold leading-[36px] text-white sm:text-[34px] sm:leading-[42px] md:text-[40px] md:leading-[50px]">
          Putting a plan to action,
          <br />
          to assure your satisfaction!
        </h2>
        <p class="font-inter text-base font-normal leading-relaxed text-white/90">
          Ultrices quis at enim in tristique in id diam suspendisse. Sed fermentum velit id et
          donec dui. Sed nulla neque at phasellus in adipiscing dictum.
        </p>
        <Button class="h-auto min-h-[50px] rounded-md bg-brand-blue px-6 py-3 font-gantari text-lg font-medium text-white hover:bg-brand-blue/90">
          Learn more
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from './ui/Button.vue';

const CTA_IMAGE = 'https://picsum.photos/seed/realestate-cta/832/560';
</script>
