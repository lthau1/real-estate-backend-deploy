<template>
  <div :class="cn('rounded-xl border bg-white shadow', $attrs.class as string)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils';
</script>
