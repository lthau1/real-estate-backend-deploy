<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && 'bg-brand-blue text-white hover:bg-brand-blue/90',
      variant === 'ghost' && 'bg-transparent hover:bg-transparent',
      $attrs.class as string
    )"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils';

defineProps<{
  variant?: 'default' | 'ghost';
}>();
</script>
