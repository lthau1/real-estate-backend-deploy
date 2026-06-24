<template>
  <section class="w-full px-4 py-14 sm:px-6 lg:px-[72px]">
    <div class="mx-auto flex w-full max-w-[1344px] flex-col items-center gap-10">
      <header class="flex max-w-[661px] flex-col items-center gap-4 text-center">
        <h2 class="font-gantari text-[32px] font-bold leading-tight text-navy sm:text-[40px] lg:text-[50px]">
          Commercial property
        </h2>
        <p class="font-inter text-base font-normal leading-relaxed text-black">
          Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
        </p>
      </header>

      <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <article v-for="listing in listings" :key="listing.title">
          <Card class="overflow-hidden rounded-[12px] border-0 shadow-[0px_4px_8px_rgba(0,0,0,0.07)]">
            <CardContent class="flex flex-col p-0">
              <!-- Image -->
              <div
                class="flex h-[240px] items-start rounded-t-[12px] bg-cover bg-center p-5"
                :style="{ backgroundImage: `url(${listing.image})` }"
              >
                <Badge :class="getStatusBg(listing.status)" class="rounded-md px-4 py-2 font-gantari text-base font-semibold">
                  {{ listing.status }}
                </Badge>
              </div>

              <!-- Info -->
              <div class="flex flex-col gap-4 p-5">
                <div class="flex flex-col gap-3">
                  <h3 class="font-gantari text-lg font-semibold leading-5 text-black">
                    {{ listing.title }}
                  </h3>
                  <p class="font-inter text-lg font-semibold leading-5 text-navy">
                    {{ listing.price }}
                  </p>
                </div>

                <div class="grid grid-cols-4 gap-2 border-t border-muted-text/20 pt-3">
                  <div v-for="{ icon, label, value } in defaultStats" :key="label" class="flex min-w-0 flex-col items-start gap-1">
                    <div class="flex items-center gap-1">
                      <component :is="icon" class="h-4 w-4 shrink-0 text-navy" />
                      <span class="font-inter text-sm font-medium text-navy">{{ value }}</span>
                    </div>
                    <span class="font-inter text-xs font-medium text-navy truncate w-full">{{ label }}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import { BedDouble, Bath, Maximize2, Car } from 'lucide-vue-next';
import Badge from './ui/Badge.vue';
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

interface CommercialListing {
  title: string;
  price: string;
  status: 'For sale' | 'For rent';
  image: string;
}

const listings: CommercialListing[] = [
  { title: 'Pembroke Pines office', price: '$150,000', status: 'For sale', image: 'https://picsum.photos/seed/comm-001/600/400' },
  { title: 'Sulphur office', price: '$2,500/mo', status: 'For rent', image: 'https://picsum.photos/seed/comm-002/600/400' },
  { title: 'Hamden depot', price: '$120,000', status: 'For sale', image: 'https://picsum.photos/seed/comm-003/600/400' },
  { title: 'Fairground office', price: '$200,000', status: 'For sale', image: 'https://picsum.photos/seed/comm-004/600/400' },
];

const defaultStats = [
  { icon: markRaw(BedDouble), label: 'Bedrooms', value: 2 },
  { icon: markRaw(Bath), label: 'Bathrooms', value: 2 },
  { icon: markRaw(Maximize2), label: 'Total area', value: 2 },
  { icon: markRaw(Car), label: 'Garages', value: 2 },
];

function getStatusBg(status: string) {
  return status === 'For sale' ? 'bg-brand-green' : 'bg-brand-purple';
}
</script>
