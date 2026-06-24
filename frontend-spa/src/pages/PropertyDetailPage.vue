<template>
  <main>
    <!-- Loading state -->
    <div v-if="isLoading" class="w-full px-4 pb-0 pt-8 sm:px-6 lg:px-[72px]">
      <div class="mx-auto max-w-[1296px] flex flex-col gap-6">
        <div class="h-12 w-48 animate-pulse rounded-md bg-gray-200" />
        <div class="h-[540px] animate-pulse rounded-[20px] bg-gray-200" />
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="isError" class="flex items-center justify-center py-24 text-red-500 font-inter text-sm">
      Property not found or failed to load.
    </div>

    <!-- Data -->
    <template v-else-if="property">
      <div class="w-full px-4 pb-0 pt-8 sm:px-6 lg:px-[72px]">
        <div class="mx-auto max-w-[1296px]">
          <!-- Gallery / hero -->
          <PropertyDetailGallery
            :status="property.status"
            :title="property.title"
            :price="property.price"
            :address="property.address"
            rate="Contact agent for rate"
            :mainImage="property.image"
            :galleryImage="property.image"
            :mapImage="`https://picsum.photos/seed/${property.id}-map/416/260`"
            :photoCount="4"
          />

          <!-- Two-column layout -->
          <div class="flex flex-col items-start gap-6 pb-10 lg:flex-row">
            <!-- Main content column -->
            <div class="flex min-w-0 flex-1 flex-col gap-14">
              <!-- Description -->
              <section class="flex flex-col gap-5">
                <h2 :class="sectionTitle">Description</h2>
                <p class="font-inter text-base font-normal leading-7 text-black">
                  {{ property.description || 'No description available.' }}
                </p>
              </section>

              <!-- Property details -->
              <section class="flex flex-col gap-5">
                <h2 :class="sectionTitle">Property details</h2>
                <div class="grid w-full max-w-[856px] grid-cols-1 gap-6 md:grid-cols-2">
                  <div v-for="(col, ci) in [detailsLeft, detailsRight]" :key="ci" class="flex flex-col">
                    <div
                      v-for="{ icon, label, value } in col"
                      :key="label"
                      class="flex w-full items-center justify-between border-b border-muted-text/20 py-2"
                    >
                      <div class="flex items-center gap-2">
                        <component :is="icon" class="h-6 w-6 shrink-0 text-muted-text" />
                        <span :class="detailLabel">{{ label }}</span>
                      </div>
                      <span :class="detailValue">{{ value }}</span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Floor plan -->
              <FloorPlan
                :features="FLOOR_PLAN_FEATURES"
                plan-image="https://picsum.photos/seed/floorplan/406/378"
              />
            </div>

            <!-- Sidebar -->
            <aside class="flex w-full shrink-0 flex-col gap-10 lg:sticky lg:top-6 lg:w-[416px]">
              <!-- Contact agent -->
              <ContactAgentForm v-if="agentInfo" :agent="agentInfo" />
              <div v-else class="rounded-xl bg-navy p-8 text-white font-gantari text-center">
                No agent assigned to this property.
              </div>

              <!-- Related in sidebar -->
              <Card class="w-full rounded-xl border-0 shadow-[0px_4px_10px_rgba(0,0,0,0.07)]">
                <CardContent class="flex flex-col gap-5 p-5">
                  <h2 class="font-gantari text-[28px] font-bold leading-5 text-black">
                    Featured listings
                  </h2>
                  <article
                    v-for="listing in relatedProperties.slice(0, 4)"
                    :key="listing.id"
                    class="flex h-[106px] items-center gap-3"
                  >
                    <div
                      class="h-[106px] w-40 shrink-0 rounded-xl bg-cover bg-center bg-no-repeat"
                      :style="{ backgroundImage: `url(${listing.image})` }"
                    />
                    <div class="flex min-w-0 flex-1 flex-col gap-4">
                      <div class="flex flex-col gap-2">
                        <h3 class="font-gantari text-base font-semibold leading-5 text-black">{{ listing.title }}</h3>
                        <p class="font-inter text-xs font-normal leading-5 text-muted-text">{{ listing.address }}</p>
                      </div>
                      <p class="font-inter text-base font-semibold leading-5 text-navy">{{ listing.price }}</p>
                    </div>
                  </article>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>

      <!-- Related listings -->
      <div class="w-full px-4 sm:px-6 lg:px-[72px]">
        <div class="mx-auto max-w-[1296px]">
          <RelatedListings :listings="relatedProperties" />
        </div>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import { Maximize2, BedDouble, Bath, Car, MapPin } from 'lucide-vue-next';
import PropertyDetailGallery from '../components/PropertyDetailGallery.vue';
import ContactAgentForm from '../components/ContactAgentForm.vue';
import FloorPlan from '../components/FloorPlan.vue';
import RelatedListings from '../components/RelatedListings.vue';
import Card from '../components/ui/Card.vue';
import CardContent from '../components/ui/CardContent.vue';
import { useProperty, useProperties } from '../composables/useApi';

const route = useRoute();
const id = computed(() => route.params.id as string);

const { data: propertyData, isLoading, isError } = useProperty(id);
const { data: allPropertiesData } = useProperties({ limit: 6 });

const property = computed(() => propertyData.value ?? null);

const agentInfo = computed(() => property.value?.agent ?? null);

// Other properties as related listings (exclude current)
const relatedProperties = computed(() =>
  (allPropertiesData.value?.properties ?? []).filter((p) => p.id !== id.value).slice(0, 3)
);

// Build details from API data
const detailsLeft = computed(() => [
  { icon: markRaw(Maximize2), label: 'Total area', value: `${property.value?.stats.area ?? '–'} sq.ft` },
  { icon: markRaw(BedDouble), label: 'Bedrooms', value: String(property.value?.stats.bedrooms ?? '–') },
  { icon: markRaw(Bath), label: 'Bathrooms', value: String(property.value?.stats.bathrooms ?? '–') },
  { icon: markRaw(Car), label: 'Garages', value: String(property.value?.stats.garages ?? '–') },
]);

const detailsRight = computed(() => [
  { icon: markRaw(MapPin), label: 'Location', value: property.value?.location ?? '–' },
  { icon: markRaw(MapPin), label: 'Category', value: property.value?.category ?? '–' },
  { icon: markRaw(MapPin), label: 'Type', value: property.value?.type ?? '–' },
]);

const FLOOR_PLAN_FEATURES = [
  { title: 'Open Living Space', description: 'Spacious connected living and dining area' },
  { title: 'Modern Kitchen', description: 'Fully equipped with premium appliances' },
  { title: 'Master Suite', description: 'Private en-suite with walk-in wardrobe' },
];

const sectionTitle = 'font-gantari text-[28px] font-semibold leading-5 text-navy';
const detailLabel = 'font-gantari text-lg font-medium leading-5 text-muted-text whitespace-nowrap';
const detailValue = 'font-gantari text-lg font-medium leading-5 text-black text-right whitespace-nowrap';
</script>
