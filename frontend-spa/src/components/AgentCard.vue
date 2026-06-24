<template>
  <Card class="rounded-[12px] border-0 bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.07)]">
    <CardContent class="p-6">
      <article class="flex flex-col gap-5 sm:flex-row sm:items-start">
        <!-- Photo -->
        <div
          class="h-52 w-full shrink-0 rounded-lg bg-cover bg-center bg-no-repeat sm:w-52"
          :style="{ backgroundImage: `url(${agent.image})` }"
          aria-hidden="true"
        />

        <!-- Info -->
        <div class="flex min-w-0 flex-1 flex-col justify-between gap-5 sm:h-52">
          <div class="flex flex-col gap-4">
            <!-- Name & role -->
            <div class="flex flex-col gap-1">
              <h3 class="font-gantari text-2xl font-semibold leading-5 text-black">
                {{ agent.name }}
              </h3>
              <p class="font-inter text-sm font-medium leading-5 text-navy">{{ agent.role }}</p>
            </div>

            <!-- Contact details -->
            <dl class="flex flex-col gap-0">
              <div
                v-for="{ label, value } in contactDetails"
                :key="label"
                class="flex items-center justify-between border-b border-muted-text/20 px-1 py-2"
              >
                <dt class="font-inter text-sm font-semibold text-black">{{ label }}</dt>
                <dd class="font-inter text-sm font-semibold text-muted-text">{{ value }}</dd>
              </div>
            </dl>
          </div>

          <!-- Social icons -->
          <div class="flex items-center gap-3">
            <a
              v-for="(Icon, i) in socialIcons"
              :key="i"
              href="#"
              aria-label="Social media"
              class="text-navy/60 transition-colors hover:text-navy"
            >
              <component :is="Icon" class="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import { Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-vue-next';
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

interface Agent {
  name: string;
  role: string;
  image: string;
  office: string;
  mobile: string;
  email: string;
}

const props = defineProps<{
  agent: Agent;
}>();

const socialIcons = [markRaw(Twitter), markRaw(Facebook), markRaw(Instagram), markRaw(Linkedin), markRaw(Youtube)];

const contactDetails = [
  { label: 'Office', value: props.agent.office },
  { label: 'Mobile', value: props.agent.mobile },
  { label: 'Email', value: props.agent.email },
];
</script>
