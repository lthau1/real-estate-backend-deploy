<template>
  <div :class="cn('inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-white', $attrs.class as string)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils';
</script>
