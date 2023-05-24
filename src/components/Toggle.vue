<template>
  <button
    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    :class="buttonClass"
    @click="handleClick"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
      :class="circleClass"
    />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import Button from './Button.vue'

  interface Props {
    value: boolean
  }

  const props = withDefaults(
    defineProps<Props>(),
    { value: false }
  )

  const emit = defineEmits<{
    (e: 'click', value: boolean): void
  }>()

  const buttonClass = computed(() => props.value ? 'bg-emerald-500' : 'bg-gray-100')
  const circleClass = computed(() => props.value ? 'translate-x-5' : 'translate-x-0')

  function handleClick () {
    emit('click', !props.value)
  }
</script>
