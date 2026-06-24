<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    :class="cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:cursor-not-allowed disabled:opacity-50',
      $attrs.class as string
    )"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils';

defineProps<{
  modelValue?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
