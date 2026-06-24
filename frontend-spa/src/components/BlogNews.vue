<template>
  <section class="relative w-full px-4 py-14 sm:px-6 lg:px-[60px] xl:px-[120px]">
    <div class="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10">
      <header class="flex max-w-[661px] flex-col items-center gap-4 text-center">
        <h2 class="font-gantari text-[36px] font-bold leading-none text-navy sm:text-[42px] lg:text-[50px]">
          Blog news
        </h2>
        <p class="font-inter text-base font-normal leading-relaxed text-black">
          Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
        </p>
      </header>

      <div class="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article v-for="post in blogPosts" :key="post.title">
          <Card class="flex h-full flex-col overflow-hidden border-0 bg-transparent shadow-none">
            <CardContent class="flex h-full flex-col items-start gap-3 p-0">
              <!-- Image -->
              <div
                class="h-[240px] w-full rounded-t-[12px] bg-cover bg-center"
                :style="{ backgroundImage: `url(${post.image})` }"
                aria-hidden="true"
              />

              <!-- Text -->
              <div class="flex flex-col items-start gap-4 px-1 pt-1">
                <p class="font-inter text-base font-medium leading-normal text-muted-text">
                  {{ post.date }}
                </p>
                <div class="flex flex-col gap-3">
                  <a
                    :href="post.href"
                    class="font-gantari text-2xl font-semibold leading-snug text-black hover:text-navy transition-colors"
                  >
                    {{ post.title }}
                  </a>
                  <p class="max-w-[380px] font-inter text-base font-normal leading-relaxed text-muted-text">
                    {{ post.description }}
                  </p>
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
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';

const blogPosts = [
  { date: '23.12.2023', title: 'Home sales start to rise', description: 'Nam eget habitasse semper turpis. Ultrices vitae tristique sem nulla ornare massa id in.', image: 'https://picsum.photos/seed/blog-001/600/280', href: '#' },
  { date: '23.12.2023', title: 'Real estate and design trends', description: 'Nam eget habitasse semper turpis. Ultrices vitae tristique sem nulla.', image: 'https://picsum.photos/seed/blog-002/600/280', href: '#' },
  { date: '23.12.2023', title: 'Mortgage rates dip below 7%', description: 'Ultrices vitae tristique sem nulla ornare massa id in. Ridiculus fringilla laoreet.', image: 'https://picsum.photos/seed/blog-003/600/280', href: '#' },
];
</script>
