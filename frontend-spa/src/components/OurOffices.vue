<template>
  <section class="flex flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-[72px]">
    <header class="flex flex-col items-center gap-4 text-center">
      <h2 class="font-gantari text-[36px] font-bold leading-tight text-black lg:text-[40px]">
        Our Offices
      </h2>
      <p class="font-inter text-base font-normal leading-relaxed text-black">
        Pretium interdum risus risus facilisis cras pellentesque ipsum suspendisse
      </p>
    </header>

    <div class="grid w-full max-w-[1296px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="office in offices"
        :key="office.name"
        class="flex flex-col overflow-hidden rounded-[12px] border-0 bg-transparent shadow-none"
      >
        <CardContent class="flex h-full flex-col p-0">
          <!-- Image -->
          <div
            class="h-[280px] w-full rounded-t-[12px] bg-cover bg-center"
            :style="{ backgroundImage: `url(${office.image})` }"
            aria-hidden="true"
          />

          <!-- Details -->
          <div class="flex flex-col items-start gap-3 pt-4">
            <h3 class="font-gantari text-2xl font-semibold leading-snug text-black">
              {{ office.name }}
            </h3>
            <address class="not-italic">
              <p class="font-inter text-base font-normal leading-relaxed text-muted-text">
                {{ office.address }}
              </p>
            </address>
            <p class="font-inter text-base font-medium leading-relaxed text-black">
              Phone: {{ office.phone }}
            </p>
            <p class="font-inter text-base font-medium leading-relaxed text-black">
              Email: {{ office.email }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

const offices = [
  { name: 'Smoky Hollow', address: '9514 Smoky Hollow St. Sulphur, LA 70663', phone: '(736) 267-8659', email: 'rsmartin@gmail.com', image: 'https://picsum.photos/seed/office-001/600/400' },
  { name: 'North Road', address: '19 North Road Piscataway, NJ 08854', phone: '(736) 267-8659', email: 'rsmartin@gmail.com', image: 'https://picsum.photos/seed/office-002/600/400' },
  { name: 'Rockville Ave', address: '8460 Rockville Ave. Greenville, NC 27834', phone: '(736) 267-8659', email: 'rsmartin@gmail.com', image: 'https://picsum.photos/seed/office-003/600/400' },
];
</script>
