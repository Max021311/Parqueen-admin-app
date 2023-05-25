<template>
  <Switch
    :modelValue="modelValue"
    @update:model-value="handler"
    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    :class="buttonClass"
  >
    <input
      type="checkbox"
      :value="modelValue"
      class="sr-only"
    >
    <span aria-hidden="true"
      class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
      :class="circleClass"
    />
  </Switch>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { Switch } from '@headlessui/vue'

  interface Props {
    modelValue: boolean
  }

  const props = withDefaults(
    defineProps<Props>(),
    { modelValue: false }
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const buttonClass = computed(() => props.modelValue ? 'bg-emerald-500' : 'bg-gray-100')
  const circleClass = computed(() => props.modelValue ? 'translate-x-5' : 'translate-x-0')

  function handler (newValue: boolean) {
    emit('update:modelValue', newValue)
  }
</script>
