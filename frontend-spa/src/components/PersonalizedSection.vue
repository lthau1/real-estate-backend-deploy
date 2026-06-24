<template>
  <section class="relative w-full px-4 py-10 sm:px-6 md:px-10 lg:px-[72px] xl:px-[182px] xl:py-14">
    <div class="mx-auto grid w-full max-w-[1076px] grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,1fr)_416px] lg:gap-[72px] xl:gap-[134px]">
      <!-- Text -->
      <article class="flex min-w-0 flex-col items-start gap-6 md:gap-10">
        <h2 class="font-gantari text-[32px] font-bold leading-[1.2] text-black sm:text-[36px] lg:text-[40px]">
          Real estate, personalized for you
        </h2>
        <p class="max-w-[520px] font-inter text-sm font-normal leading-relaxed text-black sm:text-base">
          Pretium interdum risus risus facilisis cras pellentesque ipsum suspendisse venenatis.
          Morbi posuere semper etiam imperdiet orci ut. Lacus odio arcu massa porttitor curabitur
          a in. Faucibus ipsum lacinia aenean nec.
        </p>
        <Button
          type="button"
          class="h-[50px] rounded-md bg-brand-blue px-5 font-gantari text-lg font-medium text-white hover:bg-brand-blue/90"
        >
          Learn more
        </Button>
      </article>

      <!-- Image -->
      <div
        class="h-64 w-full rounded-xl bg-cover bg-center sm:h-72 lg:h-80 lg:w-[416px]"
        :style="{ backgroundImage: `url(${SECTION_IMAGE})` }"
        role="img"
        aria-label="Real estate personalized for you"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from './ui/Button.vue';

const SECTION_IMAGE = 'https://picsum.photos/seed/personalized-re/832/480';
</script>
