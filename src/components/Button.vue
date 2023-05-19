<template>
  <button
    :class="[
      'border rounded-md px-5 disabled:opacity-50 w-fit h-8',
      buttonStyle
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  color: 'primary' | 'secondary',
}

const props = defineProps<Props>()

const buttonStyles = {
  primary: 'bg-emerald-500 text-black dark:text-white border-emerald-300',
  secondary: 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-500 dark:border-gray-600'
}

const buttonStyle = computed(() => buttonStyles[props.color])
</script>
