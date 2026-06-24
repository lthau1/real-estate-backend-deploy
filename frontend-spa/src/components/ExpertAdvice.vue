<template>
  <section class="relative w-full bg-white px-6 py-12 sm:px-10 md:px-14 lg:px-[72px] xl:px-[182px] xl:py-[60px]">
    <div class="mx-auto grid w-full max-w-[1076px] items-center gap-8 md:grid-cols-[minmax(220px,416px)_1fr] md:gap-12 lg:gap-20 xl:gap-[134px]">
      <div
        aria-hidden="true"
        class="h-56 w-full rounded-xl bg-cover bg-center bg-no-repeat md:h-80"
        :style="{ backgroundImage: `url(${EXPERT_IMAGE})` }"
      />
      <article class="flex max-w-[442px] flex-col items-start gap-5 md:gap-10">
        <h2 class="font-gantari text-[32px] font-bold leading-[1.2] text-navy md:text-[40px]">
          Expert advice for all your real estate needs
        </h2>
        <p class="font-inter text-sm font-normal leading-relaxed text-black md:text-base">
          Pretium interdum risus risus facilisis cras pellentesque ipsum suspendisse venenatis.
          Morbi posuere semper etiam imperdiet orci ut. Lacus odio arcu massa porttitor curabitur
          a in. Faucibus ipsum lacinia aenean nec.
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const EXPERT_IMAGE = 'https://picsum.photos/seed/expert-advice/600/480';
</script>
