<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="cn(
      'flex w-full rounded-md border border-input bg-white px-3 py-2 text-base font-inter placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:cursor-not-allowed disabled:opacity-50',
      $attrs.class as string
    )"
  />
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
