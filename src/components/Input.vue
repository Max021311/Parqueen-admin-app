<template>
  <div class="flex gap-1">
    <label :for="id" form="LogIn">
      {{ label }}
    </label>
    <input
      class="form-input h-8 border rounded-md border-gray-500"
      :type="type"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder ?? ''"
      @input="handler"
      :minlength="minlength"
      required
    >
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])
defineProps<{
  type: string,
  id: string,
  modelValue: any,
  label: string,
  placeholder?: string,
  required?: boolean,
  minlength?: string
}>()

function handler (event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

</script>
