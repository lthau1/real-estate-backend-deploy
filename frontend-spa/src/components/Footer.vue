<template>
  <footer class="relative w-full bg-navy px-4 pb-5 pt-14 text-white sm:px-6 lg:px-[72px]">
    <div class="mx-auto flex w-full max-w-[1440px] flex-col gap-14">
      <!-- Main grid -->
      <div class="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_120px_86px_280px]">
        <div v-for="section in footerSections" :key="section.title" class="flex flex-col items-start gap-6">
          <h3 class="font-gantari text-lg font-semibold leading-normal text-white">
            {{ section.title }}
          </h3>
          <ul class="flex flex-col items-start gap-4">
            <li v-for="item in section.items" :key="item" class="font-inter text-base font-normal leading-relaxed text-white/80">
              <template v-if="item.includes('\n')">
                {{ item.split('\n')[0] }}<br />{{ item.split('\n')[1] }}
              </template>
              <template v-else>
                {{ item }}
              </template>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="flex flex-col gap-6">
          <h3 class="font-gantari text-lg font-semibold leading-normal text-white">Newsletter</h3>
          <p class="font-inter text-base font-normal leading-relaxed text-white/80">
            Subscribe to our newsletter
          </p>
          <form
            class="flex min-h-[42px] w-full max-w-[280px] items-center gap-1 rounded-xl bg-white px-1.5 py-1 overflow-hidden"
            @submit.prevent
          >
            <label for="footer-email" class="sr-only">Your email</label>
            <Input
              id="footer-email"
              type="email"
              v-model="email"
              placeholder="Your email"
              class="h-[30px] border-0 bg-transparent px-2 py-0 font-inter text-sm text-black placeholder:text-black/40 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              class="h-[30px] shrink-0 rounded-lg bg-brand-blue px-3 font-gantari text-sm font-medium text-white hover:bg-brand-blue/90"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex w-full flex-col gap-4 border-t border-white/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <Home class="h-5 w-5 text-white/60" />
          <p class="font-inter text-sm font-normal text-white/50">
            ©Copyright Real Estate 2026 - CT313H
          </p>
        </div>
        <div class="flex items-center gap-4">
          <a
            v-for="(Icon, i) in socialIcons"
            :key="i"
            href="#"
            class="text-white/60 hover:text-white transition-colors"
            aria-label="Social media"
          >
            <component :is="Icon" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-vue-next';
import Input from './ui/Input.vue';
import Button from './ui/Button.vue';

const footerSections = [
  {
    title: 'Opening hours',
    items: ['Mon-Fri 08:00AM - 08:00PM', 'Sat-Sun 08:00AM - 08:00PM'],
  },
  {
    title: 'Find Us',
    items: ['8911 Tanglewood Ave.\nCapitol Heights, MD 20743', '(566) 237-4687', 'info@realestate.com'],
  },
  {
    title: 'Property',
    items: ['Apartments', "Villa's", 'Houses', 'Commercial'],
  },
  {
    title: 'Links',
    items: ['Home', 'Property', 'About', 'Contact'],
  },
];

const socialIcons = [markRaw(Facebook), markRaw(Twitter), markRaw(Instagram), markRaw(Linkedin)];

const email = ref('');
</script>
