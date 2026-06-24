<template>
  <section class="w-full px-4 py-14 sm:px-6 lg:px-[72px]">
    <div class="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-10">
      <header class="flex w-full max-w-[661px] flex-col items-center gap-4 text-center">
        <h2 class="font-gantari text-[36px] font-bold leading-none text-navy sm:text-[42px] lg:text-[50px]">
          Our professional agents
        </h2>
        <p class="font-inter text-base font-normal leading-relaxed text-black">
          Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
        </p>
      </header>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
        <div
          v-for="n in 4"
          :key="n"
          class="h-[224px] animate-pulse rounded-[12px] bg-gray-200"
        />
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="py-10 text-red-500 font-inter text-sm">
        Failed to load agents.
      </div>

      <!-- Data -->
      <div v-else class="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
        <AgentCard v-for="agent in agents" :key="agent.id" :agent="agent" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AgentCard from './AgentCard.vue';
import { useAgents } from '../composables/useApi';

const { data, isLoading, isError } = useAgents();
const agents = computed(() => data.value?.agents ?? []);
</script>
